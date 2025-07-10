const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const axios = require('axios');
const fs = require('fs');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// POST /upload/resume
router.post('/resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const fileBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(fileBuffer);
    const text = data.text;

    const keywords = extractKeywords(text);
    console.log('Extracted Keywords:', keywords);

    const jobResults = await fetchJobs(keywords);
    console.log('\nFetched Jobs from Adzuna:');
    console.log(JSON.stringify(jobResults, null, 2));

    res.render('result', { jobs: jobResults });
  } catch (err) {
    console.error('Resume processing failed:', err.message);
    res.status(500).send('Error processing resume');
  }
});

// Basic keyword matching
function extractKeywords(text) {
  const commonSkills = [
    'javascript',
    'node.js',
    'react',
    'python',
    'sql',
    'java',
    'aws',
    'docker',
    'c++',
    'golang',
    'typescript',
    'mongodb',
    'redis',
    'express',
  ];

  const lowerText = text.toLowerCase();

  return commonSkills.filter((skill) => lowerText.includes(skill));
}

// Fetch jobs from Adzuna API
async function fetchJobs(keywords) {
  const APP_ID = process.env.ADZUNA_APP_ID;
  const APP_KEY = process.env.ADZUNA_APP_KEY;
  const keywordStr = keywords.slice(0, 2).join(' ') || 'software developer'; // Limit to 1–2 top keywords

  const apiUrl = `https://api.adzuna.com/v1/api/jobs/in/search/1`;

  const params = {
    app_id: APP_ID,
    app_key: APP_KEY,
    what: keywordStr,
  };

  console.log('\n--- Adzuna API Request ---');
  console.log('URL:', apiUrl);
  console.log('Params:', params);

  try {
    const response = await axios.get(apiUrl, { params });
    return response.data.results.slice(0, 5);
  } catch (error) {
    console.error('\n--- Adzuna API Error ---');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
    return [];
  }
}

module.exports = router;
