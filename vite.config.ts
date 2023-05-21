import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import { svgstore } from './src/vite_plugins/svgstore';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    vueJsx({
      transformOn:true,
      mergeProps:true
    }),
    svgstore(),
    // createSvgSpritePlugin({
    //   symbolId: 'icon-[name]-[hash]'
    
    // })
  ]
})
