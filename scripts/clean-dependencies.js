#!/usr/bin/env node

/**
 * Clean dependencies script - Removes conflicting test dependencies before electron-builder runs
 * This ensures only production dependencies are packaged in the final build
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const nodeModulesDir = path.join(rootDir, 'node_modules');

// Directories to remove (test dependencies that conflict with production)
const directoriesToRemove = [
  '@jest',
  'jest',
  'jest-*',
  'babel-plugin-istanbul',
  'istanbul-lib-instrument',
  '@testing-library',
  'ts-jest'
];

// Files to check for semver version conflicts
const semverPackageJson = path.join(nodeModulesDir, 'semver', 'package.json');

console.log('🧹 Cleaning dependencies before electron-builder...\n');

// Remove test dependencies
directoriesToRemove.forEach(pattern => {
  const fullPath = path.join(nodeModulesDir, pattern);

  if (pattern.includes('*')) {
    // Handle glob patterns
    const prefix = pattern.replace('*', '');
    const dirs = fs.readdirSync(nodeModulesDir);

    dirs.forEach(dir => {
      if (dir.startsWith(prefix)) {
        const dirPath = path.join(nodeModulesDir, dir);
        if (fs.existsSync(dirPath)) {
          console.log(`  ✓ Removing ${dir}`);
          fs.rmSync(dirPath, { recursive: true, force: true });
        }
      }
    });
  } else {
    // Handle exact matches
    if (fs.existsSync(fullPath)) {
      console.log(`  ✓ Removing ${pattern}`);
      fs.rmSync(fullPath, { recursive: true, force: true });
    }
  }
});

// Verify semver version
if (fs.existsSync(semverPackageJson)) {
  const packageJson = JSON.parse(fs.readFileSync(semverPackageJson, 'utf-8'));
  const version = packageJson.version;

  console.log(`\n✅ Semver version: ${version}`);

  if (!version.startsWith('7.')) {
    console.error(`\n❌ ERROR: Wrong semver version detected (${version}). Expected 7.x.x`);
    process.exit(1);
  }
} else {
  console.error('\n❌ ERROR: semver package not found');
  process.exit(1);
}

console.log('\n✅ Dependencies cleaned successfully\n');
