# Git Remote Push & Cleanup Lab - Task 5 - Interactive Script
# Week 6 - Dharineesh-17

Write-Host "=== Git Remote Push & Cleanup Lab - Task 5 ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "This lab demonstrates remote repository operations" -ForegroundColor Yellow
Write-Host ""

# Navigate to GitRemoteDemo directory
Set-Location -Path "GitRemoteDemo"

# Step 1: Verify master is clean
Write-Host "Step 1: Verifying master is in clean state..." -ForegroundColor Yellow
git status
Write-Host ""
Read-Host "Press Enter to list all branches"

# Step 2: List all branches
Write-Host "Step 2: Listing all branches..." -ForegroundColor Yellow
Write-Host "Local branches:" -ForegroundColor Gray
git branch
Write-Host ""
Write-Host "All branches (including remote):" -ForegroundColor Gray
git branch -a
Write-Host ""
Read-Host "Press Enter to check remote configuration"

# Step 3: Check remote configuration
Write-Host "Step 3: Checking remote configuration..." -ForegroundColor Yellow
$hasRemote = git remote -v
if ($hasRemote) {
    Write-Host "Current remotes:" -ForegroundColor Green
    git remote -v
    Write-Host ""
} else {
    Write-Host "No remote configured yet." -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Magenta
Write-Host "REMOTE SETUP REQUIRED" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "To complete this lab, you need a remote repository:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Option 1: GitLab" -ForegroundColor Yellow
Write-Host "  1. Go to https://gitlab.com" -ForegroundColor White
Write-Host "  2. Create new project 'GitRemoteDemo'" -ForegroundColor White
Write-Host "  3. Copy the repository URL" -ForegroundColor White
Write-Host ""
Write-Host "Option 2: GitHub" -ForegroundColor Yellow
Write-Host "  1. Go to https://github.com" -ForegroundColor White
Write-Host "  2. Create new repository 'GitRemoteDemo'" -ForegroundColor White
Write-Host "  3. Don't initialize with README" -ForegroundColor White
Write-Host "  4. Copy the repository URL" -ForegroundColor White
Write-Host ""
Write-Host "Example URLs:" -ForegroundColor Gray
Write-Host "  GitLab: https://gitlab.com/PratapSakthivel/GitRemoteDemo.git" -ForegroundColor Gray
Write-Host "  GitHub: https://github.com/PratapSakthivel/GitRemoteDemo.git" -ForegroundColor Gray
Write-Host ""

# Step 4: Add remote
$response = Read-Host "Do you want to add a remote repository? (y/n)"
if ($response -eq 'y' -or $response -eq 'Y') {
    $remoteUrl = Read-Host "Enter your remote repository URL"
    
    if ($remoteUrl) {
        Write-Host ""
        Write-Host "Step 4: Adding remote 'origin'..." -ForegroundColor Yellow
        
        # Remove existing origin if present
        git remote remove origin 2>$null
        
        git remote add origin $remoteUrl
        Write-Host "Remote 'origin' added successfully!" -ForegroundColor Green
        Write-Host ""
        
        # Verify remote
        Write-Host "Verifying remote configuration:" -ForegroundColor Yellow
        git remote -v
        Write-Host ""
    } else {
        Write-Host "No URL provided. Skipping remote setup." -ForegroundColor Yellow
        Write-Host ""
    }
} else {
    Write-Host "Skipping remote setup." -ForegroundColor Yellow
    Write-Host "You can add it later with: git remote add origin <url>" -ForegroundColor Gray
    Write-Host ""
}

Read-Host "Press Enter to check for uncommitted changes"

# Step 5: Create some changes if needed
Write-Host "Step 5: Ensuring we have commits to push..." -ForegroundColor Yellow
$hasChanges = git status --short
if (-not $hasChanges) {
    Write-Host "Working directory is clean. Creating a new file..." -ForegroundColor Yellow
    @"
# GitRemoteDemo

This repository demonstrates remote Git operations.

## Student Information
- Name: PratapSakthivel
- Email: pratapssakthivel@gmail.com

## Lab: Git Remote Push & Cleanup

### What This Lab Covers:
- Verifying repository state
- Listing branches
- Pulling from remote
- Pushing to remote
- Verifying remote changes

### Completed: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
"@ | Out-File -FilePath project-info.md -Encoding utf8
    
    git add project-info.md
    git commit -m "Added project information and lab details"
    Write-Host "Created and committed project-info.md" -ForegroundColor Green
    Write-Host ""
}

# Step 6: View commits to be pushed
Write-Host "Step 6: Viewing commit history..." -ForegroundColor Yellow
git log --oneline --graph --decorate -5
Write-Host ""

# Step 7: Check if remote is configured for push
$hasRemoteForPush = git remote -v | Select-String "push"
if ($hasRemoteForPush) {
    Read-Host "Press Enter to pull from remote (if it exists)"
    
    # Step 8: Pull from remote
    Write-Host "Step 7: Pulling from remote repository..." -ForegroundColor Yellow
    Write-Host "Attempting to pull from origin..." -ForegroundColor Gray
    Write-Host ""
    
    # Try to pull (might fail if remote is empty)
    $pullResult = git pull origin master 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Pull successful!" -ForegroundColor Green
    } else {
        Write-Host "Pull not possible (remote might be empty or not exist yet)" -ForegroundColor Yellow
        Write-Host "This is normal for a new repository" -ForegroundColor Gray
    }
    Write-Host ""
    
    Read-Host "Press Enter to push to remote"
    
    # Step 9: Push to remote
    Write-Host "Step 8: Pushing to remote repository..." -ForegroundColor Yellow
    Write-Host "Pushing commits to origin master..." -ForegroundColor Gray
    Write-Host ""
    
    git push -u origin master
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Push successful!" -ForegroundColor Green
        Write-Host "Your changes are now on the remote repository!" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "Push failed. Common reasons:" -ForegroundColor Red
        Write-Host "  • Authentication required (use personal access token)" -ForegroundColor White
        Write-Host "  • Remote repository doesn't exist" -ForegroundColor White
        Write-Host "  • No permission to push" -ForegroundColor White
        Write-Host "  • Wrong branch name (try 'main' instead of 'master')" -ForegroundColor White
        Write-Host ""
    }
    
    # Step 10: Verify status
    Write-Host "Step 9: Verifying final status..." -ForegroundColor Yellow
    git status
    Write-Host ""
    
    # Step 11: Show remote info
    Write-Host "Step 10: Remote repository information..." -ForegroundColor Yellow
    git remote show origin
    Write-Host ""
    
} else {
    Write-Host "No remote configured. Skipping push/pull operations." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To push later:" -ForegroundColor Cyan
    Write-Host "  1. git remote add origin <your-repo-url>" -ForegroundColor White
    Write-Host "  2. git push -u origin master" -ForegroundColor White
    Write-Host ""
}

