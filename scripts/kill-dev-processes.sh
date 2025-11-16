#!/bin/bash

# Script to kill all dev processes
# Use this to clean up before starting a fresh dev session

echo "🛑 Killing all dev processes..."
echo ""

# Kill Next.js
pkill -f "next dev" && echo "✅ Killed Next.js dev servers"

# Kill Vite
pkill -f "vite build" && echo "✅ Killed Vite build processes"

# Kill Electron
pkill -f "electron.*dist/electron" && echo "✅ Killed Electron processes"

# Kill nodemon
pkill -f "nodemon" && echo "✅ Killed nodemon processes"

# Kill esbuild
pkill -f "esbuild" && echo "✅ Killed esbuild processes"

# Kill concurrently
pkill -f "concurrently" && echo "✅ Killed concurrently processes"

echo ""
echo "✅ All dev processes killed"
echo ""
echo "You can now safely run: pnpm run dev"
