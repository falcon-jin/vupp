const path = require('path');
const fs = require('fs')
const fse = require('fs-extra')
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')

// 打包入口
const entryDir = path.resolve(__dirname, '../src')
// 出口
const outDir = path.resolve(__dirname, '../lib')

fse.emptyDirSync(outDir)

// vite config
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()],
})

// rollup config
const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue',
    }
  }
}

// 全量打包构建
const buildAll = async () => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        name: 'vupp',
        fileName: 'vupp',
        formats: ['esm', 'umd'],
      },
      outDir,
    },
  })
}

// 按需打包构建
const buildSingle = async (name) => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, name),
        name: 'index',
        fileName: 'index',
        formats: ['esm', 'umd'],
      },
      outDir: path.resolve(outDir, name),
    },
  })
}

// 按需引入的package.json文件
const createPackageJson = (name) => {
  const _name = `components/${name}`

  const fileStr = `{
  "name": "${name.toLowerCase()}",
  "main": "index.umd.js",
  "module": "index.esm.js",
  "style": "style.css"
}
  `
  const declareD = `// vupp - vue插件
import { App } from "vue";

declare const _default: {
  install(app: App): void;
};

export default _default;
  `

  // 输出
  fse.outputFile(
    path.resolve(outDir, `${_name}/package.json`),
    fileStr,
    'utf-8'
  )
  fse.outputFile(
    path.resolve(outDir, `${_name}/index.d.ts`),
    declareD,
    'utf-8'
  )
  fse.outputFile(
    path.resolve(outDir, `index.d.ts`),
    declareD,
    'utf-8'
  )
}

const handlerBuildSingle = async () => {
  // 获取组件名称列表
  const cpns = fs.readdirSync(`${entryDir}/components`).filter(name => {
    const cpnPath = `components/${name}`
    const cpnDir = path.resolve(entryDir, cpnPath)
    const isDir = fs.lstatSync(cpnDir).isDirectory()
    return isDir && fs.readdirSync(cpnDir).includes('index.ts')
  })
  // 循环构建
  for (const name of cpns) {
    await buildSingle(`components/${name}`)
    await createPackageJson(name)
  }
}

const buildLib = async () => {
  await buildAll()
  await handlerBuildSingle()
}

try {
  buildLib()
} catch (e) {
  // console.log(e)
}