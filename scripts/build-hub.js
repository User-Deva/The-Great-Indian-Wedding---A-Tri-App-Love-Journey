/**
 * Build Hub Script
 *
 * Builds all 3 apps and combines them into a single dist/ directory
 * with the hub landing page at the root.
 *
 * Output structure:
 *   dist/
 *     index.html          (hub landing page)
 *     rishta/             (Rishta app)
 *     shaadi-sajao/       (Shaadi Sajao app)
 *     jannat-safar/       (Jannat Safar app)
 */

import { execSync } from 'child_process';
import { cpSync, mkdirSync, rmSync, copyFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

const DIST = resolve(ROOT, 'dist');

// BASE_PATH env var for GitHub Pages: e.g., "/The-Great-Indian-Wedding---A-Tri-App-Love-Journey"
const BASE_PATH = process.env.BASE_PATH || '';

console.log('🏗️  Building The Great Indian Wedding Hub...\n');
if (BASE_PATH) {
  console.log(`📌 Base path: ${BASE_PATH}\n`);
}

// Clean dist
if (existsSync(DIST)) {
  rmSync(DIST, { recursive: true });
}
mkdirSync(DIST, { recursive: true });

// Build each app
const apps = [
  { name: 'rishta', dir: 'apps/rishta', base: `${BASE_PATH}/rishta/` },
  { name: 'shaadi-sajao', dir: 'apps/shaadi-sajao', base: `${BASE_PATH}/shaadi-sajao/` },
  { name: 'jannat-safar', dir: 'apps/jannat-safar', base: `${BASE_PATH}/jannat-safar/` },
];

for (const app of apps) {
  console.log(`📦 Building ${app.name}...`);
  const appDir = resolve(ROOT, app.dir);

  try {
    // Build with base path for sub-directory hosting
    execSync(`npx vite build --base ${app.base}`, {
      cwd: appDir,
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' },
    });

    // Copy built output to dist/<app-name>/
    const appDist = resolve(appDir, 'dist');
    const targetDir = resolve(DIST, app.name);

    if (existsSync(appDist)) {
      cpSync(appDist, targetDir, { recursive: true });
      console.log(`  ✅ ${app.name} → dist/${app.name}/\n`);
    } else {
      console.error(`  ❌ Build output not found for ${app.name}`);
      process.exit(1);
    }
  } catch (err) {
    console.error(`  ❌ Failed to build ${app.name}:`, err.message);
    process.exit(1);
  }
}

// Copy hub landing page
console.log('📄 Copying hub landing page...');
copyFileSync(resolve(ROOT, 'index.html'), resolve(DIST, 'index.html'));

// Create a simple 404.html for GitHub Pages SPA routing
copyFileSync(resolve(ROOT, 'index.html'), resolve(DIST, '404.html'));

console.log('\n🎉 Build complete! Output in dist/');
console.log('   dist/index.html        → Hub landing page');
console.log('   dist/rishta/            → Rishta app');
console.log('   dist/shaadi-sajao/      → Shaadi Sajao app');
console.log('   dist/jannat-safar/      → Jannat Safar app');
