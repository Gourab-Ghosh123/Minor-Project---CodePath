# CODEPATH - Personalized DSA Learning & Assessment Platform 🌿

## Overview
**CodePath** is an academic Minor Project for undergraduate Computer Science. It addresses the core student challenge: *confusion over which topic to study and which coding problem to solve next*. 

By categorizing Data Structures and Algorithms (DSA) into specific **Career Domain Tracks** (Web Development, Data Science & ML, Software Development, and Beginner Noob-to-Pro), CodePath provides a structured path, live accuracy telemetry, **Stuck Topic Diagnostics 🪤**, and positive **Celebration & Encouragement 🎉🥳👏** with a friendly peer companion (**ByteBuddy 🌿**).

---

## Key System Features

### 1. Domain-Categorized Learning Paths 🛣️
- **💻 Software Development (SDE Canonical Track)**: Complete 11-stage canonical path from linear structures through advanced trees, graphs, and dynamic programming.
- **🌐 Web Developer Track**: Curated for frontend & backend engineers—focusing on hash lookups, call stacks, event loop queues, DOM tree hierarchies, and route dependency graphs.
- **📊 Data Science & ML Track**: Optimized for Data Scientists—matrices, vector operations, binary search spaces, decision trees, and DP optimization.
- **🌱 Beginner / Noob to Pro Track**: Gentle, zero-intimidation starting line with visual pointers, plate-stack intuition, and step-by-step guidance.

### 2. Topic-Wise & Series-Wise Practice 🎗️
- **Topic-Wise Breakdown**: Arrays, Strings, Two Pointers, Sliding Window, Linked List, Stack, Queue, Binary Search, Trees, Graphs, Dynamic Programming.
- **Practice Series Collections**:
  - *Zero to Hero Array Series*
  - *String Pattern Master Series*
  - *Pointers & Window Battle Series*
  - *Core Linear Structures Series*
  - *Binary Search Mastery Series*
  - *Hierarchical Tree Explorer Series*
  - *Dynamic Programming Decoded Series*

### 3. Stuck / Trapped Topic Diagnostic & Remedial Rescue 🪤
- Automatically identifies topics where student accuracy dips below 50% or where failed submissions accumulate.
- Diagnoses specific algorithmic traps (e.g. pointer boundary updates, off-by-one errors in binary search, recursion stack overflow).
- Recommends an immediate "Escape Warm-up" challenge to rebuild momentum.

### 4. Interactive 3-Tier Progressive Hints & Peer Advice 💡
- **Level 1**: Intuition & Mental Model (without spoiling the code).
- **Level 2**: Common Traps & Edge Cases (unhandled negatives, single-element arrays).
- **Level 3**: Step-by-Step Algorithm Pseudo-code & Dry Run.
- **Student Peer Tips**: Read and post real student advice and mental models.

### 5. Celebration & Encouragement System 🎉🥳👏
- Rewarding celebration modal with animated confetti on every `Accepted` submission.
- **Mastery XP** (+50 XP per problem) & active daily streak tracking.
- **Milestone Badges**: *First Step Taken 🌱*, *Streak Striker 🔥*, *Precision Coder 🎯*, *Topic Conqueror 🏆*, *Milestone Solver ⭐*.

### 6. Code Runner & Test Execution
- **Run Code**: Tests solution against visible sample cases with inputs, expected vs actual outputs, and execution time before official submission.
- **Submit Solution**: Evaluates syntax, algorithmic logic, time complexity, and memory usage.

---

## Technology Stack
- **Frontend**: React (Vite), TailwindCSS, Lucide Icons, React Router v7.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB / Embedded MongoMemoryServer (zero manual DB setup required).
- **Security**: JWT Authentication, bcrypt password hashing.

---

## Setup & Running Instructions

### 1. Install Dependencies
```bash
npm install
npm --prefix client install
```

### 2. Start Both Server & Client
```bash
npm run dev
```
- **Backend API**: `http://localhost:5000`
- **Frontend UI**: `http://localhost:5173`
- *Note:* The system automatically starts an in-memory MongoDB instance and auto-seeds all 17 core problems with hints, series, traps, and domain relevance if a local MongoDB service is not running.

---

## API Summary

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register student with name, email, password, and chosen domain |
| `POST` | `/api/auth/login` | Sign in student and issue JWT token |
| `GET` | `/api/auth/me` | Get current student profile |
| `PUT` | `/api/auth/profile` | Update profile name and active career domain |
| `GET` | `/api/dashboard` | Real-time mastery stats, stuck topics, badges, series, ByteBuddy quote |
| `GET` | `/api/roadmap?domain=...` | Domain-tailored roadmap stages and unlocked exercises |
| `GET` | `/api/problems` | Filter problem catalogue by domain, topic, difficulty, series, status |
| `GET` | `/api/problems/:id` | Full problem description, hints, traps, peer tips, submission history |
| `POST` | `/api/problems/:id/run` | Dry-run test runner executing against sample test cases |
| `POST` | `/api/problems/:id/tips` | Post a peer tip for fellow students |
| `POST` | `/api/submissions` | Submit code solution, calculate accuracy, award XP and badges |
| `GET` | `/api/progress` | Detailed topic-wise, series-wise, and stuck-topic telemetry |
