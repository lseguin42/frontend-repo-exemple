import typescript from 'rollup-plugin-typescript';
import lessModules from 'rollup-plugin-less-modules';
import html from 'rollup-plugin-html';

export default {
  input: './src/main.ts',
  output: {
      format: 'esm',
      file: './dist/main.js'
  },
  plugins: [
    typescript(),
    lessModules(),
    html({ include: '**/*.html' }),
  ]
}