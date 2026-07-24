# Git Remote Push & Cleanup - Quick Reference

## 🎯 Task 5 at a Glance

**Objective:** Master remote repository operations  
**Time:** 10 minutes  
**Difficulty:** Beginner  

---

## 🚀 Fastest Way to Complete

```powershell
cd "week 6\Task 5"
.\run-git-remote-lab.ps1
```

**Note:** You'll need a GitLab/GitHub account and repository URL.

---

## 🌐 Setting Up Remote

### Create Repository:
1. **GitLab:** https://gitlab.com → New project
2. **GitHub:** https://github.com → New repository

### Add Remote:
```bash
git remote add origin https://gitlab.com/username/repo.git
```

### Verify:
```bash
git remote -v
```

---

## 🔑 Essential Commands

```bash
git remote -v                    # List remotes
git remote add origin <url>      # Add remote
git remote remove origin         # Remove remote
git pull origin master           # Download + merge
git push origin master           # Upload commits
git push -u origin master        # Push + set upstream
git fetch origin                 # Download only
```

---

## 🔄 Pull vs Push

### Pull (Download):
```bash
git pull origin master
```
- Gets changes from remote
- Merges into local branch
- May cause conflicts

### Push (Upload):
```bash
git push origin master
```
- Sends local commits to remote
- Updates remote repository
- May be rejected if remote is ahead

---

## ⚡ Quick Workflow

```
1. git status                    # Check clean state
2. git add .                     # Stage changes
3. git commit -m "message"       # Commit locally
4. git pull origin master        # Get latest from remote
5. git push origin master        # Send to remote
```

---

## 🔐 Authentication

### HTTPS (Token):
```bash
git remote add origin https://gitlab.com/user/repo.git
# Use personal access token as password
```

### SSH (Key):
```bash
git remote add origin git@gitlab.com:user/repo.git
# No password needed if key is setup
```

---

## 📊 Common Scenarios

### First Push:
```bash
git push -u origin master
```

### Regular Push:
```bash
git push
```

### Force Push (Dangerous!):
```bash
git push --force
# Only if absolutely necessary!
```

### Rejected Push:
```bash
git pull origin master
# Resolve conflicts if any
git push origin master
```

---

## 🌿 Branch Operations

### Push Branch:
```bash
git push origin feature-branch
```

### Delete Remote Branch:
```bash
git push origin --delete feature-branch
```

### List Remote Branches:
```bash
git branch -r
```

---

## 💡 Best Practices

1. ✅ **Pull before push** - Always get latest changes
2. ✅ **Commit locally first** - Don't push partial work
3. ✅ **Write clear messages** - Help your team
4. ✅ **Push regularly** - Don't hoard commits
5. ✅ **Never force push** - Unless coordinated with team

---

## 🔧 Troubleshooting

### Remote already exists:
```bash
git remote remove origin
git remote add origin <new-url>
```

### Authentication failed:
- Use personal access token, not password
- Or set up SSH keys

### Push rejected:
```bash
git pull origin master --rebase
git push origin master
```

### Wrong branch name:
```bash
# If remote uses 'main' instead of 'master'
git push origin main
```

---

## 📍 Check What Would Happen

### Before Push:
```bash
git log origin/master..HEAD
# Shows commits that will be pushed
```

### Before Pull:
```bash
git fetch origin
git log HEAD..origin/master
# Shows commits that will be pulled
```

---

## ✅ Success Indicators

✅ `git push` succeeds without errors  
✅ Commits visible on GitLab/GitHub  
✅ Files uploaded correctly  
✅ `git status` shows "up to date"  
✅ Team can see your changes  

---

## 🌍 Remote Info

### Show Remote Details:
```bash
git remote show origin
```

### Change Remote URL:
```bash
git remote set-url origin <new-url>
```

---

**Ready? Create your remote repository and run the script!**
