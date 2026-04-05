#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const apps = ['rishta', 'shaadi-sajao', 'jannat-safar'];
const packages = ['theme-engine', 'auth', 'our-story', 'ui'];

console.log('📊 Bundle Size Analysis Report\n');
console.log('=' .repeat(60));

const analyzeBundle = (name, distPath) => {
  const manifestPath = join(distPath, '.vite', 'manifest.json');

  if (!existsSync(manifestPath)) {
    console.log(`\n⚠️  ${name}: No manifest found (skipping)`);
    return;
  }

  try {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    let totalSize = 0;

    console.log(`\n📦 ${name}`);
    console.log('-'.repeat(60));

    Object.entries(manifest).forEach(([file, data]: any) => {
      if (data.file) {
        const filePath = join(distPath, data.file);
        if (existsSync(filePath)) {
          const size = (readFileSync(filePath).length / 1024).toFixed(2);
          totalSize += parseFloat(size);

          if (size > 100) {
            console.log(`  ⚠️  ${file.padEnd(40)} ${size}KB (large)`);
          } else if (size > 50) {
            console.log(`  ℹ️  ${file.padEnd(40)} ${size}KB`);
          }
        }
      }
    });

    console.log(`  Total: ${totalSize.toFixed(2)}KB`);

    // Show optimization recommendations
    if (totalSize > 500) {
      console.log(`  💡 Consider code splitting or lazy loading`);
    }
  } catch (error) {
    console.log(`  ✗ Error analyzing ${name}`);
  }
};

// Analyze apps
console.log('\n🎯 APPLICATIONS');
apps.forEach((app) => {
  const distPath = join(process.cwd(), 'apps', app, 'dist');
  analyzeBundle(app, distPath);
});

// Analyze packages
console.log('\n\n📚 PACKAGES');
packages.forEach((pkg) => {
  const distPath = join(process.cwd(), 'packages', pkg, 'dist');
  analyzeBundle(pkg, distPath);
});

// Summary and recommendations
console.log('\n' + '='.repeat(60));
console.log('\n🎯 Optimization Recommendations:\n');
console.log('1. Code Splitting');
console.log('   - Split routes into separate chunks');
console.log('   - Use React.lazy() for components');
console.log('   - Lazy load heavy libraries\n');

console.log('2. Tree Shaking');
console.log('   - Remove unused exports');
console.log('   - Use ES6 modules');
console.log('   - Mark side-effect free modules\n');

console.log('3. Minification');
console.log('   - Enable production builds');
console.log('   - Use compression (gzip, brotli)');
console.log('   - Remove source maps in production\n');

console.log('4. Dependencies');
console.log('   - Audit and remove unused packages');
console.log('   - Use lighter alternatives');
console.log('   - Check bundle impact before adding\n');

console.log('5. Images & Assets');
console.log('   - Optimize image formats (WebP)');
console.log('   - Use lazy loading');
console.log('   - Implement responsive images\n');

console.log('=' .repeat(60));
console.log('\n✅ Analysis Complete!\n');
