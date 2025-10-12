# 🚨 Site Not Accessible - Troubleshooting

## ✅ What's Working

Based on your deployment logs:
- ✅ Deployment succeeded
- ✅ Node.js v24 detected and used
- ✅ Dependencies installed (606 packages)
- ✅ PM2 restarted successfully
- ✅ App is **online** and listening on port 3000
- ✅ Status: `online`, Memory: 58MB

```
out: Listening on http://0.0.0.0:3000
status: online
```

**Your app IS running!** The problem is likely with Nginx or DNS.

---

## 🔍 Diagnostic Steps

### Step 1: SSH into Your Server
```bash
ssh root@YOUR_SERVER_IP
```

### Step 2: Verify App is Running
```bash
# Check PM2 status
pm2 status

# Should show:
# tejasm-dev | online | port 3000
```

### Step 3: Test App Directly (Port 3000)
```bash
# Test from server
curl http://localhost:3000

# You should see HTML response
```

**✅ If this works:** App is running correctly, problem is with Nginx or DNS

**❌ If this fails:** App has an issue, check PM2 logs:
```bash
pm2 logs tejasm-dev --lines 100
```

### Step 4: Check Nginx Status
```bash
# Check if Nginx is running
sudo systemctl status nginx

# Should say: "active (running)"
```

**❌ If not running:**
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 5: Test Nginx Proxy
```bash
# Test Nginx → App proxy
curl http://localhost

# Should return your HTML (same as port 3000)
```

**❌ If this fails (502 Bad Gateway):**
```bash
# Check Nginx error log
sudo tail -50 /var/log/nginx/error.log

# Common issues:
# - "Connection refused" = App not running on 3000
# - "No such file" = Config file issue
```

### Step 6: Verify Nginx Configuration
```bash
# Check config syntax
sudo nginx -t

# View your site config
sudo cat /etc/nginx/sites-available/tejasm-dev

# Ensure it has:
# proxy_pass http://localhost:3000;
```

**Fix if needed:**
```bash
sudo nano /etc/nginx/sites-available/tejasm-dev

# Make sure it contains:
server {
    listen 80;
    server_name tejasm.dev www.tejasm.dev YOUR_SERVER_IP;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Save (Ctrl+X, Y, Enter)

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

### Step 7: Check Firewall
```bash
# Check firewall status
sudo ufw status

# Should show:
# 80/tcp    ALLOW
# 443/tcp   ALLOW
# 22/tcp    ALLOW
```

**Fix if ports blocked:**
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo systemctl reload ufw
```

### Step 8: Check DNS Resolution
```bash
# From your local machine (PowerShell):
nslookup tejasm.dev

# Should return your server IP
```

**❌ If wrong IP or no result:**
- DNS not configured or not propagated yet
- Go to name.com and verify A records point to server IP

### Step 9: Test from Local Machine
```powershell
# Test direct IP access
curl http://YOUR_SERVER_IP

# Test domain access
curl http://tejasm.dev

# Test with browser
# Open: http://YOUR_SERVER_IP
# Open: http://tejasm.dev
```

---

## 🎯 Most Common Issues

### Issue 1: Nginx Not Installed/Running
**Symptoms:** `curl http://localhost` fails
**Solution:**
```bash
sudo systemctl status nginx
sudo systemctl start nginx
```

### Issue 2: Nginx Wrong Config
**Symptoms:** 502 Bad Gateway
**Solution:**
```bash
sudo cat /etc/nginx/sites-available/tejasm-dev
# Verify proxy_pass points to http://localhost:3000
```

### Issue 3: Nginx Default Site Taking Over
**Symptoms:** Shows Nginx welcome page instead of your app
**Solution:**
```bash
# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Ensure your site is enabled
sudo ln -sf /etc/nginx/sites-available/tejasm-dev /etc/nginx/sites-enabled/

# Reload
sudo systemctl reload nginx
```

### Issue 4: Port 3000 Blocked by Firewall
**Symptoms:** Nginx can't connect to app
**Solution:**
```bash
# Port 3000 should be INTERNAL only (not public)
# Nginx should be able to connect locally
# Test: curl http://localhost:3000
```

### Issue 5: DNS Not Configured
**Symptoms:** Domain doesn't resolve
**Solution:**
- Go to name.com → DNS Settings
- Add A records for `@` and `www` pointing to server IP
- Wait 5-10 minutes for propagation

### Issue 6: App Crashed After Start
**Symptoms:** PM2 shows "errored" or "stopped"
**Solution:**
```bash
pm2 logs tejasm-dev --lines 100
# Check for errors
# Common: Missing .env file, port already in use
```

---

## 🚀 Quick Fix Script

Run this on your server to check everything:

```bash
#!/bin/bash

echo "🔍 Full Diagnostic Check"
echo "======================="

echo ""
echo "1️⃣ PM2 Status:"
pm2 status

echo ""
echo "2️⃣ App on Port 3000:"
curl -s http://localhost:3000 | head -5

echo ""
echo "3️⃣ Nginx Status:"
sudo systemctl status nginx | grep "Active:"

echo ""
echo "4️⃣ Nginx Proxy Test:"
curl -s http://localhost | head -5

echo ""
echo "5️⃣ Nginx Config Test:"
sudo nginx -t

echo ""
echo "6️⃣ Firewall Status:"
sudo ufw status | grep "80\|443\|22"

echo ""
echo "7️⃣ Server IP:"
curl -s ifconfig.me

echo ""
echo "8️⃣ Listening Ports:"
sudo netstat -tlnp | grep ":80\|:3000"

echo ""
echo "✅ Diagnostic Complete!"
```

Copy this, save as `check.sh`, run with `bash check.sh`

---

## 📞 What to Share for Help

If still not working, share output of:

```bash
# 1. PM2 Status
pm2 status
pm2 logs tejasm-dev --lines 50

# 2. Nginx Status
sudo systemctl status nginx
sudo nginx -t
sudo cat /etc/nginx/sites-available/tejasm-dev

# 3. Network
curl http://localhost:3000
curl http://localhost
curl ifconfig.me

# 4. Firewall
sudo ufw status
```

---

## 💡 Expected Results When Working

### PM2:
```
tejasm-dev | online | 3000 | 100% | 58mb
```

### Port 3000:
```
curl http://localhost:3000
<!DOCTYPE html>...your site HTML...
```

### Nginx:
```
curl http://localhost  
<!DOCTYPE html>...your site HTML... (same as port 3000)
```

### Public Access:
```
Browser → http://YOUR_SERVER_IP → Your site loads! ✅
Browser → http://tejasm.dev → Your site loads! ✅
```

---

## 🆘 Emergency Restart

If everything seems broken:

```bash
# Restart everything
pm2 restart tejasm-dev
sudo systemctl restart nginx

# Check status
pm2 status
sudo systemctl status nginx

# Test
curl http://localhost:3000
curl http://localhost
```

