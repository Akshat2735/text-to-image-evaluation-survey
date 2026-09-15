const app = document.querySelector('#app');
const state = { config: null, responses: [], participant: null, groupIndex: 0 };

async function getJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Something went wrong.');
  return data;
}

function renderConsent() {
  app.innerHTML = `<section class="panel consent-panel">
    <p class="eyebrow">Internal design evaluation</p>
    <h1>Text-to-Image Evaluation Survey</h1>
    <p class="lede">You'll see 4 product photo prompts, each with 4 AI-generated images. Rank or pick your favorite for each.</p>
    <form id="consent-form">
      <div class="form-grid">
        <div class="field"><label for="name">Name</label><input id="name" name="name" required></div>
        <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" required></div>
        <div class="field"><label for="age">Age</label><input id="age" name="age" type="number" min="18" required></div>
      </div>
      <label class="consent"><input id="consent" type="checkbox" required><span>I confirm that I am 18 years or older. I voluntarily participated in this evaluation. I consent to my name, email, and responses/ratings being included in this assignment submission for hiring evaluation purposes.</span></label>
      <button class="primary-button" id="start-button" type="submit" disabled>Start Survey</button>
    </form>
  </section>`;
  const form = document.querySelector('#consent-form');
  const startButton = document.querySelector('#start-button');
  const fields = [...form.querySelectorAll('input')];
  const updateButton = () => { startButton.disabled = !form.checkValidity() || !document.querySelector('#consent').checked; };
  fields.forEach((field) => field.addEventListener('input', updateButton));
  document.querySelector('#consent').addEventListener('change', updateButton);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    state.participant = { name: form.name.value, email: form.email.value, age: Number(form.age.value) };
    renderRating();
  });
}

function renderStars(group, model, criterion, value = 0) {
  return `<div class="stars">${[1, 2, 3, 4, 5].map((score) => `<button type="button" class="star ${score <= value ? 'selected' : ''}" data-group="${group}" data-model="${model}" data-criterion="${criterion}" data-score="${score}" aria-label="${score} stars">★</button>`).join('')}</div>`;
}

function renderRating() {
  const group = state.config.groups[state.groupIndex];
  const previous = state.responses.find((response) => response.group === group);
  const ratings = previous?.ratings || {};
  app.innerHTML = `<section class="panel">
    <div class="survey-header"><div><p class="eyebrow">Image evaluation</p><h2>${group}</h2></div><div class="progress">Prompt ${state.groupIndex + 1} of ${state.config.groups.length}</div></div>
    <p class="prompt">${state.config.prompts[group]}</p>
    <form id="rating-form"><div class="image-grid">${state.config.models.map((model) => `<article class="image-card"><img src="/images/${group}_${model}.jpeg" alt="${group} option ${model}"><div class="model-label">${model}</div>${[['relevance', 'Relevance'], ['visualQuality', 'Visual Quality'], ['indiaFit', 'India-fit']].map(([criterion, label]) => `<div class="rating-row"><span>${label}</span>${renderStars(group, model, criterion, ratings[model]?.[criterion])}</div>`).join('')}</article>`).join('')}</div>
    <div class="favorite-row"><strong>Which one is your overall favorite?</strong>${state.config.models.map((model) => `<label class="favorite-option"><input type="radio" name="favorite" value="${model}" ${previous?.favorite === model ? 'checked' : ''}> ${model}</label>`).join('')}</div>
    <p id="rating-error" class="error" hidden></p><button class="primary-button" type="submit">${state.groupIndex === state.config.groups.length - 1 ? 'Submit Survey' : 'Next Prompt'}</button></form>
  </section>`;
  document.querySelectorAll('.star').forEach((button) => button.addEventListener('click', () => {
    const { model, criterion, score } = button.dataset;
    const response = state.responses.find((item) => item.group === group) || { group, ratings: {} };
    response.ratings[model] = { ...(response.ratings[model] || {}), [criterion]: Number(score) };
    const existingIndex = state.responses.findIndex((item) => item.group === group);
    if (existingIndex >= 0) state.responses[existingIndex] = response; else state.responses.push(response);
    renderRating();
  }));
  document.querySelectorAll('input[name="favorite"]').forEach((input) => input.addEventListener('change', () => {
    const response = state.responses.find((item) => item.group === group) || { group, ratings: {} };
    response.favorite = input.value;
    const existingIndex = state.responses.findIndex((item) => item.group === group);
    if (existingIndex >= 0) state.responses[existingIndex] = response; else state.responses.push(response);
  }));
  document.querySelector('#rating-form').addEventListener('submit', handleRatingSubmit);
}

