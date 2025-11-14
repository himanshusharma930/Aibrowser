#!/bin/bash
# Master Automation Runner - Orchestrates all cleanup phases
# Usage: ./run-cleanup.sh [verify|cleanup-dead-code|dedup|scaffold|full]

set -e

RESULTS_DIR="__tests__/temp"
mkdir -p "$RESULTS_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
MASTER_REPORT="$RESULTS_DIR/master-cleanup-$TIMESTAMP.md"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
  echo -e "${BLUE}================================${NC}"
  echo -e "${BLUE}$1${NC}"
  echo -e "${BLUE}================================${NC}"
}

print_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
  echo -e "${RED}❌ $1${NC}"
}

show_usage() {
  cat << EOF
Usage: ./scripts/run-cleanup.sh [PHASE]

PHASES:
  verify            - Verify dependencies and identify issues (SAFE - read-only)
  cleanup-dead-code - Remove semantic-html.ts and accessibility-testing.ts
  dedup             - De-duplicate validateBounds function
  scaffold          - Generate checkpoint handlers scaffold
  full              - Run all phases sequentially

EXAMPLES:
  ./scripts/run-cleanup.sh verify
  ./scripts/run-cleanup.sh cleanup-dead-code
  ./scripts/run-cleanup.sh full

EOF
}

# Start master report
{
  echo "# Master Cleanup Execution Report"
  echo "Generated: $(date)"
  echo "Timestamp: $TIMESTAMP"
  echo ""
  echo "## Phases"
  echo ""

  # Determine which phases to run
  PHASE="${1:-full}"
  case "$PHASE" in
    verify)
      PHASES=("verify")
      ;;
    cleanup-dead-code)
      PHASES=("cleanup-dead-code")
      ;;
    dedup)
      PHASES=("dedup")
      ;;
    scaffold)
      PHASES=("scaffold")
      ;;
    full)
      PHASES=("verify" "cleanup-dead-code" "dedup" "scaffold")
      ;;
    --help|-h)
      show_usage
      exit 0
      ;;
    *)
      print_error "Unknown phase: $PHASE"
      show_usage
      exit 1
      ;;
  esac

  print_header "CLEANUP AUTOMATION RUNNER"
  echo ""
  echo "Phases to execute: ${PHASES[@]}"
  echo "Results directory: $RESULTS_DIR"
  echo ""

  # Track execution
  FAILED_PHASES=()
  PASSED_PHASES=()

  # Phase 1: Verify
  if [[ " ${PHASES[@]} " =~ " verify " ]]; then
    print_header "PHASE 1: Dependency Verification"

    if bash scripts/verify-dependencies.sh >> "$MASTER_REPORT" 2>&1; then
      print_success "Verification completed"
      PASSED_PHASES+=("verify")
      echo "verify: ✅ PASSED" >> "$MASTER_REPORT"
    else
      print_error "Verification failed"
      FAILED_PHASES+=("verify")
      echo "verify: ❌ FAILED" >> "$MASTER_REPORT"
    fi
    echo ""
  fi

  # Phase 2: Dead Code Cleanup
  if [[ " ${PHASES[@]} " =~ " cleanup-dead-code " ]]; then
    print_header "PHASE 2: Dead Code Cleanup"

    if [ ${#FAILED_PHASES[@]} -eq 0 ]; then
      print_warning "Starting dead code cleanup (destructive operation)"
      echo ""
      read -p "Continue? (y/N) " -n 1 -r
      echo
      if [[ $REPLY =~ ^[Yy]$ ]]; then
        if bash scripts/cleanup-dead-code.sh >> "$MASTER_REPORT" 2>&1; then
          print_success "Dead code cleanup completed"
          PASSED_PHASES+=("cleanup-dead-code")
          echo "cleanup-dead-code: ✅ PASSED" >> "$MASTER_REPORT"
        else
          print_error "Dead code cleanup failed"
          FAILED_PHASES+=("cleanup-dead-code")
          echo "cleanup-dead-code: ❌ FAILED" >> "$MASTER_REPORT"
        fi
      else
        print_warning "Cleanup skipped"
        echo "cleanup-dead-code: ⊘ SKIPPED" >> "$MASTER_REPORT"
      fi
    else
      print_error "Skipping cleanup due to verification failures"
      FAILED_PHASES+=("cleanup-dead-code")
      echo "cleanup-dead-code: ⊘ SKIPPED (verification failed)" >> "$MASTER_REPORT"
    fi
    echo ""
  fi

  # Phase 3: De-duplication
  if [[ " ${PHASES[@]} " =~ " dedup " ]]; then
    print_header "PHASE 3: De-duplication"

    if bash scripts/dedup-bounds.sh >> "$MASTER_REPORT" 2>&1; then
      print_success "De-duplication preparation completed"
      print_warning "Manual steps required - see report"
      PASSED_PHASES+=("dedup")
      echo "dedup: ✅ PREPARED (manual steps required)" >> "$MASTER_REPORT"
    else
      print_error "De-duplication preparation failed"
      FAILED_PHASES+=("dedup")
      echo "dedup: ❌ FAILED" >> "$MASTER_REPORT"
    fi
    echo ""
  fi

  # Phase 4: Scaffold Generation
  if [[ " ${PHASES[@]} " =~ " scaffold " ]]; then
    print_header "PHASE 4: Checkpoint Handlers Scaffold"

    if bash scripts/generate-checkpoint-scaffold.sh >> "$MASTER_REPORT" 2>&1; then
      print_success "Checkpoint handlers scaffold generated"
      print_warning "Implementation required - 3-5 hours estimated"
      PASSED_PHASES+=("scaffold")
      echo "scaffold: ✅ GENERATED (implementation required)" >> "$MASTER_REPORT"
    else
      print_error "Scaffold generation failed"
      FAILED_PHASES+=("scaffold")
      echo "scaffold: ❌ FAILED" >> "$MASTER_REPORT"
    fi
    echo ""
  fi

  # Summary
  print_header "EXECUTION SUMMARY"
  echo ""
  echo "Phases passed: ${#PASSED_PHASES[@]}"
  echo "Phases failed: ${#FAILED_PHASES[@]}"
  echo ""

  if [ ${#PASSED_PHASES[@]} -gt 0 ]; then
    print_success "Completed phases:"
    for phase in "${PASSED_PHASES[@]}"; do
      echo "  ✅ $phase"
    done
    echo ""
  fi

  if [ ${#FAILED_PHASES[@]} -gt 0 ]; then
    print_error "Failed phases:"
    for phase in "${FAILED_PHASES[@]}"; do
      echo "  ❌ $phase"
    done
    echo ""
  fi

  echo "📊 Master Report: $MASTER_REPORT"
  echo ""

  # Overall status
  if [ ${#FAILED_PHASES[@]} -eq 0 ]; then
    print_success "ALL PHASES COMPLETED SUCCESSFULLY"
  else
    print_error "SOME PHASES FAILED - Review report"
  fi

} | tee "$MASTER_REPORT"

echo ""
echo "Report saved to: $MASTER_REPORT"
