const { UsuarioM, UsuarioF } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const exist = await UsuarioM.findOne({ where: { email } });
        if (exist) return res.status(400).json({ message: 'Email already exists!' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UsuarioM.create({
            nombre,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User registered successfully!', usuario: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UsuarioM.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Wrong password' });

        const token = jwt.sign(
            { id: user.id, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ message: 'Login successfully', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};