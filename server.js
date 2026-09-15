const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = process.env.RESULTS_FILE || path.join(__dirname, 'results.json');
const DASHBOARD_TOKEN = process.env.DASHBOARD_TOKEN;

const prompts = {
  Bottle: 'A product photo of a copper water bottle with brass cap, standing upright, plain white background, e-commerce catalog style, sharp focus',
  Saree: 'A studio product photo of a handwoven Kanjeevaram silk saree, folded neatly, draped on a wooden mannequin, soft natural lighting, plain beige background, e-commerce style',
  Shoes: 'A lifestyle product photo of a pair of Kolhapuri leather chappals placed on a jute mat, warm sunlight, styled for an online fashion store listing',
  Tiffin: 'A close-up product photo of a stainless steel Indian tiffin box with 3 compartments, placed on a white marble surface, clean e-commerce lighting, no shadows'
};
const groups = Object.keys(prompts);
const models = ['A', 'B', 'C', 'D'];
const criteria = ['relevance', 'visualQuality', 'indiaFit'];

app.use(express.json({ limit: '100kb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

function readResults() {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const contents = fs.readFileSync(DATA_FILE, 'utf8');
    return contents.trim() ? JSON.parse(contents) : [];
  } catch (error) {
    console.error('Could not read results.json:', error);
    return [];
  }
}

function writeResults(results) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(results, null, 2));
}

function validRating(value) {
  return Number.isInteger(value) && value >= 1 && value <= 5;
}

function validateSubmission(body) {
  if (!body || typeof body.participant !== 'object' || !body.consent) return 'Participant details and consent are required.';
  const { name, email, age } = body.participant;
  if (!String(name || '').trim() || !String(email || '').trim() || !Number.isInteger(age) || age < 18) return 'Name, email, and a valid age of 18 or older are required.';
  if (!Array.isArray(body.responses) || body.responses.length !== groups.length) return 'All four prompt groups must be completed.';
  for (const response of body.responses) {
    if (!groups.includes(response.group) || !models.includes(response.favorite)) return 'Each prompt needs a valid favorite.';
    for (const model of models) {
      if (!response.ratings || !response.ratings[model] || criteria.some((criterion) => !validRating(response.ratings[model][criterion]))) {
        return 'Every image must have a 1-5 rating for each criterion.';
      }
    }
  }
  return null;
}

app.get('/api/config', (req, res) => {
  res.json({ groups, prompts, models, criteria });
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.post('/api/submissions', (req, res) => {
  const validationError = validateSubmission(req.body);
  if (validationError) return res.status(400).json({ error: validationError });

  const results = readResults();
  results.push({
    id: Date.now().toString(36),
    timestamp: new Date().toISOString(),
    participant: {
      name: String(req.body.participant.name).trim(),
      email: String(req.body.participant.email).trim(),
      age: req.body.participant.age
    },
    responses: req.body.responses
  });
  writeResults(results);
  res.status(201).json({ ok: true });
});

app.get('/api/dashboard', (req, res) => {
  if (DASHBOARD_TOKEN && req.query.token !== DASHBOARD_TOKEN) return res.status(401).json({ error: 'Dashboard access denied.' });
  const results = readResults();
  const summary = {
    participantCount: results.length,
    favorites: Object.fromEntries(models.map((model) => [model, 0])),
    averages: Object.fromEntries(models.map((model) => [model, Object.fromEntries(criteria.map((criterion) => [criterion, 0]))])),
    breakdown: Object.fromEntries(groups.map((group) => [group, {
      favorites: Object.fromEntries(models.map((model) => [model, 0])),
      averages: Object.fromEntries(models.map((model) => [model, Object.fromEntries(criteria.map((criterion) => [criterion, 0]))]))
    }]))
  };
  const ratingCounts = Object.fromEntries(models.map((model) => [model, 0]));
  const groupRatingCounts = Object.fromEntries(groups.map((group) => [group, Object.fromEntries(models.map((model) => [model, 0]))]));

  results.forEach((result) => result.responses.forEach((response) => {
    summary.favorites[response.favorite] += 1;
    summary.breakdown[response.group].favorites[response.favorite] += 1;
    models.forEach((model) => criteria.forEach((criterion) => {
      summary.averages[model][criterion] += response.ratings[model][criterion];
      summary.breakdown[response.group].averages[model][criterion] += response.ratings[model][criterion];
      ratingCounts[model] += 1;
      groupRatingCounts[response.group][model] += 1;
    }));
  }));

  models.forEach((model) => criteria.forEach((criterion) => {
    summary.averages[model][criterion] = ratingCounts[model] ? Number((summary.averages[model][criterion] / ratingCounts[model]).toFixed(2)) : 0;
  }));
  groups.forEach((group) => models.forEach((model) => criteria.forEach((criterion) => {
    const count = groupRatingCounts[group][model];
    summary.breakdown[group].averages[model][criterion] = count ? Number((summary.breakdown[group].averages[model][criterion] / count).toFixed(2)) : 0;
  })));
  res.json(summary);
});

app.get('/dashboard', (req, res) => {
  if (DASHBOARD_TOKEN && req.query.token !== DASHBOARD_TOKEN) return res.status(404).send('Not found');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`Survey running at http://localhost:${PORT}`));
