'use strict';

function RobotsPlugin(options) {
  this.options = Object.assign({}, {
    userAgents: [{
      name: '*',
      allow: ['/'],
      disallow: []
    }]
  }, options);
}

RobotsPlugin.prototype = {

  constructor: RobotsPlugin,

  apply: function (compiler) {

    compiler.plugin('emit', (compilation, callback) => {

      const output = this.options.userAgents.map(userAgent => {
        let text = '';
        text += `User-agent: ${userAgent.name}\n`;

        if (userAgent.disallow && userAgent.disallow.length > 0) {
          text += userAgent.disallow.map(disallow => {
            return `Disallow: ${disallow}\n`;
          });
        }

        if (userAgent.allow && userAgent.allow.length > 0) {
          text += userAgent.allow.map(allow => {
            return `Allow: ${allow}\n`;
          });
        }
        return text + '\n';
      }).join('').trim();

      compilation.assets['robots.txt'] = {
        source: function() {
          return output
        },
        size: function() {
          return output.length
        }
      };

      callback();
    });
  }
};

module.exports = RobotsPlugin;
