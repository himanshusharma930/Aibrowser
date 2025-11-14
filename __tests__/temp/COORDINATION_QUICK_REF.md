# PROJECT COORDINATION - QUICK REFERENCE

## DECISION TREE: WHICH STRATEGY FOR YOUR TEAM?

```
1 Developer:  13-19 days sequential
2 Developers: 8-12 days (40% faster) ✅ RECOMMENDED
3+ Developers: 5-7 days (60% faster)
```

## RESOURCE ALLOCATION

| Team Size | Timeline | Parallelization | Best For |
|-----------|----------|-----------------|----------|
| 1 dev | 13-19 days | None | MVP/Startup |
| 2 devs | 8-12 days | 40% | Production |
| 3+ devs | 5-7 days | 60% | Enterprise |

## RISK MATRIX (Mitigation Strategies)

**High Impact + Medium Probability**:
- Risk 3 (UI scope creep): Design review gate Day 4, lock scope
- Risk 2 (Type audit): Pre-scan files, allocate 6h buffer

**Medium Impact + Medium Probability**:
- Risk 5 (Integration breaks): Daily PR reviews, interface contracts
- Risk 4 (Perf issues): Benchmark first, have rollback plan

**Low Impact/Probability**:
- Risks 1, 6, T1-T3: Monitor but manageable

## CONTINGENCY THRESHOLDS

**Yellow Light** (Warning - Adjust Plan):
- 1-2 hours behind schedule
- 90-95% tests passing
- Code reviews 4-8 hours behind
- One blocker >2 hours

**Red Light** (Emergency - Escalate):
- 3+ hours behind schedule
- <85% tests passing
- Multiple blockers >2 hours
- Build failures

## ESCALATION PATH

**If Stuck >30 minutes:**
1. Self-help (docs, debug) → 30 min
2. Pair programming → 30-60 min
3. Context switch + async follow-up → continue working

**If Stuck >2 hours:**
- Switch to different task
- Document in GitHub issue
- Escalate to stakeholder for timeline impact

## DAILY RHYTHM

```
9:00 AM   Standup (15 min)
9:15 AM   Deep work (3.75 hrs) - no interruptions
1:00 PM   Lunch (1 hr, code reviews happen)
2:00 PM   Deep work (3.75 hrs)
5:00 PM   End-of-day summary (10 min) - PRs, blockers
```

## GATE CRITERIA (Phase-End Checkpoints)

**Every phase must:**
- [ ] All tasks completed
- [ ] Code reviewed and merged
- [ ] Tests passing (phase-specific gates)
- [ ] Documentation updated
- [ ] Zero blockers for next phase

**No partial passes** - Gates are PASS or FAIL

## RECOMMENDED TEAM STRUCTURE (2 Devs)

**Developer A (Backend/Architecture)**:
- Phase 1: Critical Fixes (4 hrs)
- Phase 2: Architecture Foundation (42 hrs)
- Phase 3: Performance (29 hrs)
- Phase 5: Unit & Integration Tests (20 hrs)

**Developer B (Frontend/UI)**:
- Phase 4: UI/UX Modernization (90 hrs)
- Phase 5: E2E & Accessibility Tests (13 hrs)

## TIMELINE (2-Developer Strategy)

```
Day 1-2:  Phase 1 (Critical Fixes) - 4h
Day 3-6:  Phase 2 (A) | Phase 4 (B) - Parallel
Day 6-8:  Phase 3 (A) | Phase 4 (B) - Parallel
Day 10-12: Phase 5 (Both) - Joint testing
Day 13-14: Phase 6 (Both) - Documentation + polish
```

## SUCCESS METRICS

| Metric | Target |
|--------|--------|
| Timeline | 8-12 days |
| Backend Coverage | >80% |
| Frontend Coverage | >75% |
| Test Pass Rate | 100% |
| Bundle Size | <500KB (gzipped) |
| WCAG 2.1 AA | 0 violations |
| Screenshot Load | <500ms first, <100ms cached |

## CODE REVIEW WORKFLOW

1. Create PR with description + test verification
2. Other dev reviews within 4 hours (target)
3. Request changes or approve
4. Self-merge after approval (no blocking)
5. Monitor build pipeline

**Target Turnaround**: <4 hours (same day)

## FREQUENTLY ASKED QUESTIONS

**Q: Can we skip Phase 1?**
A: NO - runtime crashes if skipped

**Q: What if Phase 4 UI takes longer?**
A: Dev A helps with component implementation, Phase 5 slides 1-2 days

**Q: What if Phase 5 tests fail extensively?**
A: Triage critical/nice-to-have. Fix critical (1 day), defer nice-to-have to Phase 7

**Q: How do we prevent scope creep?**
A: Scope lock at Day 2. Changes = Phase 7 backlog items

**Q: What if we need to hotfix production bug?**
A: <2h fixes OK (rebase). >2h = defer to after refactor

**Q: Minimum team size?**
A: 1 developer (13-19 days). Not recommended but possible

**Q: Optimal team size?**
A: 2 developers (8-12 days, best ROI). 3+ adds coordination overhead

## STANDBY STATUS (When Waiting for Other Dev)

If you're waiting for another dev (blocked):
1. Don't wait idle - switch to different task
2. Leave async comment on PR/issue
3. Continue working on backlog items
4. Check back in 30-60 minutes

Never hard-block on another dev. Always have parallel work ready.

## METRICS TO TRACK DAILY

- Planned vs. actual hours completed
- Blockers encountered and resolution time
- Code review turnaround (target: <4h)
- Test pass rate (target: >95%)
- Build time (track for regressions)

## DECISION CHECKLIST (Before Phase 1 Starts)

- [ ] Team size confirmed (recommend 2)
- [ ] Devs read CLAUDE.md and coordination plan
- [ ] Daily standup scheduled (9 AM)
- [ ] Feature branches created (refactor/*)
- [ ] Code review process agreed
- [ ] GitHub milestones created
- [ ] Build pipeline tested
- [ ] Baseline performance measured
- [ ] Go/No-Go decision made

---

**Print and display this document during refactor**
**Update timeline and metrics as project progresses**
