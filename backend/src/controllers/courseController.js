const courseRepo = require('../repositories/courseRepo');

const getCoursesByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const courses = await courseRepo.getCoursesByUser(user_id);
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error getting courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getCoursesByUser
};
