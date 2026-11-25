#Requires -Version 7.0
param(
    [Parameter(Mandatory)][ValidateSet('Codex', 'Claude')][string]$Client,
    [ValidateSet('Install', 'Check', 'Remove')][string]$Action = 'Install'
)

$ErrorActionPreference = 'Stop'
$documents = Join-Path $env:USERPROFILE 'Documents'
$probeRoot = Join-Path $documents 'ModelPilot Native Probe'
$project = Join-Path $probeRoot "$Client café"
$hostDirectory = Join-Path $project (@{ Codex = '.agents'; Claude = '.claude' }[$Client])
$skills = Join-Path $hostDirectory 'skills'
$skill = Join-Path $skills 'modelpilot'
$source = Join-Path $PSScriptRoot 'modelpilot'

$directories = @($documents, $probeRoot, $project, $hostDirectory, $skills, $skill)
$directories += Join-Path $skill 'references'
$directories += Join-Path $skill 'scripts'

$files = [ordered]@{
    (Join-Path $project 'queued-change.txt') = [IO.File]::ReadAllBytes((Join-Path $PSScriptRoot 'queued-change.txt'))
    (Join-Path $skill 'SKILL.md') = [IO.File]::ReadAllBytes((Join-Path $source 'SKILL.md'))
    (Join-Path $skill 'references/probe.txt') = [IO.File]::ReadAllBytes((Join-Path $source 'references/probe.txt'))
    (Join-Path $skill 'scripts/probe.mjs') = [IO.File]::ReadAllBytes((Join-Path $source 'scripts/probe.mjs'))
}
if ($Client -eq 'Codex') {
    $directories += Join-Path $skill 'agents'
    $files[(Join-Path $skill 'agents/openai.yaml')] = [IO.File]::ReadAllBytes((Join-Path $source 'agents/openai.yaml'))
} else {
    $entry = Join-Path $skill 'SKILL.md'
    $entryText = [Text.Encoding]::UTF8.GetString($files[$entry])
    $entryText = $entryText -replace '(?m)^(name: modelpilot)(\r?\n)', '$1$2disable-model-invocation: true$2'
    $files[$entry] = [Text.Encoding]::UTF8.GetBytes($entryText)
}

foreach ($path in ($directories + @($files.Keys))) {
    $item = Get-Item -LiteralPath $path -Force -ErrorAction SilentlyContinue
    if ($item -and ($item.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
        throw "Probe path is a reparse point: $path"
    }
}

if ($Action -eq 'Install') {
    if (Test-Path -LiteralPath $project) {
        throw "Probe project already exists: $project"
    }
    foreach ($directory in $directories) {
        [IO.Directory]::CreateDirectory($directory) | Out-Null
    }
    foreach ($path in $files.Keys) {
        [IO.File]::WriteAllBytes($path, $files[$path])
    }
}

foreach ($path in $files.Keys) {
    $expected = [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData($files[$path]))
    $actual = (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash
    if ($actual -ne $expected) {
        throw "Probe checksum changed: $path (expected $expected, observed $actual)"
    }
    [pscustomobject]@{ File = [IO.Path]::GetRelativePath($project, $path); SHA256 = $actual }
}

if ($Action -eq 'Remove') {
    foreach ($path in $files.Keys) {
        Remove-Item -LiteralPath $path
    }
    [array]::Reverse($directories)
    foreach ($directory in $directories) {
        if ($directory -ne $documents -and $directory -ne $probeRoot -and
            -not (Get-ChildItem -LiteralPath $directory -Force | Select-Object -First 1)) {
            Remove-Item -LiteralPath $directory
        }
    }
}
