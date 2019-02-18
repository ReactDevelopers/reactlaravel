module.exports = {
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }, 'unique-name']
  ]
};