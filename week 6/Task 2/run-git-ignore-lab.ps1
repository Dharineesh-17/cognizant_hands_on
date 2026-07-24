# Git Ignore Hands-On Lab - Task 2 - Automated Script
# Week 6 - PratapSakthivel

Write-Host "=== Git Ignore Hands-On Lab - Task 2 ===" -ForegroundColor Cyan
Write-Host ""

# Navigate to GitIgnoreDemo directory
Set-Location -Path "GitIgnoreDemo"

# Step 1: Check initial status
Write-Host "Step 1: Checking initial Git status..." -ForegroundColor Yellow
Write-Host "(Before creating log files)" -ForegroundColor Gray
git status
Write-Host ""

# Step 2: Create log files and folders
Write-Host "Step 2: Creating log files and log folder..." -ForegroundColor Yellow
echo "Error: Application crashed at 10:00 AM" > app.log
echo "Warning: Low memory detected" > error.log
New-Item -ItemType Directory -Path "logs" -Force | Out-Null
echo "Debug: Starting application" > logs/debug.log
echo "Debug: Loading modules" > logs/system.log
Write-Host "Created: app.log, error.log, logs/debug.log, logs/system.log" -ForegroundColor Green
Write-Host ""

# Step 3: Check status before .gitignore
Write-Host "Step 3: Checking Git status (BEFORE .gitignore)..." -ForegroundColor Yellow
Write-Host "Notice: Log files and logs folder appear as untracked" -ForegroundColor Gray
git status
Write-Host ""
Read-Host "Press Enter to continue and create .gitignore"

# Step 4: Create .gitignore
Write-Host "Step 4: Creating .gitignore file..." -ForegroundColor Yellow
@"
# Ignore all log files
*.log

# Ignore logs directory
logs/
"@ | Out-File -FilePath .gitignore -Encoding utf8
Write-Host ".gitignore created with patterns: *.log and logs/" -ForegroundColor Green
Write-Host ""

# Step 5: Display .gitignore content
Write-Host "Step 5: .gitignore content:" -ForegroundColor Yellow
Get-Content .gitignore
Write-Host ""

# Step 6: Check status after .gitignore
Write-Host "Step 6: Checking Git status (AFTER .gitignore)..." -ForegroundColor Yellow
Write-Host "Notice: Log files and logs folder are now IGNORED!" -ForegroundColor Gray
git status
Write-Host ""
Read-Host "Press Enter to continue and commit .gitignore"

# Step 7: Add and commit .gitignore
Write-Host "Step 7: Adding and committing .gitignore..." -ForegroundColor Yellow
git add .gitignore
git add main.txt
git commit -m "Added .gitignore to ignore log files and folders"
Write-Host ""

# Step 8: Verify final status
Write-Host "Step 8: Verifying final Git status..." -ForegroundColor Yellow
git status
Write-Host ""

# Step 9: Test by creating more log files
Write-Host "Step 9: Testing .gitignore by creating new log files..." -ForegroundColor Yellow
echo "New error entry" > test.log
echo "Another debug entry" > logs/newfile.log
Write-Host "Created: test.log and logs/newfile.log" -ForegroundColor Green
Write-Host ""

# Step 10: Verify new files are ignored
Write-Host "Step 10: Checking Git status (new log files should be ignored)..." -ForegroundColor Yellow
git status
Write-Host ""

# Summary
Write-Host "=== Lab Completed Successfully! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "✓ Created log files (.log) and logs folder" -ForegroundColor White
Write-Host "✓ Verified they appear as untracked (before .gitignore)" -ForegroundColor White
Write-Host "✓ Created .gitignore with patterns: *.log and logs/" -ForegroundColor White
Write-Host "✓ Verified log files are now ignored" -ForegroundColor White
Write-Host "✓ Committed .gitignore to repository" -ForegroundColor White
Write-Host "✓ Tested with new log files - they are automatically ignored" -ForegroundColor White
Write-Host ""
Write-Host "Files in working directory:" -ForegroundColor Cyan
Get-ChildItem -Force | Select-Object Name, Length, LastWriteTime | Format-Table -AutoSize
Write-Host ""
Write-Host "Commit History:" -ForegroundColor Cyan
git log --oneline
Write-Host ""
