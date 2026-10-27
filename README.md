# Smart Healthcare Project Management System

A functional React + Node.js/Express + MongoDB project management application designed around the provided five-hospital healthcare case study.

## Features
- Project charter, objectives, stakeholders, scope, budget and deadline
- Requirements with priority/status and approved-scope control
- WBS/activity schedule with dependencies and Gantt-style timeline
- Change requests with cost/schedule impact and approval
- EVM: PV, EV, AC, CPI and SPI
- Cost/schedule warning thresholds
- Defect tracking with severity and resolution status
- Risk prioritization matrix score and PDPC-style response view
- Integrated dashboard
- Persistent MongoDB records
- Validation and API test cases

## Case-study scenario
Approved budget: PKR 5,000,000
Original duration: 16 weeks
Change request: AI preliminary diagnosis + mobile app
Change impact: +PKR 800,000 and +3 weeks
Critical defects: appointment scheduling and patient record management

## Run
### 1. MongoDB
Install/start MongoDB locally.

### 2. Backend
```bash
cd backend
npm install
copy .env.example .env
npm start
```
API: http://localhost:5000

### 3. Frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in terminal (normally http://localhost:5173).

## Seed data
After starting MongoDB, run:
```bash
cd backend
node seed.js
```
Then refresh the dashboard.

## Notes
The UI is intentionally straightforward for an academic demonstration. The backend exposes CRUD APIs for all major project records so the project can be extended with authentication, role-based permissions, full dependency scheduling/critical-path calculations and PDF reporting.
