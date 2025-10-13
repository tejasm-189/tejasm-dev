# 🔒 Security Alert: Your Site is Under Attack!

## ⚠️ What's Happening

Your server is being scanned by bots looking for vulnerabilities. This is **NORMAL** for any public server, but you need protection!

### Attack Patterns Detected:

1. **WordPress Exploits** (Most common)
   ```
   /wordpress/wp-admin/setup-config.php
   /wp-admin/setup-config.php
   /wp-includes/wlwmanifest.xml
   ```
   Attackers looking for vulnerable WordPress installations

2. **Environment File Theft**
   ```
   /.env
   /backend/.env
   ```
   Trying to steal your secrets (API keys, database passwords)

3. **Git Repository Access**
   ```
   /.git/config
   ```
   Trying to download your source code

4. **Admin Panel Scanning**
   ```
   /admin/config.php
   /cgi-bin/luci/
   ```
   Looking for admin interfaces to hack

5. **PHP Debug Exploits**
   ```
   /?XDEBUG_SESSION_START=phpstorm
   ```
   Trying to enable debugging to see internal errors

---

## 🛡️ Current Protection Level: LOW

### What's Vulnerable:
- ❌ No rate limiting (bots can hammer your site)
- ❌ No fail2ban (repeat attackers not blocked)
- ❌ Sensitive paths not blocked (`.env`, `.git`)
- ❌ No SSL/HTTPS (traffic not encrypted)
- ⚠️ IPv6/IPv4 misconfiguration causing errors

---

## 🚀 Immediate Fixes

### Fix 1: Update Nginx Config (URGENT)

**Problem:** Nginx trying to use IPv6 `[::1]:3000` instead of IPv4 `127.0.0.1:3000`

**Solution:**
```bash
# SSH into your server
ssh root@165.22.210.66

# Run the fix script
cd /tmp
nano fix-nginx.sh
```

Paste this:
```bash
#!/bin/bash
sudo tee /etc/nginx/sites-available/tejasm-dev > /dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;

    server_name tejasm.dev www.tejasm.dev 165.22.210.66;

    # Block malicious paths
    location ~ /(\.env|\.git|wp-admin|wordpress|admin|config\.php|test\.php|atomlib\.php) {
        deny all;
        return 404;
    }

    location / {
        # Use IPv4 explicitly
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
EOF

sudo nginx -t && sudo systemctl reload nginx
echo "✅ Nginx fixed!"
EOF

# Run it
bash fix-nginx.sh
```

### Fix 2: Install Fail2ban (Block Repeat Attackers)

```bash
# Install fail2ban
sudo apt-get update
sudo apt-get install -y fail2ban

# Create jail for Nginx
sudo tee /etc/fail2ban/jail.local > /dev/null <<'EOF'
[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log

[nginx-noscript]
enabled = true
port = http,https
logpath = /var/log/nginx/access.log
maxretry = 6
findtime = 300
bantime = 3600

[nginx-badbots]
enabled = true
port = http,https
logpath = /var/log/nginx/access.log
maxretry = 2
findtime = 60
bantime = 86400
EOF

# Start fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Check status
sudo fail2ban-client status
```

### Fix 3: Add Rate Limiting to Nginx

```bash
# Edit main nginx config
sudo nano /etc/nginx/nginx.conf

# Add inside http block:
http {
    # Rate limiting zone
    limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=strict:10m rate=2r/s;
    
    # ... rest of config
}
```

Then update your site config:
```nginx
location / {
    limit_req zone=general burst=20 nodelay;
    proxy_pass http://127.0.0.1:3000;
    # ... rest
}

# Strict rate limit for sensitive paths
location ~ /(api|login|admin) {
    limit_req zone=strict burst=5 nodelay;
    proxy_pass http://127.0.0.1:3000;
}
```

### Fix 4: Setup SSL with Let's Encrypt (HTTPS)

```bash
# Install certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Get certificate (automatic!)
sudo certbot --nginx -d tejasm.dev -d www.tejasm.dev

# Auto-renewal
sudo systemctl enable certbot.timer
```

---

## 🔍 Monitoring Your Security

### Check Fail2ban Status
```bash
# See banned IPs
sudo fail2ban-client status nginx-badbots

# Unban an IP if needed
sudo fail2ban-client unban <IP_ADDRESS>
```

### Monitor Attack Attempts
```bash
# Real-time log monitoring
sudo tail -f /var/log/nginx/error.log

# Count attack attempts by type
sudo grep "wordpress" /var/log/nginx/error.log | wc -l
sudo grep "\.env" /var/log/nginx/error.log | wc -l
sudo grep "\.git" /var/log/nginx/error.log | wc -l
```

### Check Blocked Paths
```bash
# Test if malicious paths are blocked
curl -I http://tejasm.dev/.env
# Should return: 404 Not Found

curl -I http://tejasm.dev/wordpress/wp-admin/
# Should return: 404 Not Found
```

---

## 📊 Attack Statistics (Last 24 Hours)

Based on your logs:

- **Total Attack Attempts:** ~40+
- **WordPress Exploits:** 15+
- **Environment File Theft:** 3+
- **Admin Panel Scanning:** 5+
- **Git Access Attempts:** 1+

**Attack Sources:**
- Cloudflare IPs (172.x.x.x) - Likely bot networks
- Random international IPs
- Known malicious hosts

---

## ✅ Security Checklist

After implementing fixes:

- [ ] Nginx uses IPv4 (127.0.0.1) instead of IPv6
- [ ] Malicious paths blocked (/.env, /wp-admin, /.git)
- [ ] Fail2ban installed and running
- [ ] Rate limiting configured
- [ ] SSL/HTTPS enabled
- [ ] Security headers added
- [ ] Firewall (UFW) properly configured
- [ ] Regular updates enabled

---

## 🆘 If Site Goes Down

If your site stops working after changes:

```bash
# Check Nginx status
sudo systemctl status nginx

# Check error logs
sudo tail -50 /var/log/nginx/error.log

# Test Nginx config
sudo nginx -t

# Restart everything
sudo systemctl restart nginx
pm2 restart tejasm-dev

# Check if app is running
pm2 status
curl http://127.0.0.1:3000
```

---

## 🎯 Priority Actions (Do Now!)

1. **Fix IPv6 → IPv4 issue** (5 minutes)
   - Prevents connection refused errors
   - Makes site accessible

2. **Block malicious paths** (2 minutes)
   - Prevents .env file theft
   - Blocks WordPress exploits

3. **Install Fail2ban** (10 minutes)
   - Auto-blocks repeat attackers
   - Reduces server load

4. **Setup SSL** (5 minutes)
   - Encrypts traffic
   - Prevents man-in-the-middle attacks
   - Improves SEO ranking

5. **Add rate limiting** (Optional, 15 minutes)
   - Prevents DDoS attacks
   - Reduces bot traffic

---

## 📚 Additional Resources

- [OWASP Security Cheat Sheet](https://cheatsheetseries.owasp.org/)
- [Nginx Security Guide](https://nginx.org/en/docs/http/ngx_http_core_module.html#server_tokens)
- [Fail2ban Documentation](https://www.fail2ban.org/)
- [Let's Encrypt Best Practices](https://letsencrypt.org/docs/)

---

## 💡 Good News

You caught this early! Most of these are automated bot scans, not targeted attacks. With the fixes above, your site will be much more secure! 🛡️

