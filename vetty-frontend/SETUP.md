# Quick Setup Guide

## Prerequisites
- Node.js 14+ and npm installed

## Installation & Run

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open browser
http://localhost:4200
```

4. Login with:
- Email: `admin@test.com`
- Password: `admin123`

## Features Implemented

Login page with authentication
Jira board with 4 columns (To Do, In Progress, Need Review, Completed)
Add task modal (click + button)
Drag & drop between columns (Angular CDK)
LocalStorage persistence
Modern UI matching reference design
Route guards for authentication
Clean, modular code structure

## Project Structure

- `src/app/components/` - All UI components
- `src/app/services/` - Business logic services
- `src/app/models/` - Data models
- `src/app/guards/` - Route guards

## Notes

- All data persists in browser localStorage
- Sample tasks are pre-loaded
- Drag & drop works seamlessly between columns
- Responsive design

