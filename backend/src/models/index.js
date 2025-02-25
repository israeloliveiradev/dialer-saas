const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user', // Default role is 'user'
  },
}, {
    timestamps: true
});

// Define the CallLog model
const CallLog = sequelize.define('CallLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING, // e.g., 'queued', 'ringing', 'answered', 'failed'
    allowNull: false,
    defaultValue: 'queued',
  },
  startTime: {
    type: DataTypes.DATE,
  },
  endTime: {
    type: DataTypes.DATE,
  },
  duration: { // in seconds, could be calculated
    type: DataTypes.INTEGER,
  },
  userId: { // Link to the User who initiated the call (or the user associated with the SIP extension)
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
    // Add other relevant fields, such as SIP extension, call recording URL, etc.
}, {
    timestamps: true
});

// Define associations
User.hasMany(CallLog, { foreignKey: 'userId' });
CallLog.belongsTo(User, { foreignKey: 'userId' });

// Function to sync the models with the database.
async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: false }); // Use force: true to drop and recreate tables (DANGEROUS in production!)
        console.log('Database synchronized.');

        // Optionally, seed the database with an initial admin user
        const adminExists = await User.findOne({ where: { role: 'admin' } });
        if (!adminExists) {
            const hashedPassword = 'adminpassword'; // Replace the plaintext password, to a bcrypt hash.
            await User.create({
                username: 'admin',
                password: hashedPassword,
                role: 'admin',
            });
            console.log('Admin user created.');
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

initializeDatabase();
module.exports = { User, CallLog, sequelize };