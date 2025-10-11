# CI/CD Pipeline Visual Guide 📊

Quick visual reference for understanding your deployment pipeline.

## Pipeline Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     DEVELOPER WORKFLOW                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ git push origin master
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     GITHUB ACTIONS                               │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │  STAGE 1: TEST 🧪                                           │ │
│ │  ┌──────────────────────────────────────────────────────┐   │ │
│ │  │  ✓ Checkout code                                     │   │ │
│ │  │  ✓ Setup Node.js 22                                  │   │ │
│ │  │  ✓ Install dependencies (npm ci)                     │   │ │
│ │  │  ✓ Run linter                                        │   │ │
│ │  │  ✓ Run 44 automated tests                            │   │ │
│ │  │  ✓ Generate coverage report                          │   │ │
│ │  │  ✓ Upload artifacts                                  │   │ │
│ │  └──────────────────────────────────────────────────────┘   │ │
│ │     Duration: ~30-60 seconds                                │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│                              │ Tests Pass ✓                     │
│                              ↓                                   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │  STAGE 2: BUILD 🏗️                                          │ │
│ │  ┌──────────────────────────────────────────────────────┐   │ │
│ │  │  ✓ Checkout code                                     │   │ │
│ │  │  ✓ Setup Node.js 22                                  │   │ │
│ │  │  ✓ Install dependencies                              │   │ │
│ │  │  ✓ Build production bundle (npm run build)           │   │ │
│ │  │  ✓ Package: .output/ + package.json + public/        │   │ │
│ │  │  ✓ Create tar.gz archive                             │   │ │
│ │  │  ✓ Upload build artifact                             │   │ │
│ │  └──────────────────────────────────────────────────────┘   │ │
│ │     Duration: ~1-2 minutes                                  │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│                              │ Build Success ✓                  │
│                              ↓                                   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │  STAGE 3: DEPLOY 🚀 (master branch only)                    │ │
│ │  ┌──────────────────────────────────────────────────────┐   │ │
│ │  │  ✓ Download build artifact                           │   │ │
│ │  │  ✓ SSH to DigitalOcean server                        │   │ │
│ │  │  ✓ Backup current version                            │   │ │
│ │  │  ✓ Transfer files via SCP                            │   │ │
│ │  │  ✓ Extract package                                   │   │ │
│ │  │  ✓ Install production dependencies                   │   │ │
│ │  │  ✓ Restart app with PM2                              │   │ │
│ │  │  ✓ Health check                                      │   │ │
│ │  └──────────────────────────────────────────────────────┘   │ │
│ │     Duration: ~1-2 minutes                                  │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Deployment Success ✓
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   DIGITALOCEAN SERVER                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Internet (Port 80/443)                                  │   │
│  │         ↓                                                │   │
│  │    Nginx Reverse Proxy                                   │   │
│  │         ↓                                                │   │
│  │    PM2 Process Manager                                   │   │
│  │         ↓                                                │   │
│  │    SolidStart App (Port 3000)                            │   │
│  │                                                          │   │
│  │  Directory Structure:                                    │   │
│  │  /var/www/tejasm-dev/                                    │   │
│  │    ├── current/          (active version)                │   │
│  │    ├── backup-xxxxx/     (previous versions)             │   │
│  │    └── logs/             (application logs)              │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ↓
                         [Users/Visitors]
```

## Timeline Visualization

```
Minute 0:00 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Push to Master

Minute 0:05 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Tests Start
                     │
                     │ Running 44 tests...
                     │ Generating coverage...
                     ↓
Minute 0:45 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Tests Pass ✅

Minute 0:46 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Build Starts
                     │
                     │ Installing dependencies...
                     │ Building production bundle...
                     │ Creating package...
                     ↓
Minute 2:30 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Build Complete ✅

Minute 2:31 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Deploy Starts
                     │
                     │ Connecting to server...
                     │ Backing up current version...
                     │ Uploading files...
                     │ Installing dependencies...
                     │ Restarting with PM2...
                     ↓
Minute 4:30 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Deploy Complete ✅

