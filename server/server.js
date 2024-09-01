const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  logging: false, // Disable logging; default: console.log
});

// User model
const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false }
}, {
  timestamps: false
});

// Organization model
const Organization = sequelize.define('Organization', {
  referral_type: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING, allowNull: false },
  services: { type: DataTypes.TEXT },
  ages_serviced: { type: DataTypes.STRING },
  address: { type: DataTypes.TEXT },
  phone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  website: { type: DataTypes.STRING },
  zip_code: { type: DataTypes.STRING },
  last_updated: { type: DataTypes.DATE },
  other_details: { type: DataTypes.TEXT }
}, {
  timestamps: false
});

// Referral model
const Referral = sequelize.define('Referral', {
  client_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  client_name: { type: DataTypes.STRING },
  referral_type: { type: DataTypes.STRING },
  organization_referred_to: { type: DataTypes.STRING },
  date_referred: { type: DataTypes.DATE },
  able_to_contact: { type: DataTypes.BOOLEAN },
  contact_type_preferred: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING }
}, {
  timestamps: false
});

// FollowUp model
const FollowUp = sequelize.define('FollowUp', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  client_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Referral,
      key: 'client_id'
    }
  },
  client_name: { type: DataTypes.STRING },
  referral_type: { type: DataTypes.STRING },
  organization_referred_to: { type: DataTypes.STRING },
  deadline_to_follow_up: { type: DataTypes.DATE },
  appointment_made: { type: DataTypes.BOOLEAN },
  gender: { type: DataTypes.STRING },
  hispanic_or_latino: { type: DataTypes.BOOLEAN },
  race_ethnicity: { type: DataTypes.STRING },
  sexual_identity: { type: DataTypes.STRING },
  age: { type: DataTypes.STRING },
  religious_affiliation: { type: DataTypes.STRING },
  housing: { type: DataTypes.STRING },
  income: { type: DataTypes.STRING },
  employment: { type: DataTypes.STRING },
  education: { type: DataTypes.STRING },
  primary_language: { type: DataTypes.STRING },
  was_988_helpful: { type: DataTypes.BOOLEAN },
  would_use_988_again: { type: DataTypes.BOOLEAN },
  liked_988: { type: DataTypes.TEXT },
  disliked_988: { type: DataTypes.TEXT }
}, {
  timestamps: false
});

// Define relationships
Referral.hasMany(FollowUp, { foreignKey: 'client_id' });
FollowUp.belongsTo(Referral, { foreignKey: 'client_id' });

// User registration endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  try {
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).send({ message: 'User registered successfully!', user });
  } catch (error) {
    res.status(500).send({ message: 'Error registering user', error });
  }
});

// User login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ auth: true, token });
  } else {
    res.status(401).send({ auth: false, token: null });
  }
});

// CRUD operations for Organizations
app.post('/organizations', async (req, res) => {
  try {
    const organization = await Organization.create(req.body);
    res.status(201).send(organization);
  } catch (error) {
    res.status(500).send({ message: 'Error creating organization', error });
  }
});

app.get('/organizations', async (req, res) => {
  try {
    const organizations = await Organization.findAll();
    res.status(200).send(organizations);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching organizations', error });
  }
});

app.put('/organizations/:id', async (req, res) => {
  try {
    await Organization.update(req.body, { where: { id: req.params.id } });
    res.status(200).send({ message: 'Organization updated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error updating organization', error });
  }
});

app.delete('/organizations/:id', async (req, res) => {
  try {
    await Organization.destroy({ where: { id: req.params.id } });
    res.status(200).send({ message: 'Organization deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting organization', error });
  }
});

// CRUD operations for Referrals
app.post('/referrals', async (req, res) => {
  try {
    const referral = await Referral.create(req.body);
    // Also create a follow-up entry with the same initial data
    const followUpData = {
      client_id: referral.client_id,
      client_name: req.body.client_name,
      referral_type: req.body.referral_type,
      organization_referred_to: req.body.organization_referred_to,
    };
    await FollowUp.create(followUpData);
    res.status(201).send(referral);
  } catch (error) {
    res.status(500).send({ message: 'Error creating referral', error });
  }
});

app.get('/referrals', async (req, res) => {
  try {
    const referrals = await Referral.findAll();
    res.status(200).send(referrals);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching referrals', error });
  }
});

app.put('/referrals/:client_id', async (req, res) => {
  try {
    await Referral.update(req.body, { where: { client_id: req.params.client_id } });
    res.status(200).send({ message: 'Referral updated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error updating referral', error });
  }
});

app.delete('/referrals/:client_id', async (req, res) => {
  try {
    await Referral.destroy({ where: { client_id: req.params.client_id } });
    res.status(200).send({ message: 'Referral deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting referral', error });
  }
});

// Search organizations based on criteria
app.post('/referrals/search', async (req, res) => {
  const criteria = req.body;
  try {
    const organizations = await Organization.findAll({
      where: {
        [Op.and]: Object.keys(criteria).map(key => ({ [key]: criteria[key] }))
      }
    });
    if (organizations.length > 0) {
      res.status(200).send(organizations);
    } else {
      res.status(404).send({ message: 'No organizations found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving organizations', error });
  }
});

// CRUD operations for FollowUps
app.post('/followups', async (req, res) => {
  try {
    const followUp = await FollowUp.create(req.body);
    res.status(201).send(followUp);
  } catch (error) {
    res.status(500).send({ message: 'Error creating     follow-up', error });
  }
});

app.get('/followups', async (req, res) => {
  try {
    const followUps = await FollowUp.findAll();
    res.status(200).send(followUps);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching follow-ups', error });
  }
});

app.get('/followups/:client_id', async (req, res) => {
  try {
    const followUp = await FollowUp.findOne({ where: { client_id: req.params.client_id } });
    if (followUp) {
      res.status(200).send(followUp);
    } else {
      res.status(404).send({ message: 'Follow-up not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error fetching follow-up', error });
  }
});

app.put('/followups/:client_id', async (req, res) => {
  try {
    await FollowUp.update(req.body, { where: { client_id: req.params.client_id } });
    res.status(200).send({ message: 'Follow-up updated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error updating follow-up', error });
  }
});

app.delete('/followups/:client_id', async (req, res) => {
  try {
    await FollowUp.destroy({ where: { client_id: req.params.client_id } });
    res.status(200).send({ message: 'Follow-up deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting follow-up', error });
  }
});

// Start server
app.listen(3000, async () => {
  await sequelize.sync({ force: false }); // Use force: true cautiously
  console.log('Server is running on port 3000');
});
