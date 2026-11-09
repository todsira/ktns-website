# ktns-website

Kitthanasap (กิจธนาทรัพย์) concrete block factory site. Static HTML/CSS/JS in `public/`, served by Cloudflare Workers Static Assets.

## Local
```
npm install
npm run dev      # http://localhost:8787
```

## Deploy
- Manual: `npx wrangler login` then `npm run deploy`
- Cloudflare Git integration (Workers Builds): connect this GitHub repo, build command `npm run build`, deploy command `npx wrangler deploy`
