const cassandra = require('cassandra-driver');
const path = require('path');

const client = new cassandra.Client({
  cloud: {
    secureConnectBundle: path.join(__dirname, 'secure-connect-lectureLog.zip')
  },
  credentials: {
    username: process.env.ASTRA_CLIENT_ID,
    password: process.env.ASTRA_CLIENT_SECRET
  },
  keyspace: 'lectureLog'
});

module.exports = client;