const madge = require('madge'); // https://github.com/pahen/madge
const path = require('path');

const svg = path.resolve(__dirname, 'graph.svg');
const entry = path.resolve(__dirname, '..', 'src', 'main.js');
const webpackConfig = path.resolve(__dirname, '..', 'webpack.config.js');

madge(entry, {
  webpackConfig,
  nodeShape: 'component',
  fontSize: '10px',
}).then((res) => {
  res.image(svg);
  console.log(res.circular());
});
