#!/bin/bash

echo "🚀 Starting build process..."
echo ""

echo "📦 Step 1/4: Building Next.js..."
pnpm run build:next-only

echo ""
echo "⚙️  Step 2/4: Building Electron preload scripts..."
pnpm run build:preload

echo ""
echo "🔧 Step 3/4: Building Electron main process..."
pnpm run build:main

echo ""
echo "📱 Step 4/4: Packaging application (this takes 90-120 seconds)..."
echo "⏳ Creating universal binary for macOS..."
pnpm run build:electron

echo ""
echo "✅ Build complete!"
ls -lh release/*.dmg
