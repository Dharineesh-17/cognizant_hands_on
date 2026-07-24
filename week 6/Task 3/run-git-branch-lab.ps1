# Git Branching and Merging Lab - Task 3 - Automated Script
# Week 6 - Darineesh-17

Write-Host "=== Git Branching and Merging Lab - Task 3 ===" -ForegroundColor Cyan
Write-Host ""

# Navigate to GitBranchDemo directory
Set-Location -Path "GitBranchDemo"

Write-Host "Repository: GitBranchDemo" -ForegroundColor Yellow
Write-Host ""

# ============================================
# PART 1: BRANCHING
# ============================================

Write-Host "========================================" -ForegroundColor Magenta
Write-Host "PART 1: BRANCHING" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""

# Step 1: Show current branch
Write-Host "Step 1: Current branch status" -ForegroundColor Yellow
git branch
Write-Host ""
Read-Host "Press Enter to create a new branch"

# Step 2: Create new branch
Write-Host "Step 2: Creating new branch 'GitNewBranch'..." -ForegroundColor Yellow
git branch GitNewBranch
Write-Host "Branch 'GitNewBranch' created!" -ForegroundColor Green
Write-Host ""

# Step 3: List all branches
Write-Host "Step 3: Listing all local and remote branches..." -ForegroundColor Yellow
Write-Host "Note: The '*' marks the current branch" -ForegroundColor Gray
git branch -a
Write-Host ""
Read-Host "Press Enter to switch to the new branch"

# Step 4: Switch to new branch
Write-Host "Step 4: Switching to 'GitNewBranch'..." -ForegroundColor Yellow
git checkout GitNewBranch
Write-Host ""

# Step 5: Confirm switch
Write-Host "Step 5: Confirming current branch..." -ForegroundColor Yellow
git branch
Write-Host ""
Read-Host "Press Enter to add new files to this branch"

# Step 6: Create new files in branch
Write-Host "Step 6: Creating new files in 'GitNewBranch'..." -ForegroundColor Yellow
echo "This is a new feature in GitNewBranch" > feature.txt
echo "Additional functionality added" > feature2.txt
Write-Host "Created: feature.txt and feature2.txt" -ForegroundColor Green
Write-Host ""

# Step 7: Check status before adding
Write-Host "Step 7: Git status (before adding files)..." -ForegroundColor Yellow
git status
Write-Host ""
Read-Host "Press Enter to add files to staging"

# Step 8: Add files to staging
Write-Host "Step 8: Adding files to staging area..." -ForegroundColor Yellow
git add feature.txt feature2.txt
Write-Host "Files staged!" -ForegroundColor Green
Write-Host ""

# Step 9: Check status after adding
Write-Host "Step 9: Git status (after staging)..." -ForegroundColor Yellow
git status
Write-Host ""
Read-Host "Press Enter to commit changes"

# Step 10: Commit changes
Write-Host "Step 10: Committing changes to 'GitNewBranch'..." -ForegroundColor Yellow
git commit -m "Added feature.txt and feature2.txt in GitNewBranch"
Write-Host ""

# Step 11: Check status after commit
Write-Host "Step 11: Git status (after commit)..." -ForegroundColor Yellow
git status
Write-Host "Working tree is clean!" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to continue to MERGING section"

# ============================================
# PART 2: MERGING
# ============================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "PART 2: MERGING" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""

# Step 12: Switch back to master
Write-Host "Step 12: Switching back to master branch..." -ForegroundColor Yellow
git checkout master
Write-Host ""

# Step 13: Confirm switch
Write-Host "Step 13: Confirming current branch..." -ForegroundColor Yellow
git branch
Write-Host ""
Read-Host "Press Enter to view differences between branches"

# Step 14: Show differences (text)
Write-Host "Step 14: Differences between master and GitNewBranch (text)..." -ForegroundColor Yellow
Write-Host "Command: git diff master..GitNewBranch" -ForegroundColor Gray
git diff master..GitNewBranch
Write-Host ""
Read-Host "Press Enter to view file list differences"

# Step 15: Show file differences
Write-Host "Step 15: Files that differ between branches..." -ForegroundColor Yellow
git diff --name-only master..GitNewBranch
Write-Host ""

# Step 16: P4Merge option
Write-Host "Step 16: P4Merge Tool (Optional)" -ForegroundColor Yellow
Write-Host "To use P4Merge for visual diff, you can run:" -ForegroundColor Gray
Write-Host "  git difftool master..GitNewBranch" -ForegroundColor Gray
Write-Host ""
Write-Host "Skipping P4Merge in automated script..." -ForegroundColor Gray
Write-Host ""
Read-Host "Press Enter to merge the branches"

# Step 17: Merge branch
Write-Host "Step 17: Merging 'GitNewBranch' into master..." -ForegroundColor Yellow
git merge GitNewBranch
Write-Host ""
Write-Host "Merge completed!" -ForegroundColor Green
Write-Host ""

# Step 18: View merge history
Write-Host "Step 18: Viewing merge history with graph..." -ForegroundColor Yellow
Write-Host "Command: git log --oneline --graph --decorate" -ForegroundColor Gray
git log --oneline --graph --decorate --all
Write-Host ""
Read-Host "Press Enter to delete the merged branch"

# Step 19: Delete branch
Write-Host "Step 19: Deleting merged branch 'GitNewBranch'..." -ForegroundColor Yellow
git branch -d GitNewBranch
Write-Host "Branch deleted!" -ForegroundColor Green
Write-Host ""

# Step 20: Verify deletion
Write-Host "Step 20: Verifying branch deletion..." -ForegroundColor Yellow
git branch
Write-Host ""

# Step 21: Final status
Write-Host "Step 21: Final git status..." -ForegroundColor Yellow
git status
Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "LAB COMPLETED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "✓ Created branch 'GitNewBranch'" -ForegroundColor White
Write-Host "✓ Switched to new branch" -ForegroundColor White
Write-Host "✓ Added files (feature.txt, feature2.txt)" -ForegroundColor White
Write-Host "✓ Committed changes to branch" -ForegroundColor White
Write-Host "✓ Switched back to master" -ForegroundColor White
Write-Host "✓ Viewed differences between branches" -ForegroundColor White
Write-Host "✓ Merged branch into master" -ForegroundColor White
Write-Host "✓ Viewed merge graph" -ForegroundColor White
Write-Host "✓ Deleted merged branch" -ForegroundColor White
Write-Host ""
Write-Host "Final Repository State:" -ForegroundColor Cyan
Write-Host "Current Branch: master" -ForegroundColor White
Write-Host "Files:" -ForegroundColor White
Get-ChildItem -File | Select-Object Name | Format-Table -HideTableHeaders
Write-Host ""
Write-Host "Commit History:" -ForegroundColor Cyan
git log --oneline --graph --decorate --all -5
Write-Host ""
Write-Host "Next Steps (Optional):" -ForegroundColor Cyan
Write-Host "1. Push to remote: git push origin master" -ForegroundColor White
Write-Host "2. Create merge request in GitLab" -ForegroundColor White
Write-Host "3. Experiment with more branches" -ForegroundColor White
Write-Host ""
