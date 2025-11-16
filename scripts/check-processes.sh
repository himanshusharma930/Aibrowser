#!/bin/bash

# Script to check for duplicate dev processes
# Run this before starting dev to avoid multiple instances

echo "🔍 Checking for running dev processes..."
echo ""

# Check for Next.js dev servers
NEXT_PROCESSES=$(ps aux | grep -E "next dev|next-server" | grep -v grep | wc -l | tr -d ' ')
if [ "$NEXT_PROCESSES" -gt 0 ]; then
  echo "⚠️  Found $NEXT_PROCESSES Next.js dev server(s) running:"
  ps aux | grep -E "next dev|next-server" | grep -v grep | awk '{print "   PID:", $2, "- Started:", $9}'
  echo ""
fi

# Check for Vite build processes
VITE_PROCESSES=$(ps aux | grep "vite build" | grep -v grep | wc -l | tr -d ' ')
if [ "$VITE_PROCESSES" -gt 0 ]; then
  echo "⚠️  Found $VITE_PROCESSES Vite build process(es) running:"
  ps aux | grep "vite build" | grep -v grep | awk '{print "   PID:", $2, "- Started:", $9}'
  echo ""
fi

# Check for Electron processes
ELECTRON_PROCESSES=$(ps aux | grep "electron.*dist/electron" | grep -v grep | wc -l | tr -d ' ')
if [ "$ELECTRON_PROCESSES" -gt 0 ]; then
  echo "⚠️  Found $ELECTRON_PROCESSES Electron process(es) running:"
  ps aux | grep "electron.*dist/electron" | grep -v grep | awk '{print "   PID:", $2, "- Started:", $9}'
  echo ""
fi

# Check for nodemon processes
NODEMON_PROCESSES=$(ps aux | grep "nodemon" | grep -v grep | wc -l | tr -d ' ')
if [ "$NODEMON_PROCESSES" -gt 0 ]; then
  echo "⚠️  Found $NODEMON_PROCESSES nodemon process(es) running:"
  ps aux | grep "nodemon" | grep -v grep | awk '{print "   PID:", $2, "- Started:", $9}'
  echo ""
fi

TOTAL=$((NEXT_PROCESSES + VITE_PROCESSES + ELECTRON_PROCESSES + NODEMON_PROCESSES))

if [ "$TOTAL" -gt 0 ]; then
  echo "❌ Total: $TOTAL dev processes running"
  echo ""
  echo "To kill all dev processes, run:"
  echo "  ./scripts/kill-dev-processes.sh"
  echo ""
  exit 1
else
  echo "✅ No dev processes running - safe to start dev server"
  echo ""
  exit 0
fi
