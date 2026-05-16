const client = require('../config/cassandra');

const getCoursesByUser = async (user_id) => {
  const query = 'SELECT * FROM courses_by_user WHERE user_id = ?';
  const result = await client.execute(query, [user_id], { prepare: true });
  return result.rows;
};

module.exports = {
  getCoursesByUser
};
