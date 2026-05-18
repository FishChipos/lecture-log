const cassandra = require('cassandra-driver');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const isLocal = process.env.USE_LOCAL_DB === 'true';
let client;

if (isLocal) {
  console.log('Menjalankan koneksi ke Cassandra Lokal (Docker)...');
  client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'lectureLog',
  });
} else {
  const tokenFilePath = path.join(__dirname, '../../lectureLog-token.json');
  const secureConnectBundlePath = path.join(__dirname, '../../secure-connect-lecturelog.zip');

  let username = process.env.ASTRA_CLIENT_ID;
  let password = process.env.ASTRA_CLIENT_SECRET;

  if (fs.existsSync(tokenFilePath)) {
    try {
      const tokenData = JSON.parse(fs.readFileSync(tokenFilePath, 'utf8'));
      username = tokenData.clientId || username;
      password = tokenData.secret || password;
    } catch (err) {
      console.warn('Could not parse lectureLog-token.json, using environment variables');
    }
  }

  if (!username || !password) {
    throw new Error(
      'Missing Cassandra credentials. Set ASTRA_CLIENT_ID and ASTRA_CLIENT_SECRET, or provide lectureLog-token.json.'
    );
  }

  if (!fs.existsSync(secureConnectBundlePath)) {
    throw new Error(
      'Missing secure-connect-lecturelog.zip. Download the Astra DB secure connect bundle and place it in the backend root.'
    );
  }

  client = new cassandra.Client({
    cloud: {
      secureConnectBundle: secureConnectBundlePath
    },
    authProvider: new cassandra.auth.PlainTextAuthProvider(username, password),
    keyspace: 'lectureLog'
  });
}

module.exports = client;