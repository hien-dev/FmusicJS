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
          hooks: './src/hooks',
          navigation: './src/navigation',
          networkings: './src/networkings',
          realms: './src/realms',
          screens: './src/screens',
          utils: './src/utils',
          src: './src',
        },
      },
    ],
  ],
};
