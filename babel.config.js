const presets = ['module:@react-native/babel-preset'];

const plugins = [
 [
  'module-resolver',
  {
   root: ['./src'],
   extensions: [
    '.ios.js',
    '.android.js',
    '.ios.ts',
    '.android.ts',
    '.ios.tsx',
    '.android.tsx',
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.json',
   ],
   alias: {
    '@api': './src/api',
    '@assets': './src/assets',
    '@components': './src/components',
    '@constants': './src/constants',
    '@hooks': './src/hooks',
    '@localization': './src/localization',
    '@modals': './src/modals',
    '@navigation': './src/navigation',
    '@screens': './src/screens',
    '@services': './src/services',
    '@stores': './src/stores',
    '@styles': './src/styles',
    '@utils': './src/utils',
    '@helper': './src/helper',
    '@config': './src/config'
   },
  },
 ],
];

module.exports = { presets, plugins };