# Summary
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "LAB COMPLETED!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "What You Learned:" -ForegroundColor Cyan
Write-Host "✓ Verified repository clean state" -ForegroundColor White
Write-Host "✓ Listed all branches (local and remote)" -ForegroundColor White
Write-Host "✓ Configured remote repository" -ForegroundColor White
Write-Host "✓ Pulled from remote repository" -ForegroundColor White
Write-Host "✓ Pushed changes to remote repository" -ForegroundColor White
Write-Host "✓ Verified remote repository state" -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Visit your remote repository in browser:" -ForegroundColor White
if ($remoteUrl) {
    $webUrl = $remoteUrl -replace '\.git$', '' -replace 'git@', 'https://' -replace ':', '/'
    Write-Host "   $webUrl" -ForegroundColor Gray
}
Write-Host "2. Verify your commits are visible" -ForegroundColor White
Write-Host "3. Check files are uploaded correctly" -ForegroundColor White
Write-Host "4. Practice more: make changes, commit, push" -ForegroundColor White
Write-Host ""
Write-Host "Key Commands Review:" -ForegroundColor Cyan
Write-Host "  git remote -v                 # List remotes" -ForegroundColor White
Write-Host "  git pull origin master        # Pull from remote" -ForegroundColor White
Write-Host "  git push origin master        # Push to remote" -ForegroundColor White
Write-Host "  git remote show origin        # Show remote info" -ForegroundColor White
Write-Host ""
