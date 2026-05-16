const sessionRepo = require('../repositories/sessionRepo');

const createSession = async (req, res) => {
  try {
    const { course_id, semester, lecturer_id, room, started_at, topic } = req.body;
    if (!course_id || !semester || !lecturer_id || !started_at || !topic) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const session = await sessionRepo.createSession({ course_id, semester, lecturer_id, room, started_at, topic });
    res.status(201).json(session);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getSessionsByCourse = async (req, res) => {
  try {
    const { course_id, semester } = req.params;
    const sessions = await sessionRepo.getSessionsByCourse(course_id, semester);
    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error getting sessions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createSession,
  getSessionsByCourse
};
