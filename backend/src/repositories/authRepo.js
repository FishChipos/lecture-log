const client = require('../config/cassandra');

const registerUserDualWrite = async (userParams, credParams) => {
    const queries = [
        {
            query: `INSERT INTO users (user_id, name, email, role, created_at) VALUES (?, ?, ?, ?, toTimestamp(now()))`,
            params: userParams
        },
        {
            query: `INSERT INTO user_credentials (email, user_id, password_hash) VALUES (?, ?, ?)`,
            params: credParams
        }
    ];
    await client.batch(queries, { prepare: true });
};

const getCredentialsByEmail = async (email) => {
    const query = `SELECT * FROM user_credentials WHERE email = ?`;
    const result = await client.execute(query, [email], { prepare: true });
    return result.first();
};

const getUserById = async (user_id) => {
    const query = `SELECT * FROM users WHERE user_id = ?`;
    const result = await client.execute(query, [user_id], { prepare: true });
    return result.first();
};

module.exports = { registerUserDualWrite, getCredentialsByEmail, getUserById };
