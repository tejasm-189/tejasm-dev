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
echo -e "${BLUE}📦 Checking for system updates...${NC}"
sudo apt-get update

###############################################################################
# 2. Install Essential Tools
###############################################################################
echo -e "${BLUE}🔧 Checking essential tools...${NC}"

# List of packages to check/install
PACKAGES="curl wget git build-essential nginx ufw fail2ban"
TO_INSTALL=""

for pkg in $PACKAGES; do
    if dpkg -l | grep -q "^ii  $pkg "; then
        echo -e "${GREEN}✓${NC} $pkg already installed"
    else
        echo -e "${BLUE}→${NC} $pkg needs installation"
        TO_INSTALL="$TO_INSTALL $pkg"
    fi
done

if [ -n "$TO_INSTALL" ]; then
    echo -e "${BLUE}Installing missing packages:${NC}$TO_INSTALL"
    sudo apt-get install -y $TO_INSTALL
else
    echo -e "${GREEN}✅ All essential tools already installed${NC}"
fi

###############################################################################
# 3. Check/Install Node.js
###############################################################################
echo -e "${BLUE}📦 Checking Node.js installation...${NC}"

# Check if Node.js is installed and get version
if command -v node &> /dev/null; then
    CURRENT_NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    echo -e "${GREEN}✓${NC} Node.js v$CURRENT_NODE_VERSION is installed"
    
    # Check if version is sufficient (22 or higher)
    if [ "$CURRENT_NODE_VERSION" -ge "$NODE_VERSION" ]; then
        echo -e "${GREEN}✅ Node.js version is sufficient (v$CURRENT_NODE_VERSION >= v$NODE_VERSION)${NC}"
        echo -e "${GREEN}✅ NPM version: $(npm --version)${NC}"
    else
        echo -e "${BLUE}→ Node.js v$CURRENT_NODE_VERSION is older than required v$NODE_VERSION${NC}"
        read -p "Do you want to upgrade Node.js? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${BLUE}Upgrading Node.js to v${NODE_VERSION}...${NC}"
            curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
            sudo apt-get install -y nodejs
            echo -e "${GREEN}✅ Node.js upgraded to $(node --version)${NC}"
        else
            echo -e "${BLUE}Skipping Node.js upgrade${NC}"
        fi
    fi
else
    echo -e "${BLUE}→ Node.js not found, installing v${NODE_VERSION}...${NC}"
    
    # Check if nvm is installed
    if [ -d "$HOME/.nvm" ] || command -v nvm &> /dev/null; then
        echo -e "${GREEN}✓${NC} NVM detected, using NVM to install Node.js"
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        
        # Install Node.js with nvm if not already installed
        if ! nvm list | grep -q "v$NODE_VERSION"; then
            nvm install $NODE_VERSION
        fi
        nvm use $NODE_VERSION
        nvm alias default $NODE_VERSION
        echo -e "${GREEN}✅ Node.js $(node --version) installed via NVM${NC}"
    else
        # Install via NodeSource
        echo -e "${BLUE}Installing Node.js via NodeSource repository...${NC}"
        curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
        sudo apt-get install -y nodejs
        echo -e "${GREEN}✅ Node.js $(node --version) installed${NC}"
    fi
    
    echo -e "${GREEN}✅ NPM version: $(npm --version)${NC}"
fi

###############################################################################
# 4. Check/Install PM2 (Process Manager)
###############################################################################
echo -e "${BLUE}📦 Checking PM2 installation...${NC}"

if command -v pm2 &> /dev/null; then
    PM2_VERSION=$(pm2 --version)
    echo -e "${GREEN}✓ PM2 v$PM2_VERSION already installed${NC}"
else
    echo -e "${BLUE}→ Installing PM2...${NC}"
    sudo npm install -g pm2
    echo -e "${GREEN}✅ PM2 $(pm2 --version) installed${NC}"
fi

# Configure PM2 to start on boot (if not already configured)
if ! systemctl list-units --type=service --all | grep -q "pm2-$USER.service"; then
    echo -e "${BLUE}→ Configuring PM2 startup...${NC}"
    sudo pm2 startup systemd -u $USER --hp $HOME
    echo -e "${GREEN}✅ PM2 startup configured${NC}"
else
    echo -e "${GREEN}✓ PM2 startup already configured${NC}"
fi

