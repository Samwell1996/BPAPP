const { readdirSync, readFileSync, writeFileSync, copyFileSync } = require('fs');
const { execSync } = require('child_process')
const APP_ASSETS_FONTS = './assets/fonts'
const IOS_ASSETS_FONTS = './ios'
const ANDROID_ASSETS_FONTS = './android/app/src/main/assets/fonts'

const copyFiles = ({ file, outDir }) => {
  try {
    copyFileSync(file, outDir)
  } catch (err) {
    throw err
  }

  console.log(`Added fonts to ${outDir}`)
}

const generateReactNativeAsset = (icons, { dir, fontName, fontDir }) => {
  const generatorOptions = {
    name: fontName,
    css: false,
    html: false,
    types: 'ttf',
    out: fontDir,
    height: 500
  }

  const optionString = Object.entries(generatorOptions)
    .map(([option, value]) => `--${option} ${value}`)
    .join(' ')

  execSync(`node_modules/icon-font-generator/bin/icon-font-generator ./${dir}/*.svg ${optionString}`)

  const glyphMap = JSON.parse(readFileSync(`./${fontDir}/${fontName}.json`))

  const customFontContent = [
    '{',
    icons
      .map(value => `"${value}": ${parseInt(glyphMap[value].substr(1), 16)}`)
      .join(',\n'),
    '}'
  ].join('\n')

  writeFileSync(`./${fontDir}/${fontName}.json`, customFontContent)

  copyFiles({
    file: `./${fontDir}/${fontName}.ttf`,
    outDir: `${APP_ASSETS_FONTS}/${fontName}.ttf`
  })
  copyFiles({
    file: `./${fontDir}/${fontName}.ttf`,
    outDir: `${IOS_ASSETS_FONTS}/${fontName}.ttf`
  })
  copyFiles({
    file: `./${fontDir}/${fontName}.ttf`,
    outDir: `${ANDROID_ASSETS_FONTS}/${fontName}.ttf`
  })
  console.log('React Native Asset generated! ✅')
}

const isSVG = file => /.svg$/.test(file);

const removeExtension = file => file.split('.')[0];

const ICON_SOURCE_FOLDER = 'assets/icons';
const FONT_FOLDER = 'src/assets';
const FONT_NAME = 'Icons';

const icons = readdirSync(ICON_SOURCE_FOLDER)
  .filter(isSVG)
  .map(removeExtension);

try {
  generateReactNativeAsset(icons, {
    fontName: FONT_NAME,
    dir: ICON_SOURCE_FOLDER,
    fontDir: FONT_FOLDER,
  });
} catch (e) {
  console.error(e);
}
