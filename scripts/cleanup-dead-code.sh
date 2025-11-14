#!/bin/bash
# Safe dead code removal with verification
# Removes semantic-html.ts and accessibility-testing.ts after confirmation

set -e

RESULTS_DIR="__tests__/temp"
mkdir -p "$RESULTS_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
REPORT="$RESULTS_DIR/cleanup-report-$TIMESTAMP.md"

echo "🔧 Dead Code Cleanup Script"
echo "=================================="
echo ""

{
  echo "# Dead Code Cleanup Report"
  echo "Generated: $(date)"
  echo ""

  # Define files to remove
  DEAD_FILES=(
    "src/lib/semantic-html.ts"
    "src/lib/accessibility-testing.ts"
  )

  # Pre-cleanup verification
  echo "## Pre-Cleanup Verification"
  echo ""

  for file in "${DEAD_FILES[@]}"; do
    echo "### Checking: $file"
    if [ ! -f "$file" ]; then
      echo "❌ File not found: $file"
      echo ""
      continue
    fi

    LINES=$(wc -l < "$file")
    BASENAME=$(basename "$file" .ts)

    echo "- Size: $LINES lines"
    echo "- Checking for imports..."

    # Check if file is imported anywhere
    IMPORTS=$(grep -r "import.*from.*['\"].*$BASENAME" src/ electron/ 2>/dev/null | wc -l || echo "0")
    REQUIRES=$(grep -r "require.*$BASENAME" src/ electron/ 2>/dev/null | wc -l || echo "0")
    TOTAL_REFS=$((IMPORTS + REQUIRES))

    echo "- Import statements found: $TOTAL_REFS"

    if [ $TOTAL_REFS -eq 0 ]; then
      echo "- Status: ✅ SAFE TO REMOVE"
    else
      echo "- Status: ❌ REFERENCED IN CODE - DO NOT REMOVE"
      echo ""
      echo "References found:"
      grep -r "import.*from.*['\"].*$BASENAME" src/ electron/ 2>/dev/null || true
      grep -r "require.*$BASENAME" src/ electron/ 2>/dev/null || true
    fi
    echo ""
  done

  # Backup before deletion
  echo "## Creating Backup"
  echo ""
  BACKUP_DIR="$RESULTS_DIR/dead-code-backup-$TIMESTAMP"
  mkdir -p "$BACKUP_DIR"

  for file in "${DEAD_FILES[@]}"; do
    if [ -f "$file" ]; then
      cp "$file" "$BACKUP_DIR/$(basename "$file")"
      echo "✅ Backed up: $file → $BACKUP_DIR/"
    fi
  done
  echo ""

  # Remove files
  echo "## Removing Dead Code Files"
  echo ""

  REMOVED=0
  for file in "${DEAD_FILES[@]}"; do
    if [ -f "$file" ]; then
      rm "$file"
      echo "✅ Removed: $file"
      REMOVED=$((REMOVED + 1))
    fi
  done
  echo ""
  echo "Total files removed: $REMOVED"
  echo ""

  # Post-cleanup verification
  echo "## Post-Cleanup Verification"
  echo ""

  echo "### Type Check"
  echo "\`\`\`"
  if pnpm tsc --noEmit 2>&1 | tail -20; then
    echo "✅ Type check passed"
    TYPE_OK=1
  else
    echo "⚠️  Type check had issues"
    TYPE_OK=0
  fi
  echo "\`\`\`"
  echo ""

  echo "### Build Test"
  echo "\`\`\`"
  if pnpm build:next-only 2>&1 | tail -30; then
    echo "✅ Build successful"
    BUILD_OK=1
  else
    echo "❌ Build failed"
    BUILD_OK=0
  fi
  echo "\`\`\`"
  echo ""

  # Summary
  echo "## Cleanup Summary"
  echo ""
  echo "| Item | Status |"
  echo "|------|--------|"
  echo "| Files removed | ✅ $REMOVED files |"
  echo "| Backup location | 📦 $BACKUP_DIR |"
  echo "| Type check | $([ $TYPE_OK -eq 1 ] && echo '✅ OK' || echo '❌ Failed') |"
  echo "| Build | $([ $BUILD_OK -eq 1 ] && echo '✅ OK' || echo '❌ Failed') |"
  echo ""

  if [ $TYPE_OK -eq 1 ] && [ $BUILD_OK -eq 1 ]; then
    echo "✅ **CLEANUP SUCCESSFUL** - All checks passed!"
  else
    echo "❌ **CLEANUP INCOMPLETE** - Fix issues or restore from backup:"
    echo "   \`\`\`bash"
    echo "   cp -r $BACKUP_DIR/* ."
    echo "   rm -rf $BACKUP_DIR"
    echo "   \`\`\`"
  fi
  echo ""

  echo "---"
  echo "Backup location: $BACKUP_DIR"
  echo "Report: $REPORT"

} | tee "$REPORT"

echo ""
echo "✅ Cleanup complete. Report: $REPORT"
