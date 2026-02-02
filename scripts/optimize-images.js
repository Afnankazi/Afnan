#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts large PNG images to WebP format for better performance
 * 
 * Usage: node scripts/optimize-images.js
 */

import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = './public';
const QUALITY = 80; // WebP quality (0-100)
const MAX_SIZE_KB = 500; // Warn if image is larger than this

async function getImageFiles(dir) {
    const files = [];
    const items = await readdir(dir);

    for (const item of items) {
        const fullPath = join(dir, item);
        const stats = await stat(fullPath);

        if (stats.isDirectory()) {
            // Recursively get images from subdirectories
            const subFiles = await getImageFiles(fullPath);
            files.push(...subFiles);
        } else if (['.png', '.jpg', '.jpeg'].includes(extname(item).toLowerCase())) {
            files.push(fullPath);
        }
    }

    return files;
}

async function optimizeImage(inputPath) {
    try {
        const stats = await stat(inputPath);
        const sizeKB = Math.round(stats.size / 1024);

        console.log(`\n📸 Processing: ${inputPath} (${sizeKB} KB)`);

        // Get image metadata
        const metadata = await sharp(inputPath).metadata();

        // Create WebP version
        const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

        await sharp(inputPath)
            .webp({ quality: QUALITY })
            .toFile(outputPath);

        const newStats = await stat(outputPath);
        const newSizeKB = Math.round(newStats.size / 1024);
        const savings = Math.round(((sizeKB - newSizeKB) / sizeKB) * 100);

        console.log(`✅ Created: ${outputPath} (${newSizeKB} KB)`);
        console.log(`💾 Saved: ${savings}% (${sizeKB - newSizeKB} KB)`);

        if (newSizeKB > MAX_SIZE_KB) {
            console.log(`⚠️  Warning: Image is still large (${newSizeKB} KB). Consider resizing.`);
        }

        return { original: sizeKB, optimized: newSizeKB, savings };
    } catch (error) {
        console.error(`❌ Error processing ${inputPath}:`, error.message);
        return null;
    }
}

async function main() {
    console.log('🚀 Starting image optimization...\n');

    try {
        const imageFiles = await getImageFiles(PUBLIC_DIR);

        if (imageFiles.length === 0) {
            console.log('No images found to optimize.');
            return;
        }

        console.log(`Found ${imageFiles.length} images to optimize\n`);

        let totalOriginal = 0;
        let totalOptimized = 0;

        for (const file of imageFiles) {
            const result = await optimizeImage(file);
            if (result) {
                totalOriginal += result.original;
                totalOptimized += result.optimized;
            }
        }

        const totalSavings = Math.round(((totalOriginal - totalOptimized) / totalOriginal) * 100);

        console.log('\n' + '='.repeat(50));
        console.log('📊 Optimization Summary:');
        console.log(`   Original size: ${totalOriginal} KB`);
        console.log(`   Optimized size: ${totalOptimized} KB`);
        console.log(`   Total savings: ${totalSavings}% (${totalOriginal - totalOptimized} KB)`);
        console.log('='.repeat(50));

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

main();
