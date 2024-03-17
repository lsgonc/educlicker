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
};
