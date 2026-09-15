# Text-to-Image Evaluation Survey

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:3000` for the participant survey. Open `http://localhost:3000/dashboard` for the results dashboard.

Submissions are stored in `results.json` and the provided assets are served from `images/`.

## Hosting

For a hosted deployment, set `RESULTS_FILE` to a file on persistent storage, such as `/data/results.json`. A host's temporary filesystem can lose `results.json` when the service restarts.

Set `DASHBOARD_TOKEN` to a private random value. Then open your dashboard at `/dashboard?token=YOUR_TOKEN`; participants should only receive the base survey URL.
