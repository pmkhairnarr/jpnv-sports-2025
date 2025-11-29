#!/usr/bin/env pwsh

<#
.SYNOPSIS
    🚀 Deploy to GitHub Pages
    
.DESCRIPTION
    Ensures GitHub Pages is properly configured and deployed for jpnv-sports repository
#>

param(
    [string]$RepoOwner = "pmkhairnarr",
    [string]$RepoName = "jpnv-sports",
    [switch]$Force
)

Write-Host "🚀 GitHub Pages Deployment for $RepoOwner/$RepoName" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan

# Check if we're in the right directory
$currentDir = Get-Location
if (-not (Test-Path "index.html")) {
    Write-Host "❌ index.html not found in current directory" -ForegroundColor Red
    Write-Host "📁 Current directory: $currentDir" -ForegroundColor Yellow
    Write-Host "💡 Please run this script from the repository root directory" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Found index.html in current directory" -ForegroundColor Green

# Check git status
Write-Host "`n📋 Checking repository status..." -ForegroundColor Yellow

try {
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Write-Host "⚠️ Uncommitted changes found:" -ForegroundColor Yellow
        git status --short
        
        if (-not $Force) {
            $commit = Read-Host "`nCommit changes before deployment? (y/N)"
            if ($commit -eq 'y' -or $commit -eq 'Y') {
                git add .
                $message = Read-Host "Enter commit message (default: 'Deploy to GitHub Pages')"
                if (-not $message) { $message = "Deploy to GitHub Pages" }
                git commit -m $message
                Write-Host "✅ Changes committed" -ForegroundColor Green
            }
        }
    }
}
catch {
    Write-Host "❌ Not a git repository or git not available" -ForegroundColor Red
    exit 1
}

# Check current branch
$currentBranch = git branch --show-current
Write-Host "📍 Current branch: $currentBranch" -ForegroundColor White

# Ensure we're on main branch
if ($currentBranch -ne "main") {
    Write-Host "⚠️ Not on main branch, switching..." -ForegroundColor Yellow
    git checkout main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to switch to main branch" -ForegroundColor Red
        exit 1
    }
}

# Push to main branch (GitHub Pages can serve from main)
Write-Host "`n📤 Pushing to main branch..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to main branch" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to push to main branch" -ForegroundColor Red
    Write-Host "💡 Check your GitHub authentication and repository permissions" -ForegroundColor Yellow
    exit 1
}

# Create/update gh-pages branch (alternative deployment method)
Write-Host "`n🌿 Setting up gh-pages branch..." -ForegroundColor Yellow

# Check if gh-pages branch exists locally
$ghPagesBranch = git branch --list gh-pages
if (-not $ghPagesBranch) {
    Write-Host "📝 Creating gh-pages branch..." -ForegroundColor Cyan
    git checkout -b gh-pages
    git push -u origin gh-pages
} else {
    Write-Host "📝 Updating gh-pages branch..." -ForegroundColor Cyan
    git checkout gh-pages
    git merge main
    git push origin gh-pages
}

# Return to main branch
git checkout main

# Display deployment information
Write-Host "`n📊 Deployment Summary" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan
Write-Host "👤 Repository: $RepoOwner/$RepoName" -ForegroundColor White
Write-Host "🌐 Main URL: https://$RepoOwner.github.io/$RepoName/" -ForegroundColor White
Write-Host "🌿 Alternative: https://$RepoOwner.github.io/$RepoName/ (from gh-pages)" -ForegroundColor White
Write-Host "📁 Source: main branch" -ForegroundColor White

Write-Host "`n⚠️ GitHub Pages Configuration Required" -ForegroundColor Yellow
Write-Host "=======================================" -ForegroundColor Yellow
Write-Host "1. Go to: https://github.com/$RepoOwner/$RepoName/settings/pages" -ForegroundColor White
Write-Host "2. Under 'Source', select 'Deploy from a branch'" -ForegroundColor White
Write-Host "3. Choose 'main' branch and '/ (root)' folder" -ForegroundColor White
Write-Host "4. Click 'Save'" -ForegroundColor White

Write-Host "`n🕒 GitHub Pages Deployment Process" -ForegroundColor Blue
Write-Host "===================================" -ForegroundColor Blue
Write-Host "• GitHub Pages deployment can take 5-10 minutes" -ForegroundColor Gray
Write-Host "• Check deployment status at: https://github.com/$RepoOwner/$RepoName/actions" -ForegroundColor Gray
Write-Host "• Look for 'pages build and deployment' workflow" -ForegroundColor Gray

Write-Host "`n✅ Deployment commands completed!" -ForegroundColor Green
Write-Host "🔍 Next: Configure GitHub Pages in repository settings" -ForegroundColor Green
Write-Host "⏳ Then wait 5-10 minutes for deployment to complete" -ForegroundColor Green