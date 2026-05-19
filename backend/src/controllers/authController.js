const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRepo = require('../repositories/authRepo');
const { types } = require('cassandra-driver');
const Uuid = types.Uuid;

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: 'Data registrasi tidak lengkap' });
        }

        const existingCreds = await authRepo.getCredentialsByEmail(email);
        if (existingCreds) {
            return res.status(400).json({ error: 'Email sudah terdaftar' });
        }

        const password_hash = await bcrypt.hash(password, 10);
        const user_id = Uuid.random();

        const userParams = [user_id, name, email, role];
        const credParams = [email, user_id, password_hash];

        await authRepo.registerUserDualWrite(userParams, credParams);

        res.status(201).json({ message: 'Registrasi berhasil', user_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email dan password harus diisi' });
        }

        const creds = await authRepo.getCredentialsByEmail(email);
        if (!creds) return res.status(401).json({ error: 'Email atau password salah' });

        const isValidPassword = await bcrypt.compare(password, creds.password_hash);
        if (!isValidPassword) return res.status(401).json({ error: 'Email atau password salah' });

        const token = jwt.sign(
            { id: creds.user_id.toString(), email: creds.email }, 
            process.env.JWT_SECRET || 'fallback_secret_lecturelog', 
            { expiresIn: '7d' }
        );

        res.json({ message: 'Login berhasil', token, user_id: creds.user_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getMe = async (req, res) => {
    try {
        const user_id = req.user.id;
        const user = await authRepo.getUserById(user_id);
        
        if (!user) return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
        
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { register, login, getMe };
