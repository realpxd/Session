module.exports = {
  presets: ['module:@react-native/babel-preset'],
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
