# CI/CD Pipeline Documentation 🚀

Complete guide to understanding and using the Continuous Integration and Continuous Deployment pipeline for your SolidJS application.

## 📚 Table of Contents

- [What is CI/CD?](#what-is-cicd)
- [Pipeline Overview](#pipeline-overview)
- [Setup Instructions](#setup-instructions)
- [GitHub Secrets Configuration](#github-secrets-configuration)
- [Pipeline Stages Explained](#pipeline-stages-explained)
- [Deployment Process](#deployment-process)
- [Monitoring & Troubleshooting](#monitoring--troubleshooting)
- [Best Practices](#best-practices)

---

## What is CI/CD?

**CI/CD** stands for **Continuous Integration** and **Continuous Deployment**:

### Continuous Integration (CI)
- Automatically **test** your code when you push changes
- **Build** the application to ensure it compiles
- **Validate** code quality and catch bugs early
- Runs on every push and pull request

### Continuous Deployment (CD)
- Automatically **deploy** your application to production
- Only deploys if all tests pass
- Ensures consistent, reliable deployments
- Reduces human error and manual work

**Benefits:**
- ✅ Catch bugs before they reach production
- ✅ Deploy faster and more frequently
- ✅ Consistent, repeatable process
- ✅ Less downtime and manual work
- ✅ Better code quality

---

## Pipeline Overview

Your CI/CD pipeline has **3 main stages**:

```
┌─────────┐     ┌─────────┐     ┌──────────┐
│  TEST   │ ──> │  BUILD  │ ──> │  DEPLOY  │
└─────────┘     └─────────┘     └──────────┘
```

### Stage 1: Test 🧪
- Runs all unit, component, and integration tests
- Generates code coverage reports
- Validates code quality
- **Duration:** ~30-60 seconds

### Stage 2: Build 🏗️
- Installs dependencies
- Builds the production application
- Creates deployment package
- **Duration:** ~1-2 minutes

### Stage 3: Deploy 🚀
- Only runs on `master` branch
- Transfers files to DigitalOcean VM
- Restarts the application with PM2
- Performs health checks
- **Duration:** ~1-2 minutes

**Total pipeline time:** ~3-5 minutes from push to deployment

---

## Setup Instructions

Follow these steps to set up your CI/CD pipeline:

### Step 1: Server Setup

1. **SSH into your DigitalOcean VM:**
   ```bash
   ssh root@YOUR_SERVER_IP
   ```

2. **Copy the setup script to your server:**
   ```bash
   # On your local machine
   scp scripts/server-setup.sh root@YOUR_SERVER_IP:/tmp/

   # On the server
   cd /tmp
   chmod +x server-setup.sh
   sudo ./server-setup.sh
   ```

   This script will:
   - Update system packages
   - Install Node.js 22
   - Install PM2 (process manager)
   - Configure Nginx (reverse proxy)
   - Setup firewall (UFW)
   - Optionally configure SSL with Let's Encrypt
   - Optimize system for 2GB RAM
   - Setup log rotation

3. **Note down important information:**
   - Server IP address
   - Server user (default: current user)
   - SSH port (usually 22)

### Step 2: Generate SSH Keys

1. **On your server, generate SSH keys:**
   ```bash
   ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy
   ```

2. **Add the public key to authorized_keys:**
   ```bash
   cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

3. **Display the private key (you'll need this for GitHub):**
   ```bash
   cat ~/.ssh/github_deploy
   ```
   ⚠️ **Keep this private! Never commit it to Git!**

### Step 3: Configure Domain (Optional)

1. **Point your domain to your server:**
   - Go to your domain registrar (e.g., Namecheap, GoDaddy)
   - Create an **A record**:
     - Host: `@` (or `tejasm`)
     - Value: `YOUR_SERVER_IP`
   - Create a **CNAME record** (optional):
     - Host: `www`
     - Value: `tejasm.dev`

2. **Update Nginx configuration:**
   ```bash
   sudo nano /etc/nginx/sites-available/tejasm-dev
   ```
   Replace `tejasm.dev` with your actual domain.

3. **Test and reload Nginx:**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Step 4: GitHub Secrets Configuration

Go to your repository on GitHub:
1. Click **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add the following secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `SSH_PRIVATE_KEY` | Private SSH key from Step 2 | Contents of `~/.ssh/github_deploy` |
| `SERVER_HOST` | Your server IP or domain | `167.99.123.45` or `tejasm.dev` |
| `SERVER_USER` | SSH username | `root` or `deploy` |
| `SERVER_PORT` | SSH port (optional) | `22` (default) |

### Step 5: Test the Pipeline

1. **Make a small change and push to master:**
   ```bash
   git checkout master
   echo "# Test deployment" >> README.md
   git add README.md
   git commit -m "test: trigger CI/CD pipeline"
   git push origin master
   ```

2. **Monitor the pipeline:**
   - Go to your repository on GitHub
   - Click **Actions** tab
   - Watch the pipeline run in real-time

3. **Verify deployment:**
   ```bash
   # On your server
   pm2 status
   pm2 logs tejasm-dev
   ```

---

## GitHub Secrets Configuration

### Required Secrets

#### SSH_PRIVATE_KEY
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtz
...
-----END OPENSSH PRIVATE KEY-----
```
- The complete private key including header and footer
- Generate with `ssh-keygen` on your server
- Keep this absolutely secret!

#### SERVER_HOST
```
167.99.123.45
```
or
```
tejasm.dev
```
- Your server's IP address or domain name
- Find with `curl ifconfig.me` on your server

#### SERVER_USER
```
root
```
or
```
deploy
```
- The username for SSH access
- Should match the user that has deployment permissions

#### SERVER_PORT (Optional)
```
22
```
- Default SSH port is 22
- Only add this secret if you use a custom port

---

## Pipeline Stages Explained

### 1. Test Stage 🧪

**Purpose:** Validate code quality before building

```yaml
test:
  - Checkout code from repository
  - Install Node.js and dependencies
  - Run ESLint (code quality checks)
  - Run Vitest (all 44 tests)
  - Generate code coverage report
  - Upload coverage as artifact
```

**What happens if tests fail?**
- ❌ Build stage is skipped
- ❌ Deploy stage is skipped
- ❌ You get a notification
- 💡 Fix the failing tests and push again

**How to view test results:**
1. Go to **Actions** tab in GitHub
2. Click on the workflow run
3. Click on **test** job
4. Expand **Run tests** step
5. Download coverage report from **Artifacts**

### 2. Build Stage 🏗️

**Purpose:** Compile and package the application

```yaml
build:
  - Checkout code
  - Install dependencies
  - Run `npm run build`
  - Create deployment package:
    ├── .output/          (built application)
    ├── package.json
    ├── package-lock.json
    └── public/           (static files)
  - Compress as tar.gz
  - Upload as artifact
```

**What gets built?**
- SolidStart optimized production build
- Server-side rendering components
- Static assets
- API routes

**Build artifacts:**
- Stored for 7 days
- Can be downloaded manually if needed
- Used automatically by deploy stage

### 3. Deploy Stage 🚀

**Purpose:** Deploy the application to production

**Deploy stages workflow:**

```
1. Download Artifact
   ↓
2. SSH to Server
   ↓
3. Backup Current Version
   ↓
4. Upload New Files
   ↓
5. Extract Package
   ↓
6. Install Dependencies
   ↓
7. Restart with PM2
   ↓
8. Health Check
   ↓
9. Success! ✅
```

**What happens during deployment:**

1. **Backup:** Current version is backed up (keeps last 3)
2. **Upload:** New files are transferred via SCP
3. **Extract:** Package is extracted to `/var/www/tejasm-dev/current`
4. **Install:** Production dependencies are installed
5. **Restart:** PM2 restarts the application
6. **Verify:** Health check ensures app is running

**Rollback capability:**
If deployment fails, previous versions are kept in backup folders:
```bash
/var/www/tejasm-dev/
├── current/              (active version)
├── backup-20241011-143022/
├── backup-20241011-121530/
└── backup-20241010-095412/
```

To manually rollback:
```bash
cd /var/www/tejasm-dev
mv current current-failed
mv backup-20241011-143022 current
pm2 restart tejasm-dev
```

---

## Deployment Process

### When Does Deployment Happen?

✅ **Triggers deployment:**
- Push to `master` branch
- All tests pass
- Build succeeds

❌ **Does NOT trigger deployment:**
- Push to feature branches
- Pull requests
- Failed tests
- Failed build

### Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab
2. Click on **CI/CD Pipeline - Deploy to DigitalOcean**
3. Click **Run workflow**
4. Select branch (usually `master`)
5. Click **Run workflow**

### Deployment Timeline

```
0:00  - Push to master
0:05  - Tests start
0:45  - Tests complete ✅
0:46  - Build starts
2:30  - Build complete ✅
2:31  - Deploy starts
3:45  - Files uploaded
4:10  - App restarted
4:30  - Health check ✅
4:31  - Deployment complete! 🎉
```

---

## Monitoring & Troubleshooting

### Monitoring Your Application

#### 1. PM2 Dashboard
```bash
# SSH to server
ssh user@tejasm.dev

# View status
pm2 status

# View logs
pm2 logs tejasm-dev

# View real-time logs
pm2 logs tejasm-dev --lines 100

# Monitor resources
pm2 monit
```

#### 2. Nginx Logs
```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

#### 3. Application Logs
```bash
# Located at /var/www/tejasm-dev/logs/
tail -f /var/www/tejasm-dev/logs/out.log
tail -f /var/www/tejasm-dev/logs/error.log
```

### Common Issues & Solutions

#### Issue 1: Tests Failing

**Symptom:** Test stage fails, deployment doesn't happen

**Solution:**
```bash
# Run tests locally
npm test

# Fix failing tests
# Commit and push again
git add .
git commit -m "fix: resolve test failures"
git push
```

#### Issue 2: Build Failing

**Symptom:** Build stage fails

**Common causes:**
- TypeScript errors
- Missing dependencies
- Import errors

**Solution:**
```bash
# Build locally to see error
npm run build

# Fix the issue
# Push again
```

#### Issue 3: Deployment Fails

**Symptom:** Deploy stage fails

**Check:**
1. GitHub Secrets are correct
2. SSH key has proper permissions
3. Server is accessible
4. Enough disk space on server

```bash
# On server, check disk space
df -h

# Check PM2 status
pm2 status

# Check PM2 logs for errors
pm2 logs tejasm-dev --err
```

#### Issue 4: App Won't Start

**Symptom:** PM2 shows app as "errored" or constantly restarting

**Solution:**
```bash
# Check error logs
pm2 logs tejasm-dev --err

# Common fixes:
# 1. Check Node.js version
node --version

# 2. Reinstall dependencies
cd /var/www/tejasm-dev/current
npm ci --production

# 3. Check environment variables
pm2 env 0

# 4. Restart app
pm2 restart tejasm-dev
```

#### Issue 5: Port Already in Use

**Symptom:** App fails with "EADDRINUSE" error

**Solution:**
```bash
# Find what's using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>

# Restart app
pm2 restart tejasm-dev
```

### Health Check Commands

```bash
# Check if app is responding
curl http://localhost:3000

# Check Nginx status
sudo systemctl status nginx

# Check firewall status
sudo ufw status

# Check available memory
free -h

# Check CPU usage
top
```

---

## Best Practices

### 1. Branch Strategy

```
master (production)
  ↑
  │  merge after PR review
  │
develop (staging)
  ↑
  │  merge feature branches here
  │
feature/new-component
feature/bug-fix
```

**Recommended workflow:**
1. Create feature branch from `develop`
2. Make changes and push
3. Create PR to `develop`
4. After tests pass and review, merge
5. When ready for production, merge `develop` → `master`

### 2. Commit Messages

Use conventional commits for better changelog:

```bash
# Format: type(scope): description

feat: add user authentication
fix: resolve memory leak in header component
test: add integration tests for blog utils
docs: update CI/CD documentation
chore: update dependencies
```

### 3. Testing Before Push

Always run tests locally before pushing:

```bash
# Run all tests
npm test

# Run specific test
npm test -- Header.test.tsx

# Check coverage
npm run test:coverage
```

### 4. Monitor Deployments

- Watch the Actions tab during deployment
- Check PM2 logs after deployment
- Test the live site immediately after deployment
- Keep an eye on error logs for a few minutes

### 5. Database Migrations

If you add database migrations:

```bash
# On server, before deployment
cd /var/www/tejasm-dev/current
npm run migrate  # or your migration command
```

Or add to the deploy script in `.github/workflows/deploy.yml`:

```yaml
script: |
  cd $DEPLOY_PATH/current
  npm run migrate
  pm2 restart $APP_NAME
```

### 6. Environment Variables

**Never commit secrets!**

For production environment variables:

```bash
# On server
nano /var/www/tejasm-dev/current/.env

# Or use PM2 ecosystem
pm2 delete tejasm-dev
pm2 start ecosystem.config.js
```

Add to `ecosystem.config.js`:
```javascript
env: {
  NODE_ENV: 'production',
  DATABASE_URL: 'your-database-url',
  API_KEY: 'your-api-key',
}
```

### 7. Security Best Practices

✅ **Do:**
- Use SSH keys, not passwords
- Keep secrets in GitHub Secrets
- Regular security updates: `sudo apt update && sudo apt upgrade`
- Use firewall (UFW)
- Enable fail2ban
- Use SSL/HTTPS
- Regular backups

❌ **Don't:**
- Commit secrets or API keys
- Use root user for deployment (create deploy user)
- Expose unnecessary ports
- Ignore security updates

### 8. Performance Optimization

```bash
# On server

# 1. Enable Nginx gzip compression (already in server-setup.sh)

# 2. Setup caching headers
# Edit /etc/nginx/sites-available/tejasm-dev

# 3. Monitor memory usage
pm2 monit

# 4. Set memory limits
pm2 start npm --name tejasm-dev --max-memory-restart 1G -- start
```

---

## Useful Commands Reference

### GitHub Actions
```bash
# Trigger manual deployment
Actions tab → CI/CD Pipeline → Run workflow

# View workflow runs
Actions tab → Select workflow → Select run

# Download artifacts
Actions tab → Select run → Artifacts section
```

### Server Management
```bash
# PM2 Commands
pm2 status                    # Check status
pm2 logs tejasm-dev          # View logs
pm2 restart tejasm-dev       # Restart app
pm2 stop tejasm-dev          # Stop app
pm2 delete tejasm-dev        # Delete app
pm2 save                     # Save PM2 list
pm2 resurrect                # Restore PM2 list

# Nginx Commands
sudo systemctl status nginx   # Check status
sudo systemctl restart nginx  # Restart
sudo nginx -t                # Test config
sudo systemctl reload nginx   # Reload config

# System Commands
df -h                        # Disk usage
free -h                      # Memory usage
top                          # CPU usage
sudo ufw status              # Firewall status
```

---

## Next Steps

Now that your CI/CD pipeline is set up:

1. ✅ **Make a test deployment** - Push a small change to master
2. ✅ **Monitor the deployment** - Watch the Actions tab
3. ✅ **Verify it works** - Visit your site
4. ✅ **Setup monitoring** - Consider adding Uptime Robot or similar
5. ✅ **Setup SSL** - Run certbot if you haven't already
6. ✅ **Configure backups** - Setup automated database backups
7. ✅ **Add staging environment** - Deploy `develop` branch to staging server

---

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [DigitalOcean Community Tutorials](https://www.digitalocean.com/community/tutorials)
- [Let's Encrypt](https://letsencrypt.org/)

---

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#monitoring--troubleshooting) section
2. Review GitHub Actions logs
3. Check server logs (`pm2 logs`, nginx logs)
4. Search DigitalOcean community
5. Check GitHub Actions community

---

**Happy Deploying! 🚀**

Your CI/CD pipeline ensures every change is tested, built, and deployed automatically. Focus on writing code, let the pipeline handle the rest!
