import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      // Enable Fast Refresh
      fastRefresh: true,
      // Optimize babel for production
      babel: {
        compact: true,
      }
    })
  ],

  // Build optimizations
  build: {
    // Target modern browsers for smaller bundle
    target: 'esnext',

    // Minification settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'], // Remove specific console methods
        passes: 2, // Multiple passes for better compression
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false, // Remove comments
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,

    // Rollup options for better code splitting
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('three') || id.includes('@react-three') || id.includes('maath')) {
              return 'three-vendor';
            }
            if (id.includes('@splinetool')) {
              return 'spline-vendor';
            }
            if (id.includes('framer-motion') || id.includes('motion')) {
              return 'animation-vendor';
            }
            // Group other UI libraries
            if (id.includes('react-parallax-tilt') || id.includes('react-vertical-timeline-component') || id.includes('@tabler/icons-react')) {
              return 'ui-vendor';
            }
          }
        },

        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },

    // Source maps for debugging (disable in production for smaller size)
    sourcemap: false,

    // CSS code splitting
    cssCodeSplit: true,

    // Report compressed size
    reportCompressedSize: true,

    // Optimize assets
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      '@emailjs/browser',
      'use-sync-external-store/shim/with-selector.js' // Fix for framer-motion/react-three-fiber export issue
    ],
  },

  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: [
      '.ngrok-free.app',
      '.ngrok.io',
      'localhost',
      '127.0.0.1'
    ],
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  }
})