###############################################################################
# 5. Create deployment user (optional but recommended)
###############################################################################
echo -e "${BLUE}👤 Checking deployment user...${NC}"
# If you want to run as a specific user, uncomment:
# if ! id "deployer" &>/dev/null; then
#     sudo useradd -m -s /bin/bash deployer
#     sudo usermod -aG sudo deployer
#     echo -e "${GREEN}✅ Deployment user 'deployer' created${NC}"
# else
#     echo -e "${GREEN}✓ User 'deployer' already exists${NC}"
# fi
echo -e "${GREEN}✓ Using current user: $USER${NC}"

###############################################################################
# 6. Create deployment directory
###############################################################################
echo -e "${BLUE}📁 Checking deployment directories...${NC}"
if [ ! -d "$DEPLOY_PATH" ]; then
    echo -e "${YELLOW}→ Creating deployment directories...${NC}"
    sudo mkdir -p $DEPLOY_PATH/{current,releases,logs,backups}
    sudo chown -R $USER:$USER $DEPLOY_PATH
    echo -e "${GREEN}✅ Directories created${NC}"
else
    echo -e "${GREEN}✓ Deployment directory already exists${NC}"
    # Ensure subdirectories exist
    for dir in current releases logs backups; do
        if [ ! -d "$DEPLOY_PATH/$dir" ]; then
            sudo mkdir -p "$DEPLOY_PATH/$dir"
        fi
    done
    sudo chown -R $USER:$USER $DEPLOY_PATH
fi

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
echo -e "${BLUE}🌐 Checking Nginx configuration...${NC}"

NGINX_SITE_CONFIG="/etc/nginx/sites-available/$APP_NAME"
NEEDS_NGINX_UPDATE=false

# Check if configuration exists and compare
if [ -f "$NGINX_SITE_CONFIG" ]; then
    echo -e "${GREEN}✓ Nginx configuration file exists${NC}"
    # You can add more sophisticated config comparison here if needed
    # For now, we'll assume if file exists, it's configured
else
    echo -e "${YELLOW}→ Creating Nginx configuration...${NC}"
    NEEDS_NGINX_UPDATE=true
    
    sudo tee /etc/nginx/sites-available/$APP_NAME > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;

    server_name tejasm.dev www.tejasm.dev;  # Replace with your domain

    # Security Headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self';" always;

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
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 256;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/x-javascript
        application/xml
        application/xml+rss
        application/json
        image/svg+xml
        font/woff2;

    # Browser caching headers
    location ~* \.(js|css)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options "nosniff" always;
    }

    location ~* \.(png|jpg|jpeg|gif|ico|svg|webp|avif)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
        add_header X-Content-Type-Options "nosniff" always;
    }

    location ~* \.(woff|woff2|ttf|eot|otf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Access-Control-Allow-Origin "*";
        add_header X-Content-Type-Options "nosniff" always;
    }
}
EOF
fi

# Enable the site if not already enabled
if [ ! -L "/etc/nginx/sites-enabled/$APP_NAME" ]; then
    echo -e "${YELLOW}→ Enabling Nginx site...${NC}"
    sudo ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
    NEEDS_NGINX_UPDATE=true
else
    echo -e "${GREEN}✓ Nginx site already enabled${NC}"
fi

# Remove default site if exists
if [ -f "/etc/nginx/sites-enabled/default" ]; then
    echo -e "${YELLOW}→ Removing default Nginx site...${NC}"
    sudo rm -f /etc/nginx/sites-enabled/default
    NEEDS_NGINX_UPDATE=true
fi

# Test and restart Nginx only if changes were made
if [ "$NEEDS_NGINX_UPDATE" = true ]; then
    echo -e "${YELLOW}→ Testing Nginx configuration...${NC}"
    sudo nginx -t
    echo -e "${YELLOW}→ Restarting Nginx...${NC}"
    sudo systemctl restart nginx
fi

# Ensure Nginx is enabled at startup
if ! systemctl is-enabled nginx &>/dev/null; then
    sudo systemctl enable nginx
fi

echo -e "${GREEN}✅ Nginx configuration complete${NC}"

###############################################################################
# 8. Configure Firewall (UFW)
###############################################################################
echo -e "${BLUE}🔥 Checking firewall configuration...${NC}"

# Check if UFW is active
if sudo ufw status | grep -q "Status: active"; then
    echo -e "${GREEN}✓ UFW firewall is active${NC}"
else
    echo -e "${YELLOW}→ Enabling UFW firewall...${NC}"
    sudo ufw --force enable
fi

