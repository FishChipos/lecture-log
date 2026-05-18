const express = require('express');
const cors = require('cors');
require('dotenv').config();

const cassandraClient = require('./config/cassandra');
const attendanceRouter = require('./routes/attendance');
const eventsRouter = require('./routes/events');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const sessionsRouter = require('./routes/sessions');
const materialsRouter = require('./routes/materials');
const assignmentsRouter = require('./routes/assignments');

const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/api/attendance', attendanceRouter);
app.use('/api/events', eventsRouter);
app.use('/api/users', usersRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/materials', materialsRouter);
app.use('/api/assignments', assignmentsRouter);

cassandraClient.connect()
  .then(() => {
    console.log('Berhasil terhubung ke cluster Cassandra di Astra DB!');
    
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server LectureLog berjalan di http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Gagal terhubung ke database:', err);
    process.exit(1); 
  });