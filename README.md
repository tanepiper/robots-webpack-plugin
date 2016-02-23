## Webpack Robots.txt

A webpack plugin for generating robots.txt files.

### Why is this plugin useful

When you have multiple environments such as dev, qa and production to want to ensure your non-production environments
are not exposed to search engines such as Google.

This plugin allows you to include this in your environment settings to generate a file.

### How to I use this plugin?

In your webpack config:

```
const WebpackRobots = require('@tanepiper/webpack-robotstxt');

const webpackConfig = {
  entry: 'src/index.js',
  output: {
    path: '/public',
    filename: 'index.js'
  },
  plugins: [new WebpackRobots({
    path: '/public'
  })]
};
```

The default output is an `Allow` directive for all user agents.  To configure, pass in an array to userAgents option.
Each one is an object with a `name:string`, `disallow:array` and `allow:array` in any combination.

```
plugins: [new WebpackRobots({
  path: '/public',
  userAgents: [{
    name: '*',
    disallow: ['/', '/cgi-bin'],
    allow: ['/blog']
  }, {
   name: 'Googlebot',
   disallow: ['/cgi-bin', '/some-path'],
   allow: ['/']
 }]
})]
```