# Check and add firewall rules
for port_rule in "22/tcp" "80/tcp" "443/tcp"; do
    PORT_NUM=$(echo $port_rule | cut -d'/' -f1)
    if sudo ufw status | grep -q "^$PORT_NUM"; then
        echo -e "${GREEN}✓ Port $PORT_NUM already allowed${NC}"
    else
        echo -e "${YELLOW}→ Allowing port $PORT_NUM...${NC}"
        sudo ufw allow $port_rule
    fi
done

sudo ufw status
echo -e "${GREEN}✅ Firewall configuration complete${NC}"

###############################################################################
# 9. Setup SSL with Let's Encrypt (Optional - requires domain)
###############################################################################
echo -e "${BLUE}🔒 Checking SSL/Certbot...${NC}"

# Check if certbot is installed
if command -v certbot &>/dev/null; then
    echo -e "${GREEN}✓ Certbot is already installed${NC}"
    
    # Check if certificates exist
    if sudo certbot certificates 2>/dev/null | grep -q "Certificate Name"; then
        echo -e "${GREEN}✓ SSL certificates already configured${NC}"
        # Ensure auto-renewal is enabled
        if ! systemctl is-enabled certbot.timer &>/dev/null; then
            sudo systemctl enable certbot.timer
        fi
    else
        echo -e "${YELLOW}ℹ No SSL certificates found${NC}"
        read -p "Do you want to setup SSL certificate now? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${BLUE}📝 Please enter your domain name (e.g., tejasm.dev):${NC}"
            read DOMAIN_NAME
            
            echo -e "${BLUE}📝 Please enter your email for SSL certificate:${NC}"
            read EMAIL_ADDRESS
            
            sudo certbot --nginx -d $DOMAIN_NAME -d www.$DOMAIN_NAME --non-interactive --agree-tos -m $EMAIL_ADDRESS
            sudo systemctl enable certbot.timer
            echo -e "${GREEN}✅ SSL certificate installed${NC}"
        fi
    fi
else
    read -p "Certbot not installed. Do you want to setup SSL with Let's Encrypt? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}→ Installing Certbot...${NC}"
        sudo apt-get install -y certbot python3-certbot-nginx
        
        echo -e "${BLUE}📝 Please enter your domain name (e.g., tejasm.dev):${NC}"
        read DOMAIN_NAME
        
        echo -e "${BLUE}📝 Please enter your email for SSL certificate:${NC}"
        read EMAIL_ADDRESS
        
        sudo certbot --nginx -d $DOMAIN_NAME -d www.$DOMAIN_NAME --non-interactive --agree-tos -m $EMAIL_ADDRESS
        sudo systemctl enable certbot.timer
        echo -e "${GREEN}✅ SSL certificate installed${NC}"
    fi
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
echo -e "${BLUE}⚡ Checking system optimization for 2GB RAM...${NC}"

# Check if swap exists
if [ -f /swapfile ]; then
    echo -e "${GREEN}✓ Swap file already exists${NC}"
    # Verify it's active
    if ! swapon --show | grep -q "/swapfile"; then
        echo -e "${YELLOW}→ Activating swap file...${NC}"
        sudo swapon /swapfile
    fi
    # Ensure it's in fstab
    if ! grep -q "/swapfile" /etc/fstab; then
        echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    fi
else
    echo -e "${YELLOW}→ Creating 2GB swap file...${NC}"
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    echo -e "${GREEN}✅ Swap file created${NC}"
fi

# Check current swappiness
CURRENT_SWAPPINESS=$(cat /proc/sys/vm/swappiness)
if [ "$CURRENT_SWAPPINESS" != "10" ]; then
    echo -e "${YELLOW}→ Optimizing swappiness for SSD (current: $CURRENT_SWAPPINESS)...${NC}"
    sudo sysctl vm.swappiness=10
    if ! grep -q "vm.swappiness=10" /etc/sysctl.conf; then
        echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
    fi
    echo -e "${GREEN}✅ Swappiness optimized${NC}"
else
    echo -e "${GREEN}✓ Swappiness already optimized (10)${NC}"
fi

###############################################################################
# 12. Setup Log Rotation
###############################################################################
echo -e "${BLUE}📝 Checking log rotation configuration...${NC}"

LOGROTATE_CONFIG="/etc/logrotate.d/$APP_NAME"
if [ -f "$LOGROTATE_CONFIG" ]; then
    echo -e "${GREEN}✓ Log rotation already configured${NC}"
else
    echo -e "${YELLOW}→ Setting up log rotation...${NC}"
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
fi

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
