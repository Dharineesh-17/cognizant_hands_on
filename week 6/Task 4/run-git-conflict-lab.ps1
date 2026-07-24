

Write-Host "=== Git Conflict Resolution Lab - Task 4 ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "This lab demonstrates how to handle merge conflicts" -ForegroundColor Yellow
Write-Host ""

# Navigate to GitConflictDemo directory
Set-Location -Path "GitConflictDemo"

# Step 1: Verify master is clean
Write-Host "Step 1: Verifying master is in clean state..." -ForegroundColor Yellow
git status
Write-Host ""
Read-Host "Press Enter to create a new branch"

# Step 2: Create and switch to GitWork branch
Write-Host "Step 2: Creating branch 'GitWork'..." -ForegroundColor Yellow
git branch GitWork
git checkout GitWork
Write-Host "Switched to GitWork branch" -ForegroundColor Green
Write-Host ""

# Step 3: Create hello.xml in branch
Write-Host "Step 3: Creating hello.xml in GitWork branch..." -ForegroundColor Yellow
@"
<hello>
    <message>Hello from GitWork branch!</message>
    <author>PratapSakthivel</author>
    <version>Branch Version 1.0</version>
</hello>
"@ | Out-File -FilePath hello.xml -Encoding utf8
Write-Host "Created hello.xml with branch-specific content" -ForegroundColor Green
Write-Host ""

# Step 4: Check status and content
Write-Host "Step 4: Checking file content..." -ForegroundColor Yellow
Get-Content hello.xml
Write-Host ""
git status
Write-Host ""
Read-Host "Press Enter to commit this file to the branch"

# Step 5: Commit to branch
Write-Host "Step 5: Committing hello.xml to GitWork branch..." -ForegroundColor Yellow
git add hello.xml
git commit -m "Added hello.xml in GitWork branch"
Write-Host ""

# Step 6: Switch back to master
Write-Host "Step 6: Switching back to master branch..." -ForegroundColor Yellow
git checkout master
Write-Host "Switched to master" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to create a CONFLICTING hello.xml in master"

# Step 7: Create conflicting hello.xml in master
Write-Host "Step 7: Creating DIFFERENT hello.xml in master..." -ForegroundColor Yellow
@"
<hello>
    <message>Hello from Master branch!</message>
    <author>PratapSakthivel</author>
    <version>Master Version 2.0</version>
</hello>
"@ | Out-File -FilePath hello.xml -Encoding utf8
Write-Host "Created hello.xml with DIFFERENT content in master" -ForegroundColor Red
Write-Host ""

# Step 8: Check content
Write-Host "Step 8: Checking master's hello.xml content..." -ForegroundColor Yellow
Get-Content hello.xml
Write-Host ""
Read-Host "Press Enter to commit this to master"

# Step 9: Commit to master
Write-Host "Step 9: Committing hello.xml to master..." -ForegroundColor Yellow
git add hello.xml
git commit -m "Added hello.xml in master branch"
Write-Host ""

# Step 10: View log with graph
Write-Host "Step 10: Viewing commit history (notice the diverged branches)..." -ForegroundColor Yellow
git log --oneline --graph --decorate --all
Write-Host ""
Read-Host "Press Enter to view differences between branches"

# Step 11: Check differences
Write-Host "Step 11: Checking differences between master and GitWork..." -ForegroundColor Yellow
git diff master..GitWork
Write-Host ""
Read-Host "Press Enter to attempt merge (this will cause a CONFLICT!)"

# Step 12: Attempt merge (will conflict!)
Write-Host "Step 12: Attempting to merge GitWork into master..." -ForegroundColor Yellow
Write-Host "WARNING: This will cause a merge conflict!" -ForegroundColor Red
Write-Host ""
git merge GitWork
Write-Host ""
Write-Host "CONFLICT DETECTED! This is expected." -ForegroundColor Red
Write-Host ""

# Step 13: Show conflict status
Write-Host "Step 13: Checking status (showing conflicted files)..." -ForegroundColor Yellow
git status
Write-Host ""
Read-Host "Press Enter to view the conflict markers in hello.xml"

# Step 14: Display conflict markers
Write-Host "Step 14: Viewing conflict markers in hello.xml..." -ForegroundColor Yellow
Write-Host "Look for <<<<<<< HEAD, =======, and >>>>>>> markers" -ForegroundColor Gray
Write-Host ""
Get-Content hello.xml
Write-Host ""
Write-Host "Conflict Markers Explanation:" -ForegroundColor Cyan
Write-Host "  <<<<<<< HEAD          = Start of current branch (master) content" -ForegroundColor White
Write-Host "  =======               = Separator" -ForegroundColor White
Write-Host "  >>>>>>> GitWork       = End of merging branch content" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to resolve the conflict"

