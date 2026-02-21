const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const auth = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '5mb' }));
app.use(morgan('combined'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 400 }));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', auth, require('./routes/userRoutes'));
app.use('/api/students', auth, require('./routes/studentRoutes'));
app.use('/api/teachers', auth, require('./routes/teacherRoutes'));
app.use('/api/attendance', auth, require('./routes/attendanceRoutes'));
app.use('/api/exams', auth, require('./routes/examRoutes'));
app.use('/api/fees', auth, require('./routes/feeRoutes'));
app.use('/api/timetable', auth, require('./routes/timetableRoutes'));
app.use('/api/notices', auth, require('./routes/noticeRoutes'));
app.use('/api/dashboard', auth, require('./routes/dashboardRoutes'));

app.use(errorHandler);

module.exports = app;
