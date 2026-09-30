/**
 * CANDOR DIGITAL AGENCY — LOCAL/PRODUCTION SERVER
 * Optional Node.js & Express server with MongoDB Atlas integration
 * Serves the static website and handles /api/inquiries
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://nimraarooj644_db_user:NimrA%4088555@ac-9cv9fmp-shard-00-00.bax10ek.mongodb.net:27017,ac-9cv9fmp-shard-00-01.bax10ek.mongodb.net:27017,ac-9cv9fmp-shard-00-02.bax10ek.mongodb.net:27017/?ssl=true&replicaSet=atlas-gssemd-shard-0&authSource=admin&appName=Cluster0';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets
app.use(express.static(__dirname));

let dbClient = null;
let inquiriesCollection = null;

// Connect to MongoDB Atlas with graceful fallback
async function initMongo() {
  try {
    dbClient = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    await dbClient.connect();
    const db = dbClient.db('candor_agency');
    inquiriesCollection = db.collection('inquiries');
    console.log('✅ Connected to MongoDB Atlas (database: candor_agency, collection: inquiries)');
  } catch (err) {
    console.warn('⚠️ MongoDB Atlas connection notice:', err.message);
    console.log('ℹ️ Running with local JSON fallback for inquiries: ./data/candor_inquiries.json');
  }
}

// Inquiry Submission Endpoint
app.post('/api/inquiries', async (req, res) => {
  try {
    const { fullName, businessName, email, website, serviceInterest, message } = req.body;

    if (!fullName || !businessName || !email || !message) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    const newInquiry = {
      fullName: String(fullName).trim(),
      businessName: String(businessName).trim(),
      email: String(email).trim(),
      website: website ? String(website).trim() : '',
      serviceInterest: serviceInterest || 'General Inquiry',
      message: String(message).trim(),
      receivedAt: new Date(),
      status: 'new'
    };

    if (inquiriesCollection) {
      const result = await inquiriesCollection.insertOne(newInquiry);
      console.log('📩 New Candor Inquiry stored in MongoDB Atlas, id:', result.insertedId);
      return res.status(201).json({ success: true, id: result.insertedId });
    } else {
      // Local fallback file
      const dataDir = path.join(__dirname, 'data');
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      const filePath = path.join(dataDir, 'candor_inquiries.json');
      let current = [];
      if (fs.existsSync(filePath)) {
        try { current = JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch (e) { current = []; }
      }
      current.push(newInquiry);
      fs.writeFileSync(filePath, JSON.stringify(current, null, 2), 'utf8');
      console.log('📩 New Candor Inquiry saved locally in data/candor_inquiries.json');
      return res.status(201).json({ success: true, note: 'Saved locally' });
    }
  } catch (error) {
    console.error('Error recording inquiry:', error);
    res.status(500).json({ error: 'Failed to process inquiry.' });
  }
});

// View Inquiries Endpoint (for admin review)
app.get('/api/inquiries', async (req, res) => {
  try {
    if (inquiriesCollection) {
      const docs = await inquiriesCollection.find({}).sort({ receivedAt: -1 }).limit(50).toArray();
      return res.json({ count: docs.length, inquiries: docs });
    } else {
      const filePath = path.join(__dirname, 'data', 'candor_inquiries.json');
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return res.json({ count: data.length, inquiries: data.reverse() });
      }
      return res.json({ count: 0, inquiries: [] });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fallback to index.html for single-page routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, async () => {
  console.log(`\n======================================================`);
  console.log(`  CANDOR DIGITAL AGENCY — "Clear Strategy, Honest Growth."`);
  console.log(`  Live URL: http://localhost:${PORT}`);
  console.log(`  Static & GitHub Pages Ready`);
  console.log(`======================================================\n`);
  await initMongo();
});
