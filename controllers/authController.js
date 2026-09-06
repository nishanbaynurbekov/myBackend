const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Колдонуучуну каттоо
const registerUser = async (req, res) => {
  try {
    const { role, nickname, email, password, expertProfile } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Бул электрондук почта мурда катталган' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      role: role || 'user',
      nickname: nickname || '',
      email,
      password: hashedPassword,
      expertProfile: role === 'expert' ? expertProfile : {}
    });

    res.status(201).json({
      message: 'Каттоо ийгиликтүү өттү',
      user: {
        id: user._id,
        role: user.role,
        nickname: user.nickname,
        email: user.email,
        expertProfile: user.expertProfile
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Серверде ката чыкты: ' + error.message });
  }
};

// Системага кирүү (Login)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Почта боюнча табуу
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Электрондук почта же сырсөз туура эмес' });
    }

    // Сырсөздү текшерүү
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Электрондук почта же сырсөз туура эмес' });
    }

    // JWT Токен түзүү (30 күнгө жарактуу)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Системага ийгиликтүү кирдиңиз',
      token,
      user: {
        id: user._id,
        role: user.role,
        nickname: user.nickname,
        email: user.email,
        expertProfile: user.expertProfile
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Серверде ката чыкты: ' + error.message });
  }
};

// Кирген колдонуучунун маалыматын алуу
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Серверде ката чыкты: ' + error.message });
  }
};

module.exports = { registerUser, loginUser, getMe };