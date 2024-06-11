module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          // This has to be mirrored in tsconfig.json
          assets: './src/assets',
          components: './src/components',
          navigation: './src/navigation',
          screens: './src/screens',
          themes: './src/themes',
          utils: './src/utils',
          src: './src',
        },
      },
    ],
  ],
};
