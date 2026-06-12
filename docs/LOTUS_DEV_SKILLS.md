# Lotus Academy: 30 Dev Skills for Shipping Projects

> A project that runs is better than a project that is perfect but broken.

## Phase 1: Foundation & Planning
1. **Scope Freezing** — Define what "done" looks like before writing code. No feature creep mid-flight.
2. **User-First Design** — Build for the person who just landed on your app, not for yourself.
3. **Tech Stack Literacy** — Know your dependencies, their versions, and their limitations before you commit.
4. **Environment Reproducibility** — Anyone should be able to clone, install, and run with one command.
5. **Incremental Architecture** — Start simple. Complex abstractions are paid for with debugging time.

## Phase 2: Code Quality
6. **Type Safety Discipline** — Treat TypeScript errors as blockers, not suggestions.
7. **Defensive Coding** — Assume APIs fail, users misclick, and data is malformed.
8. **Single Responsibility** — One component, one function, one job.
9. **Readable Naming** — Code is read 10x more than it is written. Name things for clarity.
10. **Minimal Changes** — The smallest correct fix is usually the best fix.

## Phase 3: Integration & Flow
11. **End-to-End Thinking** — A feature is not done until a user can complete the full journey.
12. **State Management Hygiene** — Know where your data lives and who can change it.
13. **Route Logic Mastery** — Navigation should feel intuitive, not like a maze.
14. **Form Handling** — Validate early, give clear errors, and celebrate success.
15. **Progress Persistence** — Users should never lose their place when they refresh.

## Phase 4: Content & Data
16. **Structured Content** — Separate data from presentation. Use typed data files.
17. **Scalable Data Patterns** — Design your data shapes so adding item #100 is trivial.
18. **Mock-to-Real Gradients** — Build with demo data that gracefully upgrades to live data.
19. **Content Curation** — More content is not better. Curated, leveled content is.
20. **Search & Filter UX** — If you have more than 10 items, users need a way to find them.

## Phase 5: Polish & Accessibility
21. **Visual Consistency** — One design language across every screen.
22. **Responsive Awareness** — Layouts should not break on common screen sizes.
23. **Color Psychology** — Use color to guide, not just to decorate.
24. **Microcopy Mastery** — Buttons, labels, and empty states are opportunities to delight.
25. **Accessibility Baseline** — Labels, contrast, and keyboard navigation are non-negotiable.

## Phase 6: Testing & Shipping
26. **Build-First Verification** — Run the build after every significant change.
27. **Smoke Testing** — Click through the main user paths before calling it done.
28. **Error Boundary Strategy** — When things break, the app should degrade gracefully.
29. **Performance Budgeting** — Ship fast. Optimize only what users actually feel.
30. **Ship Mentality** — A running app with 80% of features beats a broken app with 100%.

---

## Application to Lotus Academy

These skills translate directly into the following implementation tasks:

- **Skill #2 (User-First)** + **Skill #24 (Microcopy)**: Rewrite all copy to be welcoming, gender-neutral, and beginner-friendly.
- **Skill #1 (Scope Freeze)** + **Skill #11 (End-to-End)**: Add a "Beginner's Path" feature that guides new users through OS 101 → First Lab → Mentor.
- **Skill #15 (Progress Persistence)** + **Skill #19 (Curation)**: Add a dashboard progress tracker and reorder labs by difficulty.
- **Skill #21 (Visual Consistency)**: Unify the dark/light mode split between LotusAcademy and the rest of the app.
- **Skill #26 (Build-First)** + **Skill #27 (Smoke Testing)**: Ensure `npm run build` passes and all routes render without crashes.
