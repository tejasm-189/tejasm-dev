import type { NextConfig } from "next";
import UnoCSS from '@unocss/webpack';

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Add UnoCSS webpack plugin
    config.plugins.push(
      UnoCSS()
    );
    
    // Important: ensure cache is cleared
    config.cache = false;
    
    return config;
  },
};

export default nextConfig;
