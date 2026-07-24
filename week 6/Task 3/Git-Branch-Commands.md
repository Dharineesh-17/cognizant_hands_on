# Git Branching and Merging - Task 3 Commands

## Setup Information
- **Username:** Dharineesh-17
- **Email:** dharineeshvengatesan@gmail.com

---

## What are Branches?

**Branches** are independent lines of development in Git. They allow you to work on different features, bug fixes, or experiments simultaneously without affecting the main codebase.

### Key Concepts:
- **master/main**: The default primary branch
- **HEAD**: Pointer to your current branch/commit
- **Branch pointer**: Each branch is just a pointer to a specific commit
- **Lightweight**: Creating branches is fast and cheap in Git

---

## Part 1: Branching

### Step 1: Check Current Branch Status

```bash
git branch
```

**What it does:**
- Lists all local branches
- Shows `*` next to current branch

**Expected Output:**
```
* master
```

---

### Step 2: Create a New Branch

```bash
git branch GitNewBranch
```

**What it does:**
- Creates a new branch named "GitNewBranch"
- Doesn't switch to it yet
- The new branch points to the same commit as your current branch

**Alternative (create and switch):**
```bash
git checkout -b GitNewBranch
# Or newer syntax:
git switch -c GitNewBranch
```

---

### Step 3: List All Branches

```bash
# List local branches only
git branch

# List all branches (local and remote)
git branch -a

# List with more details
git branch -v
```

**What it shows:**
- Local branches
- Remote branches (with `-a`)
- Current branch marked with `*`
- Last commit on each branch (with `-v`)

**Expected Output:**
```
  GitNewBranch
* master
  remotes/origin/master
```

---

### Step 4: Switch to the New Branch

```bash
# Old way
git checkout GitNewBranch

# New way (Git 2.23+)
git switch GitNewBranch
```

**What it does:**
- Changes your working directory to the new branch
- Updates HEAD to point to GitNewBranch
- Files in working directory update to match branch

**Verify switch:**
```bash
git branch
```

**Expected Output:**
```
* GitNewBranch
  master
```

---

### Step 5: Create Files in the Branch

```bash
# Create first file
echo "This is a new feature in GitNewBranch" > feature.txt

# Create second file
echo "Additional functionality added" > feature2.txt

# Or in PowerShell
"This is a new feature" | Out-File -FilePath feature.txt
"Additional functionality" | Out-File -FilePath feature2.txt
```

**Verify files:**
```bash
ls
# Or
dir
```

---

### Step 6: Check Git Status

```bash
git status
```

**Expected Output:**
```
On branch GitNewBranch
Untracked files:
  feature.txt
  feature2.txt
```

---

### Step 7: Add Files to Staging Area

```bash
# Add specific files
git add feature.txt feature2.txt

# Or add all files
git add .
```

**Check status again:**
```bash
git status
```

**Expected Output:**
```
On branch GitNewBranch
Changes to be committed:
  new file:   feature.txt
  new file:   feature2.txt
```

---

### Step 8: Commit Changes to Branch

```bash
git commit -m "Added feature.txt and feature2.txt in GitNewBranch"
```

**What it does:**
- Creates a new commit on GitNewBranch
- master branch is unaffected
- Branches have now diverged

---

### Step 9: Verify Commit Status

```bash
git status
```

**Expected Output:**
```
On branch GitNewBranch
nothing to commit, working tree clean
```

**View commit:**
```bash
git log --oneline
```

---

## Part 2: Merging

### Step 10: Switch Back to Master

```bash
git checkout master
# Or
git switch master
```

