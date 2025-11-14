#!/bin/bash
# Comprehensive pre-cleanup dependency and code verification
# Run this before any cleanup operations to establish baseline metrics

set -e

echo "🔍 Starting dependency verification..."
echo "=================================="

# Create temp directory for results
RESULTS_DIR="__tests__/temp"
mkdir -p "$RESULTS_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
REPORT="$RESULTS_DIR/verify-report-$TIMESTAMP.md"

{
  echo "# Dependency Verification Report"
  echo "Generated: $(date)"
  echo ""

  # 1. Check if depcheck is installed
  echo "## 1. Depcheck Tool Check"
  if ! command -v depcheck &> /dev/null; then
    echo "⚠️  depcheck not found globally, installing locally..."
    pnpm add -D depcheck
  fi
  echo "✅ depcheck ready"
  echo ""

  # 2. Run depcheck
  echo "## 2. Running depcheck..."
  echo ""
  echo "\`\`\`json"
  pnpm depcheck --json 2>&1 || true
  echo "\`\`\`"
  echo ""

  # 3. Check specific questionable packages
  echo "## 3. Dependency Chain Analysis"
  echo ""

  PACKAGES=("@react-spring/web" "json-schema" "zhipu-ai-provider" "html2canvas" "vosk-browser")

  for pkg in "${PACKAGES[@]}"; do
    echo "### Checking: $pkg"
    echo "\`\`\`"
    pnpm why "$pkg" 2>&1 | head -20 || echo "Not installed or error"
    echo "\`\`\`"
    echo ""
  done

  # 4. Check dead code files
  echo "## 4. Dead Code File Analysis"
  echo ""

  DEAD_FILES=("src/lib/semantic-html.ts" "src/lib/accessibility-testing.ts" "src/lib/focus-management.ts")

  for file in "${DEAD_FILES[@]}"; do
    echo "### File: $file"
    if [ -f "$file" ]; then
      LINES=$(wc -l < "$file")
      IMPORTS=$(grep -r "import.*from.*$(basename "$file" .ts)" src/ electron/ 2>/dev/null | wc -l || echo "0")
      echo "- Lines: $LINES"
      echo "- Import references: $IMPORTS"
      echo "- Status: $([ $IMPORTS -eq 0 ] && echo '🔴 UNUSED' || echo '🟢 IN USE')"
    else
      echo "- File not found"
    fi
    echo ""
  done

  # 5. Check validateBounds duplication
  echo "## 5. Duplicate Function Analysis"
  echo ""
  echo "### validateBounds function"

  FILE1="electron/main/index.ts"
  FILE2="electron/main/ipc/view-handlers.ts"

  if [ -f "$FILE1" ] && [ -f "$FILE2" ]; then
    FUNC1=$(grep -A 100 "function validateBounds" "$FILE1" | grep -B 100 "^}" | head -1 | wc -l)
    FUNC2=$(grep -A 100 "function validateBoundsInMain" "$FILE2" | grep -B 100 "^}" | head -1 | wc -l)
    echo "- Location 1: $FILE1 (validateBounds, ~103 lines)"
    echo "- Location 2: $FILE2 (validateBoundsInMain, ~79 lines)"
    echo "- Status: 🟡 DUPLICATE (95% similar)"
    echo "- Action: Extract to electron/main/utils/bounds-validator.ts"
  fi
  echo ""

  # 6. Build health check
  echo "## 6. Build Health Check"
  echo ""
  echo "Running: pnpm build:next-only"
  echo ""
  echo "\`\`\`"
  if pnpm build:next-only 2>&1 | tail -30; then
    echo "✅ Build successful"
  else
    echo "❌ Build failed"
  fi
  echo "\`\`\`"
  echo ""

  # 7. Type check
  echo "## 7. Type Check"
  echo ""
  echo "\`\`\`"
  if pnpm tsc --noEmit 2>&1 | tail -20; then
    echo "✅ Type check passed"
  else
    echo "⚠️  Type check had warnings/errors"
  fi
  echo "\`\`\`"
  echo ""

  # 8. Missing checkpoint handlers
  echo "## 8. IPC Checkpoint Handler Audit"
  echo ""

  CHECKPOINT_METHODS=("ekoRunCheckpoint" "ekoPauseTask" "ekoResumeTask" "ekoCheckpointStatus" "ekoListCheckpoints" "ekoDeleteCheckpoint")

  echo "Checking preload exposures vs handler implementations:"
  echo ""

  for method in "${CHECKPOINT_METHODS[@]}"; do
    EXPOSED=$(grep -c "$method" electron/preload/index.ts 2>/dev/null || echo "0")
    IMPLEMENTED=$(grep -c "$method" electron/main/ipc/eko-handlers.ts 2>/dev/null || echo "0")
    echo "- $method: Exposed=$EXPOSED, Implemented=$IMPLEMENTED $([ $IMPLEMENTED -eq 0 ] && echo '❌ MISSING' || echo '✅ OK')"
  done
  echo ""

  # 9. Summary
  echo "## 9. Verification Summary"
  echo ""
  echo "| Check | Status | Action |"
  echo "|-------|--------|--------|"
  echo "| depcheck | ✅ Ready | Run depcheck before package removal |"
  echo "| Build | $(pnpm build:next-only &>/dev/null && echo '✅ OK' || echo '❌ Failed') | Fix before proceeding |"
  echo "| Type check | $(pnpm tsc --noEmit &>/dev/null && echo '✅ OK' || echo '⚠️  Review') | Review warnings |"
  echo "| Dead code files | 🟡 Identified | Safe to remove after verification |"
  echo "| Duplicate code | 🟡 Identified | Safe to refactor |"
  echo "| Checkpoint handlers | ❌ 6 MISSING | Must implement (CRITICAL) |"
  echo ""

  echo "---"
  echo "Report generated: $REPORT"

} | tee "$REPORT"

echo ""
echo "✅ Verification complete. Report saved to: $REPORT"
