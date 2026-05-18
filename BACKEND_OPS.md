# WizOps backend setup for webinar-landing-page

Register each landing URL as `site_name` in WizOps **site-product-mappings** (must match `origin + pathname` exactly, no trailing slash):

- `https://<your-domain>/G-algo-free`
- `https://<your-domain>/G-algo-paid`
- `https://<your-domain>/M-algo-free`
- `https://<your-domain>/M-algo-paid`
- `https://<your-domain>/testmark-algo-free`
- `https://<your-domain>/testmark-algo-paid`

Ensure **GET /api/v1/agencies/resolve?source=...** returns `agency_id` for each source URL.

For local dev, `agencySource.js` maps `localhost` paths to `https://testmark.stockwiz.in` for agency lookup only.

Required env vars: see `.env.example`.
