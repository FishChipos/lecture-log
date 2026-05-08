const cassandra = require('cassandra-driver');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

let credentials = {
  username: process.env.ASTRA_CLIENT_ID,
  password: process.env.ASTRA_CLIENT_SECRET
};

const tokenFilePath = path.join(__dirname, '../../lectureLog-token.json');
if (fs.existsSync(tokenFilePath)) {
  try {
    const tokenData = JSON.parse(fs.readFileSync(tokenFilePath, 'utf8'));
    credentials.username = tokenData.clientId || credentials.username;
    credentials.password = tokenData.secret || credentials.password;
  } catch (err) {
    console.warn('Could not parse lectureLog-token.json, using environment variables');
  }
}

const client = new cassandra.Client({
  cloud: {
    secureConnectBundle: path.join(__dirname, '../../secure-connect-lecturelog.zip')
  },
  credentials: credentials,
  keyspace: 'lectureLog'
});

module.exports = client;