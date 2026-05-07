const client = require('../config/cassandra');

const getEventsByCourseAndBucket = async (courseId, bucket) => {
    const query = `
        SELECT * FROM events_by_course
        WHERE course_id = ? AND bucket = ?
        LIMIT 50
    `;
    const result = await client.execute(query, [courseId, bucket], { prepare: true });
    return result;
};

const createEvent = async (params) => {
    const query = `
        INSERT INTO events_by_course 
        (course_id, bucket, event_id, event_type, title, description, created_by, attachment_url, payload)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await client.execute(query, params, { prepare: true });
};

module.exports = {
    getEventsByCourseAndBucket,
    createEvent
};