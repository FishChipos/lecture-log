const client = require('../config/cassandra');
const { types } = require('cassandra-driver');

const createUser = async (user) => {
  const query = 'INSERT INTO users (user_id, created_at, email, name, role) VALUES (?, ?, ?, ?, ?)';
  const params = [
    user.user_id || types.Uuid.random(),
    new Date(),
    user.email,
    user.name,
    user.role
  ];
  await client.execute(query, params, { prepare: true });
  return { user_id: params[0], email: user.email, name: user.name, role: user.role };
};

const getUserById = async (user_id) => {
  const query = 'SELECT * FROM users WHERE user_id = ?';
  const result = await client.execute(query, [user_id], { prepare: true });
  return result.first();
};

module.exports = {
  createUser,
  getUserById
};
