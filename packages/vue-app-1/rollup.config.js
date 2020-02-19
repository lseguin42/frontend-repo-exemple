import vue from 'rollup-plugin-vue'
import autoExternal from 'rollup-plugin-auto-external';
export default {
  input: './src/main.js',
  output: {
    format: 'esm',
    file: './dist/my-component.esm.js',
    sourcemap: false,
  },
  plugins: [
      vue({ isWebComponent: true, template: { isProduction: true } }),
      // autoExternal()
  ]
}
