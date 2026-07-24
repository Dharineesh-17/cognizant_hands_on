# Git Hands-On Lab - Task 1 - Automated Script
# Week 6 - PratapSakthivel

Write-Host "=== Git Hands-On Lab - Task 1 ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Configure Git
Write-Host "Step 1: Configuring Git..." -ForegroundColor Yellow
git config --global user.name "Dharineesh17"
git config --global user.email "dharineeshvengatesan@gmail.com"
Write-Host "Git configuration completed!" -ForegroundColor Green
Write-Host ""

# Verify configuration
Write-Host "Verifying Git Configuration:" -ForegroundColor Yellow
git config --global user.name
git config --global user.email
Write-Host ""

# Navigate to GitDemo directory
Set-Location -Path "GitDemo"

# Step 2: Check Git Status
Write-Host "Step 2: Checking Git Status..." -ForegroundColor Yellow
git status
Write-Host ""

# Step 3: Add file to staging area
Write-Host "Step 3: Adding welcome.txt to staging area..." -ForegroundColor Yellow
git add welcome.txt
git status
Write-Host ""

# Step 4: Commit the file
Write-Host "Step 4: Committing changes..." -ForegroundColor Yellow
git commit -m "Initial commit: Added welcome.txt file with welcome message"
Write-Host ""

# Step 5: Check status after commit
Write-Host "Step 5: Checking status after commit..." -ForegroundColor Yellow
git status
Write-Host ""

# Display commit log
Write-Host "Commit History:" -ForegroundColor Yellow
git log --oneline
Write-Host ""

Write-Host "=== Local Git Setup Completed Successfully! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Create a GitLab account at https://gitlab.com" -ForegroundColor White
Write-Host "2. Create a new project named 'GitDemo'" -ForegroundColor White
Write-Host "3. Copy the repository URL" -ForegroundColor White
Write-Host "4. Run these commands to push to remote:" -ForegroundColor White
Write-Host "   git remote add origin <your-gitlab-repo-url>" -ForegroundColor Gray
Write-Host "   git push -u origin master" -ForegroundColor Gray
Write-Host ""
