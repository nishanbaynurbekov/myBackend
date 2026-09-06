const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Ролу: 'user' (жөнөкөй анонимдүү) же 'expert' (адис)
  role: {
    type: String,
    enum: ['user', 'expert'],
    default: 'user'
  },

  // Жөнөкөй колдонуучу кааласа каймана ат жазат, каалабаса бош калат
  nickname: {
    type: String,
    trim: true,
    default: ''
  },

  // Кирүү үчүн электрондук почта
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  // Хештелген сырсөз
  password: {
    type: String,
    required: true
  },

  // Эгер роль 'expert' болсо гана толтурулуучу маалыматтар
  expertProfile: {
    fullName: { type: String, default: '' },      // Толук аты-жөнү
    specialty: { type: String, default: '' },     // Адистиги (Психолог, Аалым, Социолог)
    bio: { type: String, default: '' },           // Кыскача маалымат
    documents: [{ type: String }],                // Диплом/сертификат сүрөттөрүнүн шилтемелери
    isVerified: { type: Boolean, default: false } // Админдин тастыктоо статусу
  }
}, {
  timestamps: true // Түзүлгөн убактысын автоматтык сактайт
});

module.exports = mongoose.model('User', userSchema);