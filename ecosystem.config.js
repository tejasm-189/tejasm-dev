module.exports = {
  apps: [
    {
      name: process.env.APP_NAME || 'tejasm-dev',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/tejasm-dev/current',
      instances: process.env.PM2_INSTANCES || 1,
      autorestart: true,
      watch: false,
      max_memory_restart: process.env.MAX_MEMORY_RESTART || '1G',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
        SITE_URL: process.env.SITE_URL || 'https://tejasm.dev',
        LOG_LEVEL: process.env.LOG_LEVEL || 'info',
        // Add more environment variables as needed
        // They will be loaded from .env file or system environment
      },
      error_file: '/var/www/tejasm-dev/logs/error.log',
      out_file: '/var/www/tejasm-dev/logs/out.log',
      log_file: '/var/www/tejasm-dev/logs/combined.log',
      time: true,
      
      // Load environment variables from .env file
      env_file: '/var/www/tejasm-dev/current/.env',
    },
  ],
};
