# resilient-api-integration-demo

Chaos engineering diagnostic trainer for SaaS support workflows.

> "If you cannot reproduce the error, you cannot resolve it."

**Status:** ACTIVE DEMO · Diagnostic environment · Recruiter-facing  
**Live demo:** [huhugerman-demo-cse.netlify.app](https://huhugerman-demo-cse.netlify.app)  
**Stack:** React · TypeScript · Tailwind CSS · Chaos Engineering patterns

---

## What This Repository Solves

In SaaS support, the problem is not that production errors are hard to resolve — it is that they are hard to reproduce. Customers report "something doesn't work" without logs, traces, or context. Support teams lack backend access. Engineering teams lack time to investigate every ticket.

A senior engineer needs to:

1. Reproduce the error in a controlled environment
2. Identify the failure type without backend access
3. Document it with sufficient context for L2 escalation
4. Propose an immediate solution or workaround

This demo is a trainer for that workflow.

---

## The Real Origin: huhuGERMAN Production

The huhuGERMAN platform has operated with real students at UAM Azcapotzalco since 2011. The lesson-loading module experienced these failures in production: 401 token expirations, 500 upstream timeouts, 404 resource misconfigurations, variable latency from Mexico City to Germany.

This demo isolates that module, instruments it with explicit observability, and converts it into a controlled diagnostic environment. The failure patterns are not hypothetical — they are the distillation of real errors that affected real users, resolved and documented across multiple trimesters.

---

## How Chaos Injection Works

The `lessonApi.ts` module implements three controlled failure scenarios:
```typescript
// Scenario A: Critical upstream failure (simulates database timeout)
// Status 500 · Structured error message · L2 escalation guidance
{
  status: 500,
  error: "Internal Server Error: Upstream service unavailable",
  requestId: generateRequestId(),
  suggestion: "Check database connection pool. If persistent >2min, escalate to L2."
}

// Scenario B: Session expiration / authentication failure
// Status 401 · Client remediation pathway
{
  status: 401,
  error: "Authentication token expired",
  requestId: generateRequestId(),
  suggestion: "Refresh token or re-authenticate. Common in mobile sessions idle >24h."
}

// Scenario C: Client configuration error
// Status 404 · Indicates where the problem lives
{
  status: 404,
  error: "Lesson not found",
  requestId: generateRequestId(),
  suggestion: "Verify lesson ID in course configuration. This is a client-side config issue, not backend."
}
```

20% of requests fail intentionally. This forces the system to demonstrate error handling, retry logic, and state communication under realistic failure rates.

---

## Observability as a First-Class Feature

Every request exposes:
```typescript
interface ApiResponse {
  data?: T;
  meta: {
    requestId: string;   // Traceable across sessions (Splunk / Datadog)
    latencyMs: number;   // Visible to support without backend access
    status: number;      // HTTP status exposed to frontend
  };
}

interface ApiError {
  status: number;
  error: string;
  requestId: string;
  suggestion: string;    // Concrete next action for L1 support
}
```

The `suggestion` field is the difference between an error message that generates a support ticket and one that enables independent resolution. A standard error response tells the engineer what happened. The `suggestion` tells them what to do next — in language that requires no backend access to interpret.

---

## Latency Jitter: Forcing Real Loading States
```typescript
// Simulates realistic network conditions
// Delay between 300ms and 1500ms, randomized
const delay = 300 + Math.random() * 1200;
await new Promise(resolve => setTimeout(resolve, delay));
```

This forces the frontend to demonstrate that loading states, spinners, and timeout handling work under variable latency — not just in the happy path. Mexico City to Frankfurt is not a localhost round-trip.

---

## H.U.H.U. Domain: Fully Typed
```typescript
interface Lesson {
  id: string;
  title: string;
  order: number;

  hochdeutsch: {
    phrases: Array
  };
  umgangssprache: {
    introText: string;
    phrases: Array
  };
  halt: {
    title: string;
    explanation: string;
    metaphor?: string;
  };
  uebung: MultipleChoiceExercise | FillInBlankExercise;
}
```

The `uebung` field uses a discriminated union: no exercise exists without a known type at compile time. No `any`. No implicit fallbacks. This is a requirement for a system that must be auditable as research instrumentation, not just as product code.

---

## Why This Demonstrates Senior-Level Engineering Thinking

A junior developer writes the happy path and hopes it works.  
A senior engineer instruments the failure paths — because that is where users create tickets.

**Proactive support thinking:** Errors are not exceptions — they are expected states that require explicit handling, useful messaging, and traceability.

**Observability as product:** `requestId` and `latencyMs` are not internal logs. They are data a support agent can use to diagnose without backend access. This is the difference between "I don't know what happened" and "Here is exactly what happened and what to do next."

**Separation of concerns:** The API module is replaceable. When the mock is swapped for the production API, UI components do not change. This is the contract that makes systems maintainable at scale.

**Documentation as executable code:** The `suggestion` field in `ApiError` is not a comment — it is information that reaches the user at error time. It is documentation that runs.

**Failure-first design:** A 20% intentional failure rate is not a bug. It is a feature that proves error handling works, not just that the happy path works.

---

## Quick Start
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build
```

To observe all three failure scenarios, reload the application 5–6 times. The 20% failure rate is randomized across scenario types.

---

## Related

→ **[huhugerman.com](https://huhugerman.com)** — Production system (input auténtico desde A1 · 2011→)  
→ **[huhugerman-mvp-notes](https://github.com/yassergandhi/huhugerman-mvp-notes)** — PRD, MVP contract, type definitions  
→ **[yassergandhi.dev](https://yassergandhi.dev)** — Professional portfolio

---

## About

**Yasser Gandhi Hernández Esquivel**

Learning Systems Architect · Germanista C1 · Senior Developer

The intersection this repo occupies: pedagogical domain expertise (15 years DaF, two UNAM theses, C1 Hochschule Offenburg 2019) + systems architecture (TypeScript, Astro, Supabase, GAS) + failure-first engineering discipline. The failure patterns in this demo are not invented — they are the residue of a production system that has served real students since 2011.

→ [yassergandhi.dev](https://yassergandhi.dev) · [LinkedIn](https://linkedin.com/in/yassergandhi)

---

*HIER DARFST DU FEHLER MACHEN.*