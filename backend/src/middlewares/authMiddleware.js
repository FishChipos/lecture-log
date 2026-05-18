const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Akses Ditolak: Token tidak ditemukan' });
    }

    const token = authHeader.split(' ')[1];
    
    const secret = process.env.JWT_SECRET || 'fallback_secret_lecturelog';
    const decoded = jwt.verify(token, secret);
    
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Autentikasi Gagal:', error.message);
    return res.status(401).json({ error: 'Akses Ditolak: Token tidak valid atau kedaluwarsa' });
  }
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: `Akses Ditolak: Hanya ${role} yang diizinkan` });
    }
    next();
  };
};

module.exports = {
  requireAuth,
  requireRole
};
