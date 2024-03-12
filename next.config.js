/* next.config.js */

const webpack = require('webpack');
require('dotenv').config("./.env.local");

module.exports = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
          },
        ],
      },
    webpack: 
    config => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
        acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
        return acc;
    }, {});
    
    
    config.plugins.push(new webpack.DefinePlugin({env, "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("development"),
    },}));
    
    return config;
    }
};
