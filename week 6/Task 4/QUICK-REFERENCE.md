# Git Conflict Resolution - Quick Reference

## 🎯 Task 4 at a Glance

**Objective:** Learn to resolve merge conflicts  
**Time:** 30 minutes  
**Difficulty:** Intermediate  

---

## 🚀 Fastest Way to Complete

```powershell
cd "week 6\Task 4"
.\run-git-conflict-lab.ps1
```

The script will create and resolve a conflict automatically!

---

## 💥 What is a Merge Conflict?

A conflict occurs when Git cannot automatically merge changes because:
- Same line modified differently in two branches
- File deleted in one branch, modified in another
- Same file added with different content

---

## 🔑 Essential Commands

```bash
git merge <branch>           # Attempt merge (may conflict)
git status                   # See conflicted files
git diff                     # View differences
git mergetool                # Visual conflict resolution
git merge --abort            # Cancel merge
git add <file>               # Mark as resolved
git commit                   # Complete merge
```

---

## 📝 Conflict Markers Explained

```
<<<<<<< HEAD
Content from current branch (master)
=======
Content from merging branch (feature)
>>>>>>> feature-branch
```

**To Resolve:**
1. Edit file
2. Choose which content to keep
3. Remove conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
4. Save file
5. `git add <file>`
6. `git commit`

---

## ⚡ Quick Resolution Strategies

### Keep Current Branch (Ours):
```bash
git checkout --ours file.txt
git add file.txt
```

### Keep Merging Branch (Theirs):
```bash
git checkout --theirs file.txt
git add file.txt
```

### Manual Edit:
```bash
# Edit file to combine or choose content
git add file.txt
```

### Use Merge Tool:
```bash
git mergetool
git add file.txt
```

---

## 📊 Typical Workflow

```
1. git checkout master
2. git merge feature-branch
   → CONFLICT!
3. git status (see conflicted files)
4. Edit files to resolve
5. git add resolved-file
6. git commit
7. git branch -d feature-branch
```

---

## 🎨 P4Merge Setup

```bash
git config --global merge.tool p4merge
git config --global mergetool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
```

**Use:**
```bash
git mergetool
```

---

## ⚠️ Common Mistakes

❌ **Don't:** Commit with conflict markers still in file  
✅ **Do:** Remove all `<<<<<<<`, `=======`, `>>>>>>>` before committing

❌ **Don't:** Force push after resolving conflicts  
✅ **Do:** Regular push after proper resolution

❌ **Don't:** Ignore .orig backup files  
✅ **Do:** Add `*.orig` to .gitignore

---

## 💡 Prevention Tips

1. **Pull before starting work**
2. **Commit frequently** (smaller changes = easier to resolve)
3. **Communicate with team**
4. **Work on different files when possible**
5. **Use feature branches**

---

## 🔧 Troubleshooting

### Stuck in merge?
```bash
git merge --abort
```

### Accidentally committed conflict markers?
```bash
git reset --soft HEAD~1
# Fix file
git add file
git commit
```

### Want to start over?
```bash
git reset --hard HEAD
```

---

## ✅ Success Indicators

✅ No conflict markers in files  
✅ Code compiles/runs correctly  
✅ Tests pass  
✅ Git status shows clean  
✅ Merge commit appears in log  

---

**Practice makes perfect! Run the script to experience conflict resolution.**
