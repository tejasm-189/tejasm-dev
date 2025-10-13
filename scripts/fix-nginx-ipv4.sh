#!/bin/bash
# Fix Nginx to use IPv4 instead of IPv6 for localhost

echo "🔧 Fixing Nginx to use IPv4 (127.0.0.1) instead of IPv6 ([::1])"

# Backup current config
sudo cp /etc/nginx/sites-available/tejasm-dev /etc/nginx/sites-available/tejasm-dev.backup.$(date +%Y%m%d-%H%M%S)

# Create new config with explicit IPv4
sudo tee /etc/nginx/sites-available/tejasm-dev > /dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;

    server_name tejasm.dev www.tejasm.dev 165.22.210.66;

    # Security: Block common exploit paths
    location ~ /(\.env|\.git|wp-admin|wordpress|admin|config\.php) {
        deny all;
        return 404;
    }

    location / {
        # Use explicit IPv4 instead of localhost (prevents IPv6 issues)
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
}
EOF

# Test configuration
echo ""
echo "📝 Testing Nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Configuration valid!"
    echo "🔄 Reloading Nginx..."
    sudo systemctl reload nginx
    echo ""
    echo "✅ Done! Testing connection..."
    echo ""
    sleep 2
    
    # Test the connection
    echo "Testing IPv4 connection:"
    curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://127.0.0.1:3000
    
    echo ""
    echo "Testing through Nginx:"
    curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost
    
    echo ""
    echo "✅ Nginx is now using IPv4 (127.0.0.1:3000)"
    echo "🌐 Your site should work at: http://tejasm.dev"
else
    echo ""
    echo "❌ Configuration error!"
    echo "Restoring backup..."
    sudo cp /etc/nginx/sites-available/tejasm-dev.backup.* /etc/nginx/sites-available/tejasm-dev
fi
EOF

chmod +x fix-nginx-ipv4.sh
echo "✅ Script created: fix-nginx-ipv4.sh"
