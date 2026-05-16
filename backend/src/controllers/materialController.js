const materialRepo = require('../repositories/materialRepo');
const cloudinary = require('../config/cloudinary');

const uploadMaterial = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { course_id, semester, title, type, uploaded_by } = req.body;
    if (!course_id || !semester || !title || !type || !uploaded_by) {
      return res.status(400).json({ error: 'Missing metadata for material' });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'lectureLog/materials', resource_type: 'auto' },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ error: 'File upload failed' });
        }

        try {
          const material = await materialRepo.saveMaterialMetadata({
            course_id,
            semester,
            file_url: result.secure_url,
            title,
            type,
            uploaded_by
          });
          res.status(201).json(material);
        } catch (dbError) {
          console.error('Error saving material metadata:', dbError);
          res.status(500).json({ error: 'Database save failed' });
        }
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error('Upload material error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMaterialsByCourse = async (req, res) => {
  try {
    const { course_id, semester } = req.params;
    const materials = await materialRepo.getMaterialsByCourse(course_id, semester);
    res.status(200).json(materials);
  } catch (error) {
    console.error('Error getting materials:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  uploadMaterial,
  getMaterialsByCourse
};
