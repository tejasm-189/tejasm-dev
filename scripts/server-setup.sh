#!/bin/bash

###############################################################################
# Server Setup Script for DigitalOcean VM
# Run this script once on your server to prepare it for deployments
###############################################################################

set -e  # Exit on any error

echo "🚀 Setting up DigitalOcean VM for tejasm-dev..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="tejasm-dev"
DEPLOY_PATH="/var/www/$APP_NAME"
DEPLOY_USER="${DEPLOY_USER:-deploy}"
NODE_VERSION="22"

###############################################################################
# 1. System Updates
###############################################################################
echo -e "${BLUE}📦 Updating system packages...${NC}"
sudo apt-get update
sudo apt-get upgrade -y

###############################################################################
# 2. Install Essential Tools
###############################################################################
echo -e "${BLUE}🔧 Installing essential tools...${NC}"
sudo apt-get install -y \
    curl \
    wget \
    git \
    build-essential \
    nginx \
    ufw \
    fail2ban

###############################################################################
# 3. Install Node.js
###############################################################################
echo -e "${BLUE}📦 Installing Node.js ${NODE_VERSION}...${NC}"
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
sudo apt-get install -y nodejs

echo -e "${GREEN}✅ Node.js version:${NC}"
node --version
echo -e "${GREEN}✅ NPM version:${NC}"
npm --version

###############################################################################
# 4. Install PM2 (Process Manager)
###############################################################################
echo -e "${BLUE}📦 Installing PM2...${NC}"
sudo npm install -g pm2

# Configure PM2 to start on boot
sudo pm2 startup systemd -u $USER --hp $HOME
echo -e "${GREEN}✅ PM2 installed and configured${NC}"

###############################################################################
# 5. Create Deployment User (Optional but recommended)
###############################################################################
echo -e "${BLUE}👤 Setting up deployment user...${NC}"
if id "$DEPLOY_USER" &>/dev/null; then
    echo "User $DEPLOY_USER already exists"
else
    sudo useradd -m -s /bin/bash $DEPLOY_USER
    echo -e "${GREEN}✅ User $DEPLOY_USER created${NC}"
fi

# Add deploy user to sudo group (optional)
# sudo usermod -aG sudo $DEPLOY_USER

###############################################################################
# 6. Create Directory Structure
###############################################################################
echo -e "${BLUE}📁 Creating directory structure...${NC}"
sudo mkdir -p $DEPLOY_PATH
sudo mkdir -p $DEPLOY_PATH/logs
sudo chown -R $USER:$USER $DEPLOY_PATH

echo -e "${GREEN}✅ Directory structure created at $DEPLOY_PATH${NC}"

###############################################################################
# 7. Configure Nginx
###############################################################################
echo -e "${BLUE}🌐 Configuring Nginx...${NC}"

sudo tee /etc/nginx/sites-available/$APP_NAME > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    
    server_name tejasm.dev www.tejasm.dev;  # Replace with your domain
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/

# Remove default site
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

echo -e "${GREEN}✅ Nginx configured and restarted${NC}"

###############################################################################
# 8. Configure Firewall (UFW)
###############################################################################
echo -e "${BLUE}🔥 Configuring firewall...${NC}"
sudo ufw --force enable
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS (for later when you add SSL)
sudo ufw status

echo -e "${GREEN}✅ Firewall configured${NC}"

###############################################################################
# 9. Setup SSL with Let's Encrypt (Optional - requires domain)
###############################################################################
read -p "Do you want to setup SSL with Let's Encrypt? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}🔒 Installing Certbot...${NC}"
    sudo apt-get install -y certbot python3-certbot-nginx
    
    echo -e "${BLUE}📝 Please enter your domain name (e.g., tejasm.dev):${NC}"
    read DOMAIN_NAME
    
    echo -e "${BLUE}📝 Please enter your email for SSL certificate:${NC}"
    read EMAIL_ADDRESS
    
    sudo certbot --nginx -d $DOMAIN_NAME -d www.$DOMAIN_NAME --non-interactive --agree-tos -m $EMAIL_ADDRESS
    
    # Auto-renewal
    sudo systemctl enable certbot.timer
    
    echo -e "${GREEN}✅ SSL certificate installed${NC}"
fi

###############################################################################
# 10. Setup SSH Keys for GitHub Actions
###############################################################################
echo -e "${BLUE}🔑 Setting up SSH for deployments...${NC}"
echo ""
echo "To allow GitHub Actions to deploy, you need to:"
echo "1. Generate an SSH key pair (if you haven't already):"
echo "   ssh-keygen -t ed25519 -C 'github-actions-deploy'"
echo ""
echo "2. Add the PUBLIC key to authorized_keys:"
echo "   cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys"
echo ""
echo "3. Copy the PRIVATE key and add it to GitHub Secrets:"
echo "   cat ~/.ssh/id_ed25519"
echo ""
echo "4. In your GitHub repository, go to Settings > Secrets and variables > Actions"
echo "   Add these secrets:"
echo "   - SSH_PRIVATE_KEY: (paste the private key)"
echo "   - SERVER_HOST: (your server IP or domain)"
echo "   - SERVER_USER: (your username, e.g., $USER)"
echo "   - SERVER_PORT: (usually 22)"
echo ""

###############################################################################
# 11. System Optimization for 2GB RAM
###############################################################################
echo -e "${BLUE}⚡ Optimizing system for 2GB RAM...${NC}"

# Add swap if not exists (helps with low memory)
if [ ! -f /swapfile ]; then
    echo "Creating 2GB swap file..."
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    echo -e "${GREEN}✅ Swap file created${NC}"
fi

# Optimize swappiness for SSD
sudo sysctl vm.swappiness=10
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf

###############################################################################
# 12. Setup Log Rotation
###############################################################################
echo -e "${BLUE}📝 Setting up log rotation...${NC}"
sudo tee /etc/logrotate.d/$APP_NAME > /dev/null <<EOF
$DEPLOY_PATH/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 $USER $USER
    sharedscripts
}
EOF

echo -e "${GREEN}✅ Log rotation configured${NC}"

###############################################################################
# 13. Final Summary
###############################################################################
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Server setup complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📋 Summary:"
echo "  • Node.js $(node --version) installed"
echo "  • PM2 process manager installed"
echo "  • Nginx web server configured"
echo "  • Firewall (UFW) enabled"
echo "  • Deploy directory: $DEPLOY_PATH"
echo "  • Application will run on port 3000"
echo ""
echo "🎯 Next steps:"
echo "  1. Setup SSH keys for GitHub Actions (see instructions above)"
echo "  2. Point your domain DNS to this server's IP: $(curl -s ifconfig.me)"
echo "  3. Push to master branch to trigger deployment"
echo "  4. Monitor logs: pm2 logs $APP_NAME"
echo ""
echo -e "${BLUE}📚 Useful commands:${NC}"
echo "  • pm2 status          - Check app status"
echo "  • pm2 logs $APP_NAME  - View logs"
echo "  • pm2 restart $APP_NAME - Restart app"
echo "  • sudo nginx -t       - Test nginx config"
echo "  • sudo systemctl status nginx - Check nginx status"
echo ""
