const express = require('express');
const config = require('config');
const connectDB = require('./config/db');
const tokenMiddleware = require('./middleware/tokenMiddlware');


const app = express();

const PORT = process.env.PORT || config.get('serverPort');

connectDB();

app.get('/', (req, res) => res.send('Server working now'));

app.use(express.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', tokenMiddleware, require('./routes/api/profile'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