Minute 4:31 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 🎉 LIVE!
```

## Server Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│  DIGITALOCEAN VPS (2GB RAM, 1 vCPU, 50GB SSD)                    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  UFW Firewall                                              │  │
│  │  • Port 22 (SSH) ✓                                         │  │
│  │  • Port 80 (HTTP) ✓                                        │  │
│  │  • Port 443 (HTTPS) ✓                                      │  │
│  │  • All other ports blocked                                 │  │
│  └────────────────────────────────────────────────────────────┘  │
│                            ↓                                      │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Nginx (Web Server & Reverse Proxy)                        │  │
│  │  • Listens on ports 80/443                                 │  │
│  │  • SSL/TLS termination                                     │  │
│  │  • Gzip compression                                        │  │
│  │  • Static file caching                                     │  │
│  │  • Proxy to localhost:3000                                 │  │
│  └────────────────────────────────────────────────────────────┘  │
│                            ↓                                      │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  PM2 Process Manager                                        │  │
│  │  • Keeps app running 24/7                                  │  │
│  │  • Auto-restart on crash                                   │  │
│  │  • Zero-downtime reloads                                   │  │
│  │  • Log management                                          │  │
│  │  • Memory monitoring                                       │  │
│  │  • Cluster mode support                                    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                            ↓                                      │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Your SolidStart Application                               │  │
│  │  • Running on port 3000                                    │  │
│  │  • Server-side rendering                                   │  │
│  │  • API routes                                              │  │
│  │  • Static asset serving                                    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  File System                                               │  │
│  │  /var/www/tejasm-dev/                                      │  │
│  │    ├── current/                 (symlink to active)        │  │
│  │    │   ├── .output/             (built app)               │  │
│  │    │   ├── node_modules/        (dependencies)            │  │
│  │    │   ├── package.json                                   │  │
│  │    │   └── public/              (static files)            │  │
│  │    ├── backup-20241011-143022/  (previous version)        │  │
│  │    ├── backup-20241011-121530/  (older version)           │  │
│  │    ├── backup-20241010-095412/  (oldest kept)             │  │
│  │    └── logs/                                               │  │
│  │        ├── error.log                                       │  │
│  │        ├── out.log                                         │  │
│  │        └── combined.log                                    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  System Services                                           │  │
│  │  • Node.js 22.x                                            │  │
│  │  • NPM                                                     │  │
│  │  • Git                                                     │  │
│  │  • Fail2ban (security)                                     │  │
│  │  • Certbot (SSL certificates)                              │  │
│  │  • Logrotate (log management)                              │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

## Decision Tree: When Does Deploy Happen?

```
                    Code Change
                         │
                         ↓
                  Push to Branch?
                    /        \
                   /          \
              No  /            \ Yes
                 /              \
                ↓                ↓
            Nothing         Which Branch?
            Happens            /    \
                              /      \
                         master    other
                            /          \
                           /            \
                          ↓              ↓
                    Tests Pass?      Only Test
                      /    \         & Build
                     /      \            ↓
                 Yes /        \ No    No Deploy
                    /          \
                   ↓            ↓
              Build OK?    Fix Tests
                /    \         ↓
               /      \     Push Again
           Yes /        \ No
              /          \
             ↓            ↓
        🚀 DEPLOY!   Fix Build
         to Prod        ↓
             │      Push Again
             ↓
         SUCCESS!
```

## Rollback Flow

```
                Problem Detected!
                       │
                       ↓
              ┌────────────────────┐
              │  Option 1:         │
              │  Automatic Rollback│
              └────────────────────┘
                       │
              Deploy fails during
              health check
                       │
                       ↓
              PM2 keeps previous
              version running
                       │
                       ↓
                   No downtime!


              ┌────────────────────┐
              │  Option 2:         │
              │  Manual Rollback   │
              └────────────────────┘
                       │
              SSH to server
                       │
                       ↓
              cd /var/www/tejasm-dev
              mv current current-broken
              mv backup-YYYYMMDD current
                       │
                       ↓
              pm2 restart tejasm-dev
                       │
                       ↓
              Service restored!


              ┌────────────────────┐
              │  Option 3:         │
              │  Git Rollback      │
              └────────────────────┘
                       │
              git revert HEAD
              git push origin master
                       │
                       ↓
              Pipeline auto-deploys
              previous working version
                       │
                       ↓
              Back to stable!
```

## GitHub Actions Secrets Flow

```
┌─────────────────────────────────────────┐
│  GitHub Repository Settings              │
│  └─> Secrets and variables               │
│      └─> Actions                         │
│          ├─ SSH_PRIVATE_KEY              │
│          ├─ SERVER_HOST                  │
│          ├─ SERVER_USER                  │
│          └─ SERVER_PORT                  │
└─────────────────────────────────────────┘
                  │
                  │ Encrypted at rest
                  │ Available only during workflow
                  ↓
┌─────────────────────────────────────────┐
│  GitHub Actions Workflow                 │
│  • Secrets are injected as env vars      │
│  • Never logged or exposed               │
│  • Used for SSH/SCP commands             │
└─────────────────────────────────────────┘
                  │
                  │ Secure connection
                  ↓
┌─────────────────────────────────────────┐
│  Your DigitalOcean Server                │
│  • SSH authentication                    │
│  • File transfer                         │
│  • Command execution                     │
└─────────────────────────────────────────┘
```

## Request Flow (Production)

```
User Types: https://tejasm.dev
            │
            ↓
        DNS Lookup
    (tejasm.dev → 167.99.123.45)
            │
            ↓
┌───────────────────────────────────┐
│  DigitalOcean Server              │
│  Port 443 (HTTPS)                 │
└───────────────────────────────────┘
            │
            ↓
┌───────────────────────────────────┐
│  Nginx                            │
│  • SSL/TLS termination            │
│  • Check if static file           │
│  • Proxy to app if needed         │
└───────────────────────────────────┘
            │
            ├─> Static file? → Serve directly
            │
            └─> Dynamic? ─────────────────┐
                                          ↓
                              ┌───────────────────────┐
                              │  PM2 → SolidStart App │
                              │  Port 3000            │
                              └───────────────────────┘
                                          │
                                          ↓
                              ┌───────────────────────┐
                              │  Server-Side Render   │
                              │  Generate HTML        │
                              └───────────────────────┘
                                          │
                                          ↓
                                    Response HTML
                                          │
                                          ↓
                                    Through Nginx
                                          │
                                          ↓
                                    Back to User
                                          │
                                          ↓
                                    Page Displays!
```

---

## Key Takeaways

1. **3-Stage Pipeline**: Test → Build → Deploy
2. **Automated**: Push to master triggers everything
3. **Safe**: Tests must pass before deployment
4. **Fast**: ~3-5 minutes total
5. **Reliable**: Backups kept, easy rollback
6. **Secure**: SSH keys, firewall, HTTPS

Use this guide as a visual reference when understanding or troubleshooting your CI/CD pipeline!
