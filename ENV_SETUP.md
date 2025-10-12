# Environment Variables Setup Guide 🔐

Complete guide to setting up and managing environment variables for your application.

## 📚 Table of Contents

- [Quick Start](#quick-start)
- [File Structure](#file-structure)
- [Local Development](#local-development)
- [Production Setup](#production-setup)
- [Available Variables](#available-variables)
- [Security Best Practices](#security-best-practices)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

### For Local Development

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your values:**
   ```bash
   # Windows
   notepad .env
   
   # Mac/Linux
   nano .env
   ```

3. **Start your app:**
   ```bash
   npm run dev
   ```

That's it! Your app now uses your environment variables.

### For Production (DigitalOcean)

1. **SSH to your server:**
   ```bash
   ssh user@tejasm.dev
   ```

2. **Create `.env` file:**
   ```bash
   cd /var/www/tejasm-dev/current
   nano .env
   ```

3. **Add your production values:**
   ```env
   NODE_ENV=production
   PORT=3000
   SITE_URL=https://tejasm.dev
   # Add other variables as needed
   ```

4. **Restart the application:**
   ```bash
   pm2 restart tejasm-dev
   ```

---

## File Structure

```
your-project/
├── .env                 # Your actual secrets (NEVER commit!)
├── .env.example         # Template with all variables (commit this)
├── .gitignore          # Ensures .env is never committed
└── ecosystem.config.js  # PM2 config that loads .env
```

### What Each File Does:

| File | Purpose | Commit to Git? |
|------|---------|----------------|
| `.env` | Your actual secrets and config | ❌ **NEVER** |
| `.env.example` | Template showing what variables are available | ✅ Yes |
| `.gitignore` | Prevents `.env` from being committed | ✅ Yes |

---

## Local Development

### Step 1: Copy the Example

```bash
cp .env.example .env
```

### Step 2: Configure Your Local Variables

Open `.env` and set your local development values:

```env
# .env (local development)
NODE_ENV=development
PORT=3000
SITE_URL=http://localhost:3000
LOG_LEVEL=debug

# Optional: Add any API keys for testing
# GITHUB_TOKEN=your_test_token
```

### Step 3: Access Variables in Your Code

In your SolidJS/Node.js code:

```typescript
// Access environment variables
const port = process.env.PORT || 3000;
const siteUrl = process.env.SITE_URL;
const isProduction = process.env.NODE_ENV === 'production';

console.log(`Starting server on port ${port}`);
```

### Step 4: Run Your App

```bash
npm run dev
```

Your app will automatically load variables from `.env`.

---

## Production Setup

### Method 1: Using .env File on Server (Recommended)

1. **SSH to your server:**
   ```bash
   ssh root@YOUR_SERVER_IP
   ```

2. **Navigate to app directory:**
   ```bash
   cd /var/www/tejasm-dev/current
   ```

3. **Create production .env:**
   ```bash
   nano .env
   ```

4. **Add production values:**
   ```env
   NODE_ENV=production
   PORT=3000
   SITE_URL=https://tejasm.dev
   LOG_LEVEL=info
   
   # Add real production values
   DATABASE_URL=postgresql://user:pass@localhost/db
   GITHUB_TOKEN=ghp_real_token_here
   GA_TRACKING_ID=G-XXXXXXXXXX
   ```

5. **Set proper permissions:**
   ```bash
   chmod 600 .env
   chown $USER:$USER .env
   ```

6. **Restart app to load new variables:**
   ```bash
   pm2 restart tejasm-dev
   ```

### Method 2: Using PM2 Ecosystem Config

Edit `ecosystem.config.js` directly:

```javascript
module.exports = {
  apps: [{
    name: 'tejasm-dev',
    // ... other config
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      SITE_URL: 'https://tejasm.dev',
      DATABASE_URL: 'your-database-url',
      // Add all your variables here
    },
  }],
};
```

Then restart:
```bash
pm2 restart tejasm-dev
```

### Method 3: System Environment Variables

Set at the system level:

```bash
# Add to ~/.bashrc or ~/.bash_profile
export PORT=3000
export SITE_URL=https://tejasm.dev
export NODE_ENV=production

# Reload
source ~/.bashrc

# Restart app
pm2 restart tejasm-dev
```

---

## Available Variables

See `.env.example` for all available variables. Here are the most important ones:

### Core Application

```env
# Required
NODE_ENV=production          # Environment (development, production, test)
PORT=3000                    # Port your app listens on
SITE_URL=https://tejasm.dev  # Your domain

# Logging
LOG_LEVEL=info              # Log level (error, warn, info, debug)
```

### Database (if you add one)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
```

### External Services

```env
# GitHub API
GITHUB_TOKEN=ghp_xxxxxxxxxxxx

# Google Analytics
GA_TRACKING_ID=G-XXXXXXXXXX

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Security

```env
# Session Secret (generate with: openssl rand -base64 32)
SESSION_SECRET=your-random-secret-key

# JWT Secret
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGINS=https://tejasm.dev,https://www.tejasm.dev
```

### PM2 Configuration

```env
APP_NAME=tejasm-dev
MAX_MEMORY_RESTART=1000
PM2_INSTANCES=1
```

---

## Security Best Practices

### ✅ DO:

1. **Never commit `.env` to git:**
   ```bash
   # Verify it's in .gitignore
   cat .gitignore | grep .env
   ```

2. **Use strong, random secrets:**
   ```bash
   # Generate secure random strings
   openssl rand -base64 32
   ```

3. **Use different values for each environment:**
   ```
   Development: test_key_123
   Staging: staging_key_456
   Production: prod_key_xyz_secure
   ```

4. **Set restrictive file permissions:**
   ```bash
   chmod 600 .env
   ```

5. **Keep `.env.example` updated:**
   ```bash
   # When you add a new variable to .env
   # Also add it to .env.example (without the real value)
   ```

6. **Use environment-specific values:**
   ```env
   # Development
   DATABASE_URL=postgresql://localhost/dev_db
   
   # Production
   DATABASE_URL=postgresql://prod-server/prod_db
   ```

### ❌ DON'T:

1. **Never hardcode secrets in code:**
   ```javascript
   // ❌ BAD
   const apiKey = "sk_live_abc123xyz";
   
   // ✅ GOOD
   const apiKey = process.env.API_KEY;
   ```

2. **Never log secrets:**
   ```javascript
   // ❌ BAD
   console.log('API Key:', process.env.API_KEY);
   
   // ✅ GOOD
   console.log('API Key configured:', !!process.env.API_KEY);
   ```

3. **Never commit `.env` even temporarily:**
   ```bash
   # Check before committing
   git status
   
   # If you accidentally added it:
   git reset HEAD .env
   ```

4. **Never share `.env` via insecure channels:**
   - Don't email it
   - Don't paste in Slack/Discord
   - Don't commit to GitHub
   - Use secure password managers instead

---

## Using Environment Variables in Code

### In Node.js/Server Code

```javascript
// Direct access
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;

// With validation
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set');
}

// Type-safe (TypeScript)
const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV as 'development' | 'production',
  siteUrl: process.env.SITE_URL || 'http://localhost:3000',
};
```

### In SolidStart

```typescript
// src/lib/config.ts
export const config = {
  // Server-side only
  database: process.env.DATABASE_URL,
  
  // Can be exposed to client
  publicSiteUrl: process.env.SITE_URL,
  
  // Feature flags
  enableAnalytics: process.env.ENABLE_ANALYTICS === 'true',
};
```

### Environment-Specific Code

```javascript
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

if (isDevelopment) {
  console.log('Running in development mode');
  // Enable detailed logging, hot reload, etc.
}

if (isProduction) {
  // Enable caching, minification, etc.
}
```

---

## Troubleshooting

### Problem: Variables Not Loading

**Symptom:** `process.env.MY_VAR` is `undefined`

**Solutions:**

1. **Check .env file exists:**
   ```bash
   ls -la .env
   ```

2. **Check file contents:**
   ```bash
   cat .env
   ```

3. **Restart your application:**
   ```bash
   # Local
   # Stop the dev server and restart
   npm run dev
   
   # Production
   pm2 restart tejasm-dev
   ```

4. **Check for syntax errors:**
   ```env
   # ❌ BAD (spaces around =)
   PORT = 3000
   
   # ✅ GOOD
   PORT=3000
   ```

5. **Check variable name:**
   ```javascript
   // Make sure the name matches exactly
   process.env.PORT  // not process.env.port
   ```

### Problem: Variables Work Locally but Not in Production

**Solutions:**

1. **Verify .env exists on server:**
   ```bash
   ssh user@server
   ls -la /var/www/tejasm-dev/current/.env
   ```

2. **Check PM2 is using the correct config:**
   ```bash
   pm2 show tejasm-dev
   ```

3. **Verify ecosystem.config.js points to .env:**
   ```javascript
   env_file: '/var/www/tejasm-dev/current/.env',
   ```

4. **Check environment in PM2:**
   ```bash
   pm2 env 0  # Shows environment variables for first app
   ```

### Problem: Secrets Exposed in Git

**If you accidentally committed .env:**

1. **Remove from staging:**
   ```bash
   git reset HEAD .env
   ```

2. **If already committed:**
   ```bash
   # Remove from history (be careful!)
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env" \
     --prune-empty --tag-name-filter cat -- --all
   
   # Force push (warns collaborators first!)
   git push origin --force --all
   ```

3. **Rotate all secrets immediately:**
   - Generate new API keys
   - Change passwords
   - Update secrets everywhere

### Problem: PM2 Not Loading .env

**Solutions:**

1. **Use pm2-runtime with .env:**
   ```bash
   pm2 delete tejasm-dev
   cd /var/www/tejasm-dev/current
   pm2 start ecosystem.config.js --env production
   ```

2. **Manually source .env:**
   ```bash
   cd /var/www/tejasm-dev/current
   export $(cat .env | xargs)
   pm2 restart tejasm-dev --update-env
   ```

3. **Use PM2 env directly in ecosystem config:**
   ```javascript
   require('dotenv').config();
   
   module.exports = {
     apps: [{
       env: {
         PORT: process.env.PORT,
         // ... other vars
       }
     }]
   };
   ```

---

## Verification Checklist

Use this checklist to verify your setup:

### Local Development
- [ ] `.env` file exists
- [ ] `.env` is in `.gitignore`
- [ ] Variables load when running `npm run dev`
- [ ] Can access variables in code
- [ ] `.env.example` is up to date

### Production
- [ ] `.env` file exists on server at `/var/www/tejasm-dev/current/.env`
- [ ] File permissions are secure (`chmod 600`)
- [ ] PM2 loads the environment correctly
- [ ] App can access production variables
- [ ] Secrets are different from development
- [ ] No `.env` file in git repository

### Security
- [ ] No hardcoded secrets in code
- [ ] Strong, random secrets generated
- [ ] `.env` file permissions are restrictive
- [ ] Different secrets for each environment
- [ ] Secrets not logged or exposed

---

## Quick Reference

### Generate Secure Secrets

```bash
# Random string
openssl rand -base64 32

# UUID
uuidgen

# Random hex
openssl rand -hex 16
```

### Check Environment Variables

```bash
# On server
pm2 show tejasm-dev
pm2 env 0

# In Node.js
node -e "console.log(process.env)"
```

### Edit Production .env

```bash
ssh user@tejasm.dev
cd /var/www/tejasm-dev/current
nano .env
pm2 restart tejasm-dev
```

---

## Next Steps

1. ✅ Copy `.env.example` to `.env`
2. ✅ Fill in your development values
3. ✅ Test locally: `npm run dev`
4. ✅ Create production `.env` on server
5. ✅ Restart PM2: `pm2 restart tejasm-dev`
6. ✅ Verify variables are loading correctly

**Remember:** Never commit `.env` to Git! 🔐
