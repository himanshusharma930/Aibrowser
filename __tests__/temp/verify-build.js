#!/usr/bin/env node

/**
 * Verify the build fix is working correctly
 * Run after building: node __tests__/temp/verify-build.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const buildDir = path.join(__dirname, '../../release/mac-universal/DeepFundAIBrowser.app/Contents/Resources');
const asarPath = path.join(buildDir, 'app.asar');
const tempDir = '/tmp/verify-build-' + Date.now();

console.log('\n📦 Verifying production build...\n');

if (!fs.existsSync(asarPath)) {
  console.error('❌ No asar file found. Build first: npm run build');
  process.exit(1);
}

try {
  // Extract asar
  console.log('📂 Extracting asar...');
  execSync(`npx asar extract "${asarPath}" "${tempDir}"`, { stdio: 'ignore' });

  // Check semver version
  console.log('🔍 Checking semver version...');
  const semverPkg = JSON.parse(
    fs.readFileSync(path.join(tempDir, 'node_modules/semver/package.json'), 'utf-8')
  );
  const version = semverPkg.version;

  if (!version.startsWith('7.')) {
    console.error(`❌ Wrong semver version: ${version} (expected 7.x)`);
    process.exit(1);
  }
  console.log(`✅ Semver version correct: ${version}`);

  // Check no test dependencies
  console.log('\n🧪 Checking for test dependencies...');
  const nodeModules = fs.readdirSync(path.join(tempDir, 'node_modules'));

  const testDeps = ['jest', '@jest', '@testing-library', 'ts-jest', 'babel-plugin-istanbul'];
  const found = testDeps.filter(dep => nodeModules.includes(dep));

  if (found.length > 0) {
    console.error(`❌ Found unwanted test dependencies: ${found.join(', ')}`);
    process.exit(1);
  }
  console.log('✅ No test dependencies in build');

  // Check required modules exist
  console.log('\n📚 Checking required modules...');
  const required = ['sharp', 'semver', '@img', 'detect-libc'];
  const missing = required.filter(mod => !nodeModules.includes(mod));

  if (missing.length > 0) {
    console.error(`❌ Missing required modules: ${missing.join(', ')}`);
    process.exit(1);
  }
  console.log(`✅ All required modules present: ${required.join(', ')}`);

  console.log('\n✅ Build verification PASSED!\n');

} finally {
  // Cleanup
  if (fs.existsSync(tempDir)) {
    execSync(`rm -rf "${tempDir}"`, { stdio: 'ignore' });
  }
}