# Step 15: Resolve conflict (keep both with modifications)
Write-Host "Step 15: Resolving conflict (keeping both messages)..." -ForegroundColor Yellow
@"
<hello>
    <message>Hello from Master and GitWork branches - MERGED!</message>
    <author>PratapSakthivel</author>
    <version>Merged Version 3.0</version>
    <note>Conflict resolved successfully</note>
</hello>
"@ | Out-File -FilePath hello.xml -Encoding utf8
Write-Host "Conflict resolved! Created merged version." -ForegroundColor Green
Write-Host ""

# Step 16: Show resolved content
Write-Host "Step 16: Viewing resolved content..." -ForegroundColor Yellow
Get-Content hello.xml
Write-Host ""
Read-Host "Press Enter to mark conflict as resolved"

# Step 17: Stage resolved file
Write-Host "Step 17: Staging resolved file..." -ForegroundColor Yellow
git add hello.xml
Write-Host "File marked as resolved" -ForegroundColor Green
Write-Host ""

# Step 18: Check status before commit
Write-Host "Step 18: Checking status before final commit..." -ForegroundColor Yellow
git status
Write-Host ""
Read-Host "Press Enter to commit the merge"

# Step 19: Commit the merge
Write-Host "Step 19: Completing the merge with commit..." -ForegroundColor Yellow
git commit -m "Resolved conflict between master and GitWork branches"
Write-Host "Merge completed successfully!" -ForegroundColor Green
Write-Host ""

# Step 20: Check for backup files
Write-Host "Step 20: Checking for backup files (.orig)..." -ForegroundColor Yellow
$backupFiles = Get-ChildItem -Filter "*.orig" -ErrorAction SilentlyContinue
if ($backupFiles) {
    Write-Host "Found backup files: $($backupFiles.Name)" -ForegroundColor Yellow
    Write-Host "We'll add these to .gitignore" -ForegroundColor Yellow
} else {
    Write-Host "No backup files found (this is normal if mergetool wasn't used)" -ForegroundColor Gray
}
Write-Host ""
Read-Host "Press Enter to update .gitignore"

# Step 21: Update .gitignore
Write-Host "Step 21: Adding backup files to .gitignore..." -ForegroundColor Yellow
if (Test-Path .gitignore) {
    Add-Content -Path .gitignore -Value "`n# Merge tool backup files"
    Add-Content -Path .gitignore -Value "*.orig"
} else {
    @"
# Merge tool backup files
*.orig
"@ | Out-File -FilePath .gitignore -Encoding utf8
}
Write-Host ".gitignore updated" -ForegroundColor Green
git add .gitignore
git commit -m "Added merge backup files to gitignore"
Write-Host ""

# Step 22: List branches
Write-Host "Step 22: Listing all branches..." -ForegroundColor Yellow
git branch
Write-Host ""
Read-Host "Press Enter to delete the merged branch"

# Step 23: Delete merged branch
Write-Host "Step 23: Deleting merged branch 'GitWork'..." -ForegroundColor Yellow
git branch -d GitWork
Write-Host "Branch deleted" -ForegroundColor Green
Write-Host ""

# Step 24: Final log
Write-Host "Step 24: Viewing final commit history..." -ForegroundColor Yellow
Write-Host "Notice the merge commit connecting both branches" -ForegroundColor Gray
git log --oneline --graph --decorate --all
Write-Host ""

# Step 25: Final status
Write-Host "Step 25: Final git status..." -ForegroundColor Yellow
git status
Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "LAB COMPLETED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "What You Learned:" -ForegroundColor Cyan
Write-Host "✓ Created conflicting changes in different branches" -ForegroundColor White
Write-Host "✓ Attempted merge and encountered conflict" -ForegroundColor White
Write-Host "✓ Identified conflict markers in files" -ForegroundColor White
Write-Host "✓ Resolved conflict manually" -ForegroundColor White
Write-Host "✓ Completed merge after resolution" -ForegroundColor White
Write-Host "✓ Added backup files to .gitignore" -ForegroundColor White
Write-Host "✓ Cleaned up by deleting merged branch" -ForegroundColor White
Write-Host ""
Write-Host "Key Takeaways:" -ForegroundColor Cyan
Write-Host "• Conflicts happen when same files are modified differently" -ForegroundColor White
Write-Host "• Conflict markers: <<<<<<< HEAD, =======, >>>>>>>" -ForegroundColor White
Write-Host "• Always test code after resolving conflicts" -ForegroundColor White
Write-Host "• Communication with team prevents many conflicts" -ForegroundColor White
Write-Host ""
Write-Host "Files in repository:" -ForegroundColor Cyan
Get-ChildItem -File | Select-Object Name | Format-Table -HideTableHeaders
Write-Host ""
Write-Host "Final commit graph:" -ForegroundColor Cyan
git log --oneline --graph --decorate -5
Write-Host ""
