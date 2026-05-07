const express = require('express');
const cors = require('cors');
require('dotenv').config();

const cassandraClient = require('./config/cassandra');
const attendanceRouter = require('./routes/attendance');
const eventsRouter = require('./routes/events');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Registrasi Routes
app.use('/api/attendance', attendanceRouter);
app.use('/api/events', eventsRouter);

// Inisialisasi Koneksi Database dan Server
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