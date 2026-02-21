# SmartSchool ERP

Production-ready School ERP with Node.js/Express backend, Angular frontend, MySQL, Sequelize ORM, JWT auth, Swagger docs, and clean layered architecture.

## 1) Database Schema
- SQL schema: `docs/database-schema.sql`
- ER diagram: `docs/er-diagram.md`
- Sequelize models with paranoid soft delete and audit timestamps in `backend/models`.

## 2) Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### API docs
- Swagger UI: `http://localhost:5000/api/docs`

### Security
- Helmet
- CORS
- Rate limiting
- JWT auth middleware + RBAC middleware

## 3) Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 4) Integration flow
1. Login from Angular (`/auth/login`) to receive access + refresh tokens.
2. JWT interceptor injects bearer token to protected APIs.
3. Route guards enforce auth and role checks.

## 5) Deployment Guide

### Render (Backend)
1. Create new Web Service from repo.
2. Root directory: `backend`.
3. Build command: `npm install`.
4. Start command: `npm start`.
5. Set environment variables from `.env.example`.
6. Add managed MySQL or external MySQL credentials.

### Vercel (Frontend)
1. Import repo into Vercel.
2. Root directory: `frontend`.
3. Build command: `npm run build`.
4. Output directory: `dist/smartschool-erp-frontend/browser` (or default Angular dist).
5. Configure API base URL in environment files.

## 6) Future scalability suggestions
- Add Redis for token/session caching and background jobs.
- Add message broker (RabbitMQ/Kafka) for notifications/report generation.
- Implement CQRS read models for analytics dashboard.
- Move file uploads to S3-compatible object storage.
- Add OpenTelemetry tracing and centralized logging.
- Use DB migrations (Sequelize CLI) and zero-downtime deploy strategy.
