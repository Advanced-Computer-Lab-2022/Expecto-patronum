module.exports = {
    presets: [['next/babel', { 'preset-react': { runtime: 'automatic' } }]],
    plugins: [
      ['babel-plugin-styled-components', { ssr: true }],
      ["babel-plugin-twin", { "debug": false }],
      'babel-plugin-macros',
    ],
}