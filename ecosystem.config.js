module.exports = {
  apps: [
    {
      name: 'tejasm-dev',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/tejasm-dev/current',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/www/tejasm-dev/logs/error.log',
      out_file: '/var/www/tejasm-dev/logs/out.log',
      log_file: '/var/www/tejasm-dev/logs/combined.log',
      time: true,
    },
  ],
};