function handleRatingSubmit(event) {
  event.preventDefault();
  const group = state.config.groups[state.groupIndex];
  const response = state.responses.find((item) => item.group === group);
  const error = document.querySelector('#rating-error');
  const favorite = new FormData(event.target).get('favorite');
  const complete = response && state.config.models.every((model) => response.ratings?.[model] && ['relevance', 'visualQuality', 'indiaFit'].every((criterion) => response.ratings[model][criterion])) && favorite;
  if (!complete) { error.textContent = 'Please rate all three criteria for every image and choose a favorite.'; error.hidden = false; return; }
  response.favorite = favorite;
  if (state.groupIndex < state.config.groups.length - 1) { state.groupIndex += 1; renderRating(); return; }
  submitSurvey();
}

async function submitSurvey() {
  try {
    await getJson('/api/submissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ participant: state.participant, consent: true, responses: state.responses }) });
    app.innerHTML = '<section class="panel thanks"><p class="eyebrow">Survey complete</p><h1>Thank you for participating!</h1><p class="lede">Your responses have been recorded.</p></section>';
  } catch (error) { document.querySelector('#rating-error').textContent = error.message; document.querySelector('#rating-error').hidden = false; }
}

async function renderDashboard() {
  try {
    const token = new URLSearchParams(window.location.search).get('token');
    const data = await getJson(`/api/dashboard${token ? `?token=${encodeURIComponent(token)}` : ''}`);
    const maxFavorite = Math.max(1, ...Object.values(data.favorites));
    app.innerHTML = `<section class="panel"><p class="eyebrow">Internal results</p><h1>Survey Dashboard</h1><p class="lede">${data.participantCount} participant${data.participantCount === 1 ? '' : 's'} recorded.</p><h2 class="section-title">Overall favorites</h2><table class="dashboard-table"><thead><tr><th>Model</th><th>Favorite picks</th><th>Share of picks</th></tr></thead><tbody>${state.config.models.map((model) => `<tr><td><strong>${model}</strong></td><td>${data.favorites[model]}</td><td class="bar-cell">${data.favorites[model]}<div class="bar" style="width:${data.favorites[model] / maxFavorite * 100}%"></div></td></tr>`).join('')}</tbody></table><h2 class="section-title">Average ratings by model</h2>${ratingTable(data.averages)}${state.config.groups.map((group) => `<h2 class="section-title">${group}</h2><p class="prompt">Favorite picks and average ratings for this prompt.</p>${ratingTable(data.breakdown[group].averages, data.breakdown[group].favorites)}`).join('')}</section>`;
  } catch (error) { app.innerHTML = `<section class="panel"><p class="error">${error.message}</p></section>`; }
}

function ratingTable(averages, favorites = {}) {
  return `<table class="dashboard-table"><thead><tr><th>Model</th><th>Relevance</th><th>Visual Quality</th><th>India-fit</th>${Object.keys(favorites).length ? '<th>Favorites</th>' : ''}</tr></thead><tbody>${state.config.models.map((model) => `<tr><td><strong>${model}</strong></td><td>${averages[model].relevance.toFixed(2)}</td><td>${averages[model].visualQuality.toFixed(2)}</td><td>${averages[model].indiaFit.toFixed(2)}</td>${Object.keys(favorites).length ? `<td>${favorites[model]}</td>` : ''}</tr>`).join('')}</tbody></table>`;
}

(async function init() {
  state.config = await getJson('/api/config');
  if (window.location.pathname === '/dashboard') renderDashboard(); else renderConsent();
})();
