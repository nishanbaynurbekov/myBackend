const mongoose = require('mongoose');
const dns = require('dns');

// DNS катасын (querySrv ECONNREFUSED) оңдоо
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB туташты: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Каталык чыкты: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;