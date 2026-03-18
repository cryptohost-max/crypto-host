# Crypto Host

Cryptocurrency converter using CoinGecko API.

## Deployment

1. Push code to GitHub.
2. Sign up for a free account on [Render](https://render.com).
3. Create a new Web Service and connect your repository.
4. Set build command: `npm install` and start command: `npm start`.
5. Add environment variable `COINGECKO_API_KEY` if you have one (optional).
6. Your app will be live on a `*.onrender.com` domain.
7. To use a custom domain, follow Render's custom domain guide.

## API Endpoint

GET `/api/convert?from=bitcoin&to=usd&amount=1`

## Environment Variables

- `PORT`: defaults to 3000
- `COINGECKO_API_KEY`: optional
