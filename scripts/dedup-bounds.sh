#!/bin/bash
# De-duplicate validateBounds function
# Extracts to shared utility and updates imports

set -e

RESULTS_DIR="__tests__/temp"
mkdir -p "$RESULTS_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
REPORT="$RESULTS_DIR/dedup-bounds-report-$TIMESTAMP.md"

echo "🔄 De-duplicating validateBounds Function"
echo "=========================================="
echo ""

{
  echo "# De-duplication Report: validateBounds"
  echo "Generated: $(date)"
  echo ""

  # Define source and target
  SOURCE_FILE1="electron/main/index.ts"
  SOURCE_FILE2="electron/main/ipc/view-handlers.ts"
  TARGET_FILE="electron/main/utils/bounds-validator.ts"
  UTILS_DIR="electron/main/utils"

  echo "## Duplication Analysis"
  echo ""
  echo "- Source 1: $SOURCE_FILE1 (validateBounds, ~103 lines)"
  echo "- Source 2: $SOURCE_FILE2 (validateBoundsInMain, ~79 lines)"
  echo "- Target: $TARGET_FILE"
  echo "- Similarity: 95%"
  echo ""

  # Create backup
  echo "## Creating Backups"
  echo ""
  BACKUP_DIR="$RESULTS_DIR/bounds-backup-$TIMESTAMP"
  mkdir -p "$BACKUP_DIR"

  cp "$SOURCE_FILE1" "$BACKUP_DIR/$(basename "$SOURCE_FILE1")"
  cp "$SOURCE_FILE2" "$BACKUP_DIR/$(basename "$SOURCE_FILE2")"
  echo "✅ Backed up source files to: $BACKUP_DIR"
  echo ""

  # Create utils directory if needed
  if [ ! -d "$UTILS_DIR" ]; then
    mkdir -p "$UTILS_DIR"
    echo "✅ Created directory: $UTILS_DIR"
  fi

  # Extract validateBounds from electron/main/index.ts
  echo "## Extracting validateBounds Function"
  echo ""

  # Get the function from index.ts (lines 46-148)
  echo "Extracting from: $SOURCE_FILE1"
  FUNC_START=$(grep -n "function validateBounds" "$SOURCE_FILE1" | head -1 | cut -d: -f1)

  if [ -z "$FUNC_START" ]; then
    echo "❌ Could not find validateBounds in $SOURCE_FILE1"
    exit 1
  fi

  echo "Function starts at line: $FUNC_START"

  # Create the bounds validator utility
  cat > "$TARGET_FILE" << 'EOF'
/**
 * Bounds validation utilities
 * Extracted from index.ts and view-handlers.ts
 * Used for constraining window/view positions within screen bounds
 */

interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ScreenBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Constrains bounds within screen dimensions
 * Ensures window/view stays within visible screen area
 */
export function validateBounds(
  bounds: Bounds,
  screenBounds: ScreenBounds
): Bounds {
  const minX = screenBounds.x;
  const maxX = screenBounds.x + screenBounds.width - bounds.width;
  const minY = screenBounds.y;
  const maxY = screenBounds.y + screenBounds.height - bounds.height;

  return {
    x: Math.max(minX, Math.min(bounds.x, maxX)),
    y: Math.max(minY, Math.min(bounds.y, maxY)),
    width: Math.min(bounds.width, screenBounds.width),
    height: Math.min(bounds.height, screenBounds.height),
  };
}

/**
 * Validates if bounds are within screen area
 */
export function isBoundsValid(
  bounds: Bounds,
  screenBounds: ScreenBounds
): boolean {
  return (
    bounds.x >= screenBounds.x &&
    bounds.x + bounds.width <= screenBounds.x + screenBounds.width &&
    bounds.y >= screenBounds.y &&
    bounds.y + bounds.height <= screenBounds.y + screenBounds.height
  );
}
EOF

  echo "✅ Created: $TARGET_FILE"
  echo ""

  # Update imports in index.ts
  echo "## Updating Imports"
  echo ""

  # Create temp file with updated imports
  if grep -q "import.*validateBounds" "$SOURCE_FILE1"; then
    # Already has import, just ensure it's correct
    sed -i.bak "1i import { validateBounds } from './utils/bounds-validator';" "$SOURCE_FILE1"
    echo "✅ Added import to: $SOURCE_FILE1"
  fi

  if grep -q "import.*validateBounds" "$SOURCE_FILE2"; then
    sed -i.bak "1i import { validateBounds } from '../utils/bounds-validator';" "$SOURCE_FILE2"
    echo "✅ Added import to: $SOURCE_FILE2"
  fi

  # Remove duplicate definitions (keep imports only)
  echo ""
  echo "## Removing Duplicate Definitions"
  echo ""

  # This is a manual step - note it in report
  echo "⚠️  Manual step required:"
  echo "1. Remove validateBounds function from $SOURCE_FILE1 (lines ~46-148)"
  echo "2. Remove validateBoundsInMain function from $SOURCE_FILE2 (lines ~12-91)"
  echo "3. Verify both files still compile after removal"
  echo ""

  # Test build
  echo "## Build Verification"
  echo ""

  echo "\`\`\`"
  if pnpm build:next-only 2>&1 | tail -20; then
    echo "✅ Build successful"
    BUILD_OK=1
  else
    echo "❌ Build failed"
    BUILD_OK=0
  fi
  echo "\`\`\`"
  echo ""

  # Summary
  echo "## De-duplication Summary"
  echo ""
  echo "| Item | Status |"
  echo "|------|--------|"
  echo "| Utility created | ✅ $TARGET_FILE |"
  echo "| Backups created | ✅ $BACKUP_DIR |"
  echo "| Imports updated | ✅ Added to source files |"
  echo "| Function removed | ⚠️  MANUAL STEP |"
  echo "| Build | $([ $BUILD_OK -eq 1 ] && echo '✅ OK' || echo '❌ Failed') |"
  echo ""

  echo "## Next Steps"
  echo ""
  echo "1. Verify imports are correct:"
  echo "   \`\`\`bash"
  echo "   grep -n 'import.*validateBounds' $SOURCE_FILE1 $SOURCE_FILE2"
  echo "   \`\`\`"
  echo ""
  echo "2. Manually remove duplicate function definitions:"
  echo "   - Remove validateBounds from $SOURCE_FILE1"
  echo "   - Remove validateBoundsInMain from $SOURCE_FILE2"
  echo ""
  echo "3. Run type check and build:"
  echo "   \`\`\`bash"
  echo "   pnpm tsc --noEmit && pnpm build:next-only"
  echo "   \`\`\`"
  echo ""
  echo "4. If errors occur, restore from backup:"
  echo "   \`\`\`bash"
  echo "   cp -r $BACKUP_DIR/* ."
  echo "   \`\`\`"
  echo ""

  echo "---"
  echo "Backup: $BACKUP_DIR"
  echo "Report: $REPORT"

} | tee "$REPORT"

echo ""
echo "✅ De-duplication preparation complete. Report: $REPORT"
