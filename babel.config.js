module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          // This has to be mirrored in tsconfig.json
          assets: './src/assets',
          components: './src/components',
          constants: './src/constants',
          navigation: './src/navigation',
          networkings: './src/networkings',
          stores: './src/stores',
          screens: './src/screens',
          themes: './src/themes',
          utils: './src/utils',
          src: './src',
        },
      },
    ],
  ],
};
