# CI/CD Setup Checklist ✅

Complete this checklist to get your CI/CD pipeline running!

## Server Setup

### 1. Initial Server Configuration
- [ ] SSH into your DigitalOcean VM: `ssh root@YOUR_IP`
- [ ] Copy setup script: `scp scripts/server-setup.sh root@YOUR_IP:/tmp/`
- [ ] Run setup script: `chmod +x /tmp/server-setup.sh && sudo /tmp/server-setup.sh`
- [ ] Note your server IP: `curl ifconfig.me`

### 2. SSH Keys for GitHub Actions
- [ ] Generate SSH key: `ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_deploy`
- [ ] Add public key to authorized_keys: `cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys`
- [ ] Copy private key (for GitHub Secrets): `cat ~/.ssh/github_deploy`
- [ ] Save private key securely (you'll need it in step 4)

### 3. Domain Configuration (Optional)
- [ ] Point domain A record to server IP
- [ ] Update Nginx config with your domain: `sudo nano /etc/nginx/sites-available/tejasm-dev`
- [ ] Test Nginx config: `sudo nginx -t`
- [ ] Reload Nginx: `sudo systemctl reload nginx`

### 4. SSL Certificate (Optional but Recommended)
- [ ] Install Certbot: `sudo apt install certbot python3-certbot-nginx`
- [ ] Get certificate: `sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com`
- [ ] Verify auto-renewal: `sudo systemctl status certbot.timer`

### 5. Environment Variables Setup
- [ ] Create production `.env` file: `nano /var/www/tejasm-dev/current/.env`
- [ ] Add required variables (see `.env.example` or `ENV_SETUP.md`)
- [ ] Set secure permissions: `chmod 600 .env`
- [ ] Verify variables are loaded after PM2 restart

## GitHub Configuration

### 5. Repository Secrets
Go to: Repository Settings → Secrets and variables → Actions

- [ ] Add `SSH_PRIVATE_KEY` (contents of `~/.ssh/github_deploy`)
- [ ] Add `SERVER_HOST` (your server IP or domain, e.g., `167.99.123.45`)
- [ ] Add `SERVER_USER` (your SSH username, e.g., `root` or `deploy`)
- [ ] Add `SERVER_PORT` (optional, default is `22`)

### 6. Workflow Configuration
- [ ] Review `.github/workflows/deploy.yml`
- [ ] Update `APP_NAME` if needed (default: `tejasm-dev`)
- [ ] Update `DEPLOY_PATH` if needed (default: `/var/www/tejasm-dev`)
- [ ] Update production URL in environment (line ~126)

## Testing

### 7. Test Deployment
- [ ] Make a small change: `echo "# Test" >> README.md`
- [ ] Commit: `git add . && git commit -m "test: CI/CD pipeline"`
- [ ] Push to master: `git push origin master`
- [ ] Watch Actions tab on GitHub
- [ ] Verify app is running: `ssh user@server "pm2 status"`

### 8. Verify Everything Works
- [ ] Visit your site in browser (http://your-ip or https://your-domain.com)
- [ ] Check PM2 status: `ssh user@server "pm2 status"`
- [ ] Check logs: `ssh user@server "pm2 logs tejasm-dev --lines 50"`
- [ ] Check Nginx: `ssh user@server "sudo systemctl status nginx"`
- [ ] Test from different device/network

## Monitoring Setup

### 9. Set Up Monitoring (Optional)
- [ ] Configure uptime monitoring (UptimeRobot, StatusCake, etc.)
- [ ] Set up error alerting (Sentry, LogRocket, etc.)
- [ ] Configure performance monitoring
- [ ] Set up backup solution

## Documentation Review

### 10. Read Documentation
- [ ] Read `CI_CD.md` - Complete guide
- [ ] Bookmark useful commands section
- [ ] Save troubleshooting section for reference
- [ ] Understand the pipeline stages

## Next Steps

### 11. Optional Improvements
- [ ] Set up staging environment
- [ ] Configure environment variables in PM2 ecosystem
- [ ] Set up database backups
- [ ] Add health check endpoint to your app
- [ ] Configure log aggregation
- [ ] Set up metrics dashboard

---

## Quick Commands Reference

### Check if everything is running:
```bash
# On server
pm2 status
sudo systemctl status nginx
sudo ufw status
```

### View logs:
```bash
pm2 logs tejasm-dev
sudo tail -f /var/log/nginx/error.log
```

### Manual restart:
```bash
pm2 restart tejasm-dev
sudo systemctl restart nginx
```

### Test deployment locally:
```bash
npm test
npm run build
npm start
```

---

## Troubleshooting

**Pipeline fails?**
1. Check Actions tab for error message
2. Review the specific step that failed
3. Check GitHub Secrets are correct
4. Verify server is accessible

**App not starting?**
1. `ssh user@server`
2. `pm2 logs tejasm-dev --err`
3. Check for errors in logs
4. Try manual restart: `pm2 restart tejasm-dev`

**Can't access site?**
1. Check firewall: `sudo ufw status`
2. Check Nginx: `sudo systemctl status nginx`
3. Check PM2: `pm2 status`
4. Check DNS settings (if using domain)

---

## Success Criteria

You're done when:
- ✅ All checklist items are completed
- ✅ Pipeline runs successfully on push to master
- ✅ Site is accessible from browser
- ✅ PM2 shows app as "online"
- ✅ Nginx is serving requests
- ✅ No errors in logs

---

**Need help?** Check `CI_CD.md` for detailed troubleshooting!
