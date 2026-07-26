# Deploy Rails API to Railway

The repo is ready for Railway. Local app is also running.

## Local (already running)

- Frontend: http://localhost:5173
- API: http://localhost:3000
- Admin: http://localhost:5173/admin

## Railway setup (API service)

1. In Railway dashboard, open your existing project (the one with Postgres).
2. **New → GitHub Repo** → `ShaheerMinhas/SaudiRides`
3. Set **Root Directory** to `server`
4. Build will use `server/Dockerfile` (already configured via `railway.toml`)
5. Link the Postgres service: Variables → **Add Reference** → `DATABASE_URL` from Postgres
6. Add these variables:

```text
RAILS_ENV=production
SECRET_KEY_BASE=<run: cd server && bundle exec rails secret>
FRONTEND_ORIGIN=https://YOUR-SITE.netlify.app
APP_HOST=YOUR-API.up.railway.app
```

`APP_HOST` is the Railway public domain **without** `https://` (set it after Railway assigns the domain).

7. Generate a public domain: Settings → Networking → **Generate Domain**
8. Update `APP_HOST` to that hostname, redeploy
9. After first deploy, run seed once (Railway shell or one-off):

```bash
bundle exec rails db:seed
```

## Netlify (frontend already deployed)

Add env var and rebuild:

```text
VITE_API_URL=https://YOUR-API.up.railway.app
```

Site settings → Environment variables → add `VITE_API_URL` → Trigger deploy.

Without this, the Netlify site cannot reach the Rails API (local Vite proxy only works in development).

## Checklist

- [ ] Railway service root = `server`
- [ ] `DATABASE_URL` referenced from Postgres
- [ ] `SECRET_KEY_BASE` set
- [ ] `FRONTEND_ORIGIN` = Netlify URL
- [ ] `APP_HOST` = Railway API host
- [ ] Netlify `VITE_API_URL` = Railway API URL (with https)
- [ ] Seed admin/cars after first migrate
