# Git Hands-On Lab - Task 1 Commands

## Setup Information
- **Username:** Dharineesh17
- **Email:** dharineeshvengatesan@gmail.com

---

## Step 1: Setup Git Configuration

### 1.1 Check Git Installation
```bash
git --version
```

### 1.2 Configure User ID and Email
```bash
git config --global user.name "Dharineesh17"
git config --global user.email "dharineeshvengatesan@gmail.com"
```

### 1.3 Verify Configuration
```bash
git config --global --list
```

---

## Step 2: Integrate Notepad++ (Optional - Windows Only)

### 2.1 Check if Notepad++ is accessible
```bash
notepad++
```

### 2.2 Add Notepad++ to PATH (if needed)
- Control Panel → System → Advanced System Settings
- Advanced tab → Environment Variables
- Add Notepad++ path to PATH variable (usually `C:\Program Files\Notepad++`)

### 2.3 Create alias for Notepad++
```bash
echo "alias npp='notepad++.exe'" >> ~/.bashrc
```

### 2.4 Configure Notepad++ as default Git editor
```bash
git config --global core.editor "notepad++.exe"
```

### 2.5 Verify editor configuration
```bash
git config --global -e
```

---

## Step 3: Add File to Source Code Repository

### 3.1 Create GitDemo Project
```bash
cd "Task 1"
mkdir GitDemo
cd GitDemo
```

### 3.2 Initialize Git Repository
```bash
git init
```

### 3.3 Verify Hidden Files
```bash
ls -la
```

### 3.4 Create welcome.txt File
```bash
echo "Welcome to Git" > welcome.txt
```

### 3.5 Verify File Creation
```bash
ls
```

### 3.6 View File Content
```bash
cat welcome.txt
```

### 3.7 Check Git Status
```bash
git status
```

### 3.8 Add File to Staging Area
```bash
git add welcome.txt
```

### 3.9 Commit with Message
```bash
git commit -m "Initial commit: Added welcome.txt file"
```

Or open default editor for multi-line comment:
```bash
git commit
```

### 3.10 Check Status Again
```bash
git status
```

---

## Step 4: Connect to Remote Repository (GitLab)

### 4.1 Create Remote Repository
1. Login to GitLab
2. Create new project named "GitDemo"
3. Copy the repository URL

### 4.2 Add Remote Origin
```bash
git remote add origin <your-gitlab-repo-url>
```

Example:
```bash
git remote add origin https://gitlab.com/Dharineesh17/GitDemo.git
```

### 4.3 Pull from Remote (if needed)
```bash
git pull origin master
```

Or for newer Git versions:
```bash
git pull origin main
```

### 4.4 Push to Remote Repository
```bash
git push -u origin master
```

Or for newer Git versions:
```bash
git push -u origin main
```

---

## Common Git Commands Reference

| Command | Description |
|---------|-------------|
| `git init` | Initialize a new Git repository |
| `git status` | Check the status of your repository |
| `git add <file>` | Add file to staging area |
| `git add .` | Add all files to staging area |
| `git commit -m "message"` | Commit changes with a message |
| `git push origin <branch>` | Push changes to remote repository |
| `git pull origin <branch>` | Pull changes from remote repository |
| `git clone <url>` | Clone a remote repository |
| `git log` | View commit history |
| `git branch` | List branches |
| `git checkout <branch>` | Switch to a branch |

---

## Notes
- Replace `<your-gitlab-repo-url>` with your actual GitLab repository URL
- Default branch might be `main` or `master` depending on your Git version
- Make sure you have internet connection for remote operations
