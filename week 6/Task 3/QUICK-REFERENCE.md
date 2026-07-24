# Git Branching & Merging - Quick Reference

## 🎯 Task 3 at a Glance

**Objective:** Learn branching and merging workflows  
**Time:** 30 minutes  
**Difficulty:** Beginner-Intermediate  

---

## 🚀 Fastest Way to Complete

```powershell
cd "week 6\Task 3"
.\run-git-branch-lab.ps1
```

The interactive script guides you through branching and merging!

---

## 📋 What You'll Do

### Branching:
1. ✓ Create new branch "GitNewBranch"
2. ✓ List all branches
3. ✓ Switch to new branch
4. ✓ Add files to branch
5. ✓ Commit changes
6. ✓ Check status

### Merging:
1. ✓ Switch back to master
2. ✓ View differences
3. ✓ Merge branch
4. ✓ View merge graph
5. ✓ Delete branch
6. ✓ Verify final state

---

## 🔑 Essential Commands

### Branching Commands:
```bash
git branch                      # List branches
git branch <name>               # Create branch
git checkout <name>             # Switch to branch
git checkout -b <name>          # Create & switch
git switch <name>               # Switch (newer)
```

### Merging Commands:
```bash
git merge <branch>              # Merge branch
git diff branch1..branch2       # Compare branches
git log --oneline --graph       # View history graph
git branch -d <name>            # Delete branch
```

---

## 📊 Visual Workflow

```
         master                  master
           |                       |
           |                    [merge]
           |                    /     \
           v                   v       v
        commit 1           commit 1   commit 3
                              |
                              |
                           commit 2
                              |
                         GitNewBranch

    BEFORE BRANCHING        AFTER MERGING
```

---

## 💡 Quick Concepts

### What is a Branch?
A parallel timeline where you can work independently without affecting the main code.

### What is Merging?
Combining changes from one branch into another.

### What is HEAD?
A pointer showing which branch/commit you're currently on.

---

## 📝 Step-by-Step Cheat Sheet

### 1. Create Branch
```bash
git branch GitNewBranch
```

### 2. Switch to Branch
```bash
git checkout GitNewBranch
```

### 3. Make Changes
```bash
echo "New feature" > feature.txt
git add feature.txt
git commit -m "Added feature"
```

### 4. Switch Back to Master
```bash
git checkout master
```

### 5. Merge Branch
```bash
git merge GitNewBranch
```

### 6. Delete Branch
```bash
git branch -d GitNewBranch
```

---

## 🎨 Branch Naming Conventions

| Pattern | Example | Purpose |
|---------|---------|---------|
| `feature/*` | feature/login | New features |
| `bugfix/*` | bugfix/issue-42 | Bug fixes |
| `hotfix/*` | hotfix/security | Urgent fixes |
| `release/*` | release/v1.0 | Release prep |
| `experiment/*` | experiment/new-ui | Experiments |

---

## 🔀 Merge Types

### Fast-Forward Merge
```bash
git merge feature-branch
```
- Linear history
- No merge commit

### No-Fast-Forward Merge
```bash
git merge --no-ff feature-branch
```
- Always creates merge commit
- Preserves branch history

### Squash Merge
```bash
git merge --squash feature-branch
```
- Combines all commits into one
- Cleaner history

---

## ⚠️ Common Issues & Solutions

### Can't Switch Branches (Uncommitted Changes)
```bash
# Option 1: Commit changes
git add .
git commit -m "WIP"

# Option 2: Stash changes
git stash
git checkout other-branch
git stash pop
```

### Merge Conflict
```bash
# View conflicted files
git status

# Resolve manually, then:
git add resolved-file.txt
git commit

# Or abort merge
git merge --abort
```

### Accidentally Deleted Branch
```bash
# Find commit hash
git reflog

# Recreate branch
git branch branch-name <commit-hash>
```

---

## 📊 Useful Viewing Commands

### View Branch Graph
```bash
git log --oneline --graph --decorate --all
```

### View Branch Differences
```bash
git diff master..feature-branch
```

### View Commits in Branch
```bash
git log master..feature-branch
```

### View Merged Branches
```bash
git branch --merged
```

---

## 🌐 GitLab Workflow

### Push Branch
```bash
git push origin GitNewBranch
```

### Create Merge Request
1. Go to GitLab
2. Click "Create merge request"
3. Select branches
4. Add description
5. Assign reviewers
6. Submit

---

## ✅ Success Indicators

You'll know you succeeded when:

✅ New branch appears in `git branch`  
✅ Files exist in new branch only  
✅ Merge brings files to master  
✅ Graph shows merge history  
✅ Deleted branch disappears  

---

## 🎯 Practice Exercises

### Exercise 1: Basic Flow
```bash
git checkout -b test-feature
echo "test" > test.txt
git add test.txt
git commit -m "Test"
git checkout master
git merge test-feature
git branch -d test-feature
```

### Exercise 2: Multiple Branches
```bash
git checkout -b feature1
# Make changes
git checkout master
git checkout -b feature2
# Make changes
git checkout master
git merge feature1
git merge feature2
```

### Exercise 3: Compare Branches
```bash
git diff master..feature-branch
git log master..feature-branch
git log --oneline --graph --all
```

---

## 📚 Advanced Topics

### Cherry-Pick (Apply specific commit)
```bash
git cherry-pick <commit-hash>
```

### Rebase (Rewrite history)
```bash
git rebase master
```

### Interactive Rebase
```bash
git rebase -i HEAD~3
```

---

## 🔗 Related Files

- **README.md** - Full instructions
- **Git-Branch-Commands.md** - Detailed command reference
- **run-git-branch-lab.ps1** - Automated script

---

## 🎓 Key Takeaways

1. **Branches are cheap** - Create them freely
2. **Merge often** - Keep branches short-lived
3. **Delete merged branches** - Keep repo clean
4. **Use meaningful names** - Follow conventions
5. **Review before merging** - Check diffs carefully

---

**Ready? Run the script and master branching! 🚀**