**What happens:**
- Working directory updates to master state
- feature.txt and feature2.txt disappear (they're only in GitNewBranch)
- HEAD points to master

**Verify:**
```bash
git branch
ls
```

---

### Step 11: View Differences Between Branches

#### Text-Based Diff:
```bash
# Compare branches
git diff master..GitNewBranch

# Show only file names
git diff --name-only master..GitNewBranch

# Show summary statistics
git diff --stat master..GitNewBranch
```

**Expected Output:**
```diff
diff --git a/feature.txt b/feature.txt
new file mode 100644
index 0000000..abc1234
--- /dev/null
+++ b/feature.txt
@@ -0,0 +1 @@
+This is a new feature in GitNewBranch
```

---

### Step 12: View Visual Differences (P4Merge)

```bash
git difftool master..GitNewBranch
```

**Prerequisites:**
- P4Merge must be installed
- Git must be configured to use P4Merge

**Configuration:**
```bash
git config --global merge.tool p4merge
git config --global mergetool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
git config --global diff.tool p4merge
git config --global difftool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
```

---

### Step 13: Merge Branch into Master

```bash
git merge GitNewBranch
```

**What it does:**
- Combines changes from GitNewBranch into master
- Creates a merge commit (or fast-forward if possible)
- Brings feature.txt and feature2.txt into master

**Expected Output (Fast-Forward):**
```
Updating abc1234..def5678
Fast-forward
 feature.txt  | 1 +
 feature2.txt | 1 +
 2 files changed, 2 insertions(+)
 create mode 100644 feature.txt
 create mode 100644 feature2.txt
```

**Expected Output (Merge Commit):**
```
Merge made by the 'recursive' strategy.
 feature.txt  | 1 +
 feature2.txt | 1 +
 2 files changed, 2 insertions(+)
 create mode 100644 feature.txt
 create mode 100644 feature2.txt
```

---

### Step 14: View Merge History with Graph

```bash
# Simple graph
git log --oneline --graph

# Detailed graph with decorations
git log --oneline --graph --decorate

# Include all branches
git log --oneline --graph --decorate --all

# Limit to last 5 commits
git log --oneline --graph --decorate --all -5
```

**Expected Output:**
```
*   abc1234 (HEAD -> master) Merge branch 'GitNewBranch'
|\
| * def5678 (GitNewBranch) Added feature.txt and feature2.txt in GitNewBranch
|/
* 123abcd Initial commit
```

**Understanding the Graph:**
- `*` = Commit
- `|` = Branch line
- `/` and `\` = Merge lines
- `(HEAD -> master)` = Current position

---

### Step 15: Delete the Merged Branch

```bash
# Safe delete (only if merged)
git branch -d GitNewBranch

# Force delete (even if not merged)
git branch -D GitNewBranch
```

**What it does:**
- Removes the branch pointer
- Commits remain in history
- `-d` prevents deletion if not merged (safety)
- `-D` forces deletion

**Expected Output:**
```
Deleted branch GitNewBranch (was def5678).
```

---

### Step 16: Verify Branch Deletion

```bash
# List branches
git branch

# Check status
git status
```

**Expected Output:**
```
* master
```

---

## Advanced Branch Commands

### Create and Switch in One Command:
```bash
git checkout -b new-feature
# Or
git switch -c new-feature
```

### Rename a Branch:
```bash
# Rename current branch
git branch -m new-name

# Rename any branch
git branch -m old-name new-name
```

### View Branch Information:
```bash
# Show last commit on each branch
git branch -v

# Show merged branches
git branch --merged

# Show unmerged branches
git branch --no-merged
```

### Compare Branches:
```bash
# Commits in branch2 not in branch1
git log branch1..branch2

# Commits in either branch but not both
git log branch1...branch2
```

---

## Merge Strategies

### Fast-Forward Merge:
```bash
git merge feature-branch
```
- No merge commit created
- Simply moves pointer forward
- Linear history

### No-Fast-Forward Merge:
```bash
git merge --no-ff feature-branch
```
- Always creates merge commit
- Preserves branch history
- Clearer history graph

### Squash Merge:
```bash
git merge --squash feature-branch
git commit -m "Merged feature"
```
- Combines all commits into one
- Cleaner history
- Loses individual commit details

---

## Handling Merge Conflicts

### When Conflicts Occur:
```bash
# View conflicted files
git status

# Open conflicted file and resolve
# Look for conflict markers:
# <<<<<<< HEAD
# Your changes
# =======
# Their changes
# >>>>>>> branch-name

# After resolving
git add resolved-file.txt
git commit -m "Resolved merge conflict"
```

### Abort Merge:
```bash
git merge --abort
```

### Use Visual Merge Tool:
```bash
git mergetool
```

---

## Common Branch Workflows

### Feature Branch Workflow:
```bash
# Create feature branch
git checkout -b feature/login

# Work on feature
git add .
git commit -m "Add login feature"

# Switch to main
git checkout main

# Merge feature
git merge feature/login

# Delete branch
git branch -d feature/login
```

### Gitflow Workflow:
```bash
# Main branches: main, develop

# Create feature
git checkout -b feature/new-feature develop

# Complete feature
git checkout develop
git merge --no-ff feature/new-feature
git branch -d feature/new-feature

# Create release
git checkout -b release/1.0.0 develop

# Finish release
git checkout main
git merge --no-ff release/1.0.0
git checkout develop
git merge --no-ff release/1.0.0
git branch -d release/1.0.0
```

---

## GitLab Integration

### Push Branch to Remote:
```bash
git push origin GitNewBranch
```

### Create Merge Request (via GitLab UI):
1. Push your branch
2. Go to GitLab project
3. Click "Create merge request"
4. Fill in details
5. Assign reviewers
6. Submit

### Create Merge Request (via CLI with `glab`):
```bash
glab mr create --source-branch GitNewBranch --target-branch master
```

---

## Best Practices

1. **Branch often**: Create branches for every feature or fix
2. **Name clearly**: Use descriptive names (feature/login, bugfix/issue-123)
3. **Commit regularly**: Small, focused commits
4. **Merge frequently**: Keep branches short-lived
5. **Delete merged branches**: Clean up after merging
6. **Review before merging**: Check diffs carefully
7. **Test before merging**: Ensure branch works

---

## Summary

| Action | Command |
|--------|---------|
| Create branch | `git branch <name>` |
| Switch branch | `git checkout <name>` or `git switch <name>` |
| Create & switch | `git checkout -b <name>` |
| List branches | `git branch` or `git branch -a` |
| Merge branch | `git merge <name>` |
| Delete branch | `git branch -d <name>` |
| View differences | `git diff branch1..branch2` |
| View graph | `git log --oneline --graph --decorate` |

---

**Practice these commands to master branching and merging!**
