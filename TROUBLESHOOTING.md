# 🔧 Troubleshooting Guide: Huhugerman API Integration

## Overview
This document is intended for Implementation Engineers and Support staff. It outlines common integration issues encountered when connecting the `LessonView` component to the simulated `lessonApi`.

The API currently simulates real-world network conditions, including:
* **Latency:** 300ms - 1500ms variable delay.
* **Chaos Engineering:** 20% random failure rate (401 Unauthorized, 500 Internal Error).

## Diagnostic Workflow
When a user reports an issue ("The lesson won't load"), follow these steps:

1.  **Reproduce:** Refresh the page.
2.  **Observe:** Look at the "Integration Debug" panel at the bottom of the error screen.
3.  **Analyze:** Compare the `STATUS` code with the table below.

## Common Error Codes & Fixes

### 🔴 401 Unauthorized
* **Symptom:** User sees an error screen immediately. Debug panel shows `STATUS: 401`.
* **Root Cause:** The simulated session token is missing or invalid.
* **Resolution:**
    1.  Check the `Authorization` header simulation in `lessonApi.ts`.
    2.  **User Action:** Click the **"Retry"** button. The simulation logic will generate a fresh request ID and likely succeed on the next attempt.

### 🔴 500 Internal Server Error
* **Symptom:** Generic "System Error" message. Debug panel shows `STATUS: 500`.
* **Root Cause:** Upstream service failure (Database timeout simulated).
* **Resolution:**
    1.  Capture the `REQ_ID` from the debug panel (e.g., `req_x9s8d7`).
    2.  Check backend logs for this specific trace ID.
    3.  **User Action:** Wait 5 seconds and click **"Retry"**.

### 🟡 High Latency (>1000ms)
* **Symptom:** Spinner stays visible for more than 1 second.
* **Analysis:** This is expected behavior under high load simulations.
* **Action:** No action needed unless latency exceeds 5000ms consistently.

## Escalation Path
If issues persist after 3 retry attempts, escalate to the Engineering team with the following template:

> **Component:** LessonView / lessonApi
> **Issue:** Persistent load failure
> **Trace ID:** [Insert REQ_ID from Debug Panel]
> **Status Code:** [Insert STATUS]