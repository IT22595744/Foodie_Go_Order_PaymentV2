import {defineConfig} from 'vite'
import React from '@vite/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins:[
        tailwindcss(),
        React()
    ],
})