# Git Ignore Lab - Task 2 Commands

## Setup Information
- **Username:** PratapSakthivel
- **Email:** pratapssakthivel@gmail.com

---

## What is .gitignore?

`.gitignore` is a text file that tells Git which files or directories to ignore in a project. When you add patterns to `.gitignore`, Git will not track those files, meaning they won't appear in `git status`, won't be added to commits, and won't be pushed to remote repositories.

---

## Step 1: Initialize Git Repository (If Not Already Done)

### 1.1 Create Project Directory
```bash
cd "Task 2"
mkdir GitIgnoreDemo
cd GitIgnoreDemo
```

### 1.2 Initialize Git
```bash
git init
```

### 1.3 Configure Git (if not done globally)
```bash
git config user.name "PratapSakthivel"
git config user.email "pratapssakthivel@gmail.com"
```

---

## Step 2: Create Files and Folders to Ignore

### 2.1 Create a Regular File (to be tracked)
```bash
echo "This is the main application file" > main.txt
```

### 2.2 Create a Log File (.log extension)
```bash
echo "Error: Application crashed at 10:00 AM" > app.log
```

### 2.3 Create Another Log File
```bash
echo "Warning: Low memory" > error.log
```

### 2.4 Create a Log Folder with Log Files
```bash
mkdir logs
echo "Debug: Starting application" > logs/debug.log
echo "Debug: Loading modules" > logs/system.log
```

### 2.5 Check Git Status (Before .gitignore)
```bash
git status
```

**Expected Output:**
```
Untracked files:
  main.txt
  app.log
  error.log
  logs/
```

All files appear as untracked, including the log files we want to ignore.

---

## Step 3: Create and Configure .gitignore

### 3.1 Create .gitignore File
```bash
# Using PowerShell
New-Item -Path .gitignore -ItemType File

# Or using echo
echo "" > .gitignore
```

### 3.2 Add Pattern to Ignore All .log Files
```bash
echo "*.log" >> .gitignore
```

### 3.3 Add Pattern to Ignore logs Folder
```bash
echo "logs/" >> .gitignore
```

### 3.4 View .gitignore Content
```bash
cat .gitignore
```

**Expected Output:**
```
*.log
logs/
```

---

## Step 4: Verify Git Ignore is Working

### 4.1 Check Git Status (After .gitignore)
```bash
git status
```

**Expected Output:**
```
Untracked files:
  .gitignore
  main.txt
```

Notice: `app.log`, `error.log`, and `logs/` folder are now ignored!

### 4.2 Add Main Files to Staging Area
```bash
git add main.txt
git add .gitignore
```

### 4.3 Check Status
```bash
git status
```

**Expected Output:**
```
Changes to be committed:
  new file:   .gitignore
  new file:   main.txt
```

### 4.4 Commit the Changes
```bash
git commit -m "Added main.txt and .gitignore file to ignore log files and folders"
```

---

## Step 5: Test by Creating More Log Files

### 5.1 Create Additional Log Files
```bash
echo "New error entry" > test.log
echo "Another debug entry" > logs/newfile.log
```

### 5.2 Verify They Are Ignored
```bash
git status
```

**Expected Output:**
```
nothing to commit, working tree clean
```

The new log files are automatically ignored!

---

## Common .gitignore Patterns

### Basic Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| `*.log` | Ignore all .log files | app.log, error.log, debug.log |
| `*.tmp` | Ignore all .tmp files | temp.tmp, cache.tmp |
| `logs/` | Ignore logs directory | Entire logs/ folder |
| `temp/` | Ignore temp directory | Entire temp/ folder |

### Advanced Patterns

```gitignore
# Ignore all .log files
*.log

# But don't ignore important.log
!important.log

# Ignore all files in build directory
build/

# Ignore all .txt files in doc directory
doc/*.txt

# Ignore all .pdf files in doc and subdirectories
doc/**/*.pdf

# Ignore all files in any directory named temp
**/temp/

# Ignore specific file
config.json

# Ignore files starting with temp
temp*

# Ignore files ending with _backup
*_backup
```

---

## Additional Useful Commands

### Check Why a File is Ignored
```bash
git check-ignore -v app.log
```

### Remove File from Git Tracking (If Already Tracked)
If you added a file to Git before creating .gitignore, you need to untrack it:
```bash
git rm --cached <filename>
git commit -m "Stopped tracking file"
```

Example:
```bash
git rm --cached app.log
git commit -m "Stopped tracking app.log"
```

### Create Global .gitignore (For All Repositories)
```bash
git config --global core.excludesfile ~/.gitignore_global
```

Then edit `~/.gitignore_global` to add patterns you want to ignore globally.

---

## Real-World .gitignore Examples

### Node.js Project
```gitignore
node_modules/
npm-debug.log
.env
dist/
build/
*.log
```

### Python Project
```gitignore
__pycache__/
*.py[cod]
*.so
.env
venv/
*.log
.pytest_cache/
```

### Java Project
```gitignore
*.class
*.jar
*.war
target/
.idea/
*.log
```

### General Development
```gitignore
# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Environment
.env
.env.local

# Build
dist/
build/
out/
```

---

## Verification Steps

1. ✅ Create log files and log folders
2. ✅ Check `git status` - all files should be untracked
3. ✅ Create `.gitignore` with patterns
4. ✅ Check `git status` - log files should disappear
5. ✅ Commit `.gitignore`
6. ✅ Create new log files - they should be automatically ignored

---

## Summary

- `.gitignore` tells Git which files to ignore
- Patterns use wildcards: `*` (any characters), `?` (single character)
- Folders should end with `/`
- Use `!` to make exceptions
- Files already tracked need `git rm --cached` to untrack
- Each project should have its own `.gitignore`

---

## Notes
- Replace patterns based on your project needs
- Always commit `.gitignore` to your repository
- Review and update `.gitignore` as your project grows
