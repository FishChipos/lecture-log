const eventRepo = require('../repositories/eventRepo');
const { calculateBucket } = require('../utils/bucketCalculator');
const { TimeUuid } = require('cassandra-driver').types;

const getEvents = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const bucket = calculateBucket();

        const result = await eventRepo.getEventsByCourseAndBucket(courseId, bucket);
        
        res.json({
            bucket_saat_ini: bucket,
            total_events: result.rowLength,
            events: result.rows
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createEvent = async (req, res) => {
    try {
        const { course_id, event_type, title, description, created_by, attachment_url, payload } = req.body;
        
        const bucket = calculateBucket();
        const eventId = TimeUuid.now();

        const params = [
            course_id, bucket, eventId, event_type, title, 
            description || null, created_by, attachment_url || null, payload || null
        ];

        await eventRepo.createEvent(params);

        res.status(201).json({ 
            message: 'Event berhasil dicatat',
            event_id: eventId.toString() 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getEvents,
    createEvent
};