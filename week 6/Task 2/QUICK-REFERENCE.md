# Git Ignore - Quick Reference Guide

## 🎯 Task 2 at a Glance

**Objective:** Learn how to ignore unwanted files using .gitignore  
**Time:** 20 minutes  
**Difficulty:** Beginner  

---

## 🚀 Fastest Way to Complete

```powershell
cd "week 6\Task 2"
.\run-git-ignore-lab.ps1
```

Follow the on-screen prompts and observe the changes at each step!

---

## 📋 What You'll Do

1. ✓ Create log files and folders
2. ✓ See them appear as untracked in `git status`
3. ✓ Create `.gitignore` file
4. ✓ Add patterns: `*.log` and `logs/`
5. ✓ Watch files disappear from `git status`
6. ✓ Commit `.gitignore`
7. ✓ Test with new log files

---

## 🔑 Key Concepts

### What is .gitignore?
A special file that tells Git which files to **NOT** track.

### Why Use It?
- Keep repository clean
- Protect sensitive files
- Exclude build outputs
- Ignore dependencies

### Common Patterns
```gitignore
*.log           # All log files
logs/           # Logs directory
*.tmp           # Temporary files
node_modules/   # Dependencies
.env            # Environment files
dist/           # Build output
```

---

## 💡 Before vs After

### BEFORE .gitignore:
```bash
$ git status
Untracked files:
  app.log
  error.log
  logs/
  main.txt
```

### AFTER .gitignore:
```bash
$ git status
Untracked files:
  .gitignore
  main.txt
```

Log files are now **invisible** to Git! 🎉

---

## 📝 Manual Commands (If Not Using Script)

```bash
# 1. Navigate to directory
cd GitIgnoreDemo

# 2. Create log files
echo "Error log" > app.log
mkdir logs
echo "Debug log" > logs/debug.log

# 3. Check status (see untracked files)
git status

# 4. Create .gitignore
echo "*.log" > .gitignore
echo "logs/" >> .gitignore

# 5. Check status again (files hidden!)
git status

# 6. Commit .gitignore
git add .gitignore main.txt
git commit -m "Added .gitignore"
```

---

## 🔍 Pattern Cheat Sheet

| Pattern | Matches | Example |
|---------|---------|---------|
| `*.log` | All .log files | app.log, error.log |
| `*.tmp` | All .tmp files | cache.tmp, temp.tmp |
| `logs/` | logs directory | logs/ folder |
| `temp*` | Files starting with temp | temp.txt, temp.log |
| `*_backup` | Files ending with _backup | file_backup.txt |
| `!important.log` | Exception - DO track | important.log tracked |
| `doc/*.txt` | .txt in doc only | doc/readme.txt |
| `**/cache` | cache in any directory | src/cache, lib/cache |

---

## ⚠️ Important Notes

### Already Tracked Files
If a file is already tracked by Git, adding it to `.gitignore` won't work!

**Solution:**
```bash
git rm --cached <filename>
git commit -m "Stopped tracking file"
```

### Folder Patterns
Always use trailing slash for folders: `logs/` not `logs`

### Test Patterns
Use this command to check why a file is ignored:
```bash
git check-ignore -v <filename>
```

---

## 🎯 Success Indicators

You'll know you succeeded when:

✅ Log files don't appear in `git status`  
✅ New log files are automatically ignored  
✅ Only `.gitignore` and tracked files show up  
✅ Working directory shows as clean  

---

## 🔗 Related Files in This Task

- **README.md** - Full instructions and overview
- **Git-Ignore-Commands.md** - Detailed command explanations
- **run-git-ignore-lab.ps1** - Interactive automated script
- **Task-Comparison.md** - Compare Task 1 vs Task 2

---

## 🚀 After This Task

Try these challenges:
1. Create your own patterns
2. Ignore different file types (`.txt`, `.tmp`)
3. Create nested folders and ignore them
4. Use exception patterns with `!`

---

## 📚 Learn More

- Git ignore documentation: https://git-scm.com/docs/gitignore
- GitHub .gitignore templates: https://github.com/github/gitignore
- Interactive .gitignore generator: https://www.toptal.com/developers/gitignore

---

**Ready? Run the script and learn by doing! 🎓**
