// config-overrides.js
module.exports = function override(config, env) {
    // Add polyfills for 'util' and exclude 'fs' (not needed in the browser)
    config.resolve.fallback = {
      util: require.resolve('util/'),
      fs: false,  // 'fs' is a Node.js-specific module, exclude it
    };
    return config;
  };
  