const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { passport, ensureAuthenticated } = require('./middleware/authMiddleware');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const automobileRoutes = require('./routes/automobileRoutes');
const savedSearchRoutes = require('./routes/savedSearchRoutes');
const shareRoutes = require('./routes/shareRoutes');

const app = express();
const PORT = process.env.PORT || 3030;

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Log  debug request
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

// Middleware config session
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000, // 1 hour
  },
  store: new SequelizeStore({
    db: sequelize,
  }),
}));

// initisialize passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware JSON parse 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome! Server is listening for CRUD operations and authentication requests.');
});

//  login source local strategy
app.post('/login', (req, res, next) => {
  next();
}, passport.authenticate('local'), (req, res) => {
  console.log('Login successful:', req.user);
  res.json({ success: true, message: 'Login successful.' });
});

// source  auth
app.use('/', authRoutes);

// source carx
app.use('/api', ensureAuthenticated, automobileRoutes);

// source saved search
app.use('/api', ensureAuthenticated, savedSearchRoutes);

// Importa Swagger and its dependencies
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Finder API',
      version: '1.0.0',
      description: 'API Car Finder management project',
    },
    servers: [
      {
        url: 'http://localhost:3030',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

console.log('Swagger UI available on http://localhost:3030/api-docs');

app.use('/api', shareRoutes);

// Firing server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Error during DB synchronization:', error);
});

module.exports = app; // Added  for testing
