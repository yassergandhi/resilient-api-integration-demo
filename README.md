# Huhugerman - Customer Success Engineering Demo

A React-based German learning application designed to demonstrate **Implementation Engineering** and **Technical Troubleshooting** skills.

Unlike standard portfolio projects, this repository simulates a real-world integration environment with network latency, random API failures, and diagnostic tooling.

## 🚀 Key Features (CSE Focus)

* **Simulated SDK/API Layer:** `lessonApi.ts` mimics a real backend with variable latency and random HTTP 401/500 errors.
* **Resilient UI:** Handles loading states, error boundaries, and provides user-facing retry mechanisms.
* **Integration Debugging:** Exposes internal request IDs (`req_...`) and status codes in the UI to facilitate support tickets.
* **Operational Documentation:** Includes a standard operating procedure (SOP) for handling errors.

## 🛠️ Tech Stack
* React 18 + TypeScript
* Vite
* TailwindCSS (styling)

## 🏃‍♂️ Quick Start

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the simulation:**
    ```bash
    npm run dev
    ```

3.  **Test the Troubleshooting flow:**
    * Open the app in your browser.
    * Reload the page multiple times.
    * Approximately 20% of requests will fail intentionally.
    * Use the **"Integration Debug"** panel and the **TROUBLESHOOTING.md** guide to diagnose the "error".

## 📚 Documentation

For detailed error analysis and fix procedures, please refer to:
👉 **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**

---
*Created by Yasser Gandhi - Implementation Engineer / CSE Candidate*