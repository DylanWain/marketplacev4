# 🚀 Vercel Deployment Guide

## Step 1: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repo
5. Click "Deploy" (it will fail first time - that's OK!)

---

## Step 2: Add Environment Variables

Go to your Vercel project → **Settings** → **Environment Variables**

### Add these variables (copy/paste each one):

---

### ⭐ REQUIRED (Add these first!)

| Name | Value | Where to get it |
|------|-------|-----------------|
| `GEMINI_API_KEY` | `AIzaSy...` | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| `GOOGLE_PLACES_API_KEY` | `AIzaSy...` | [console.cloud.google.com](https://console.cloud.google.com/apis/credentials) |

---

### 🔄 RECOMMENDED (Add these for better results)

| Name | Value | Where to get it |
|------|-------|-----------------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | [console.anthropic.com](https://console.anthropic.com/) |
| `RAPIDAPI_KEY` | `abc123...` | [rapidapi.com](https://rapidapi.com/) |

---

### 💎 OPTIONAL (Skip these to start)

| Name | Value | Where to get it |
|------|-------|-----------------|
| `RENTCAST_API_KEY` | `...` | [rentcast.io](https://rentcast.io/) |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | [supabase.com](https://supabase.com/) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `...` | [supabase.com](https://supabase.com/) |

---

## Step 3: Redeploy

After adding environment variables:
1. Go to **Deployments** tab
2. Click the **...** menu on the latest deployment
3. Click **Redeploy**

---

## 🔑 Getting Each API Key

### 1. Gemini API (FREE - Takes 1 minute)

```
1. Go to https://aistudio.google.com/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key
```

### 2. Google Cloud API (Has $200 free credit)

```
1. Go to https://console.cloud.google.com/
2. Create new project called "DibbyTour"
3. Go to APIs & Services → Library
4. Enable these APIs:
   - Geocoding API
   - Places API  
   - Street View Static API
5. Go to APIs & Services → Credentials
6. Click "Create Credentials" → "API Key"
7. Copy the key
```

### 3. Anthropic Claude API (Optional backup)

```
1. Go to https://console.anthropic.com/
2. Sign up / Sign in
3. Go to Settings → API Keys
4. Click "Create Key"
5. Copy the key (starts with sk-ant-)
```

### 4. RapidAPI for Zillow (Optional - for comparables)

```
1. Go to https://rapidapi.com/
2. Sign up
3. Search for "Zillow"
4. Subscribe to "Zillow" API (free tier available)
5. Copy your RapidAPI key from the dashboard
```

---

## ✅ Minimum Setup (Just 2 Keys!)

To get started, you only need:

1. **GEMINI_API_KEY** - For AI screenshot analysis (FREE)
2. **GOOGLE_PLACES_API_KEY** - For address verification ($200 free credit)

Everything else is optional and the app will work without them!

---

## 🧪 Test Your Deployment

1. Go to your Vercel URL: `https://your-app.vercel.app`
2. Navigate to `/tools/listing-checker`
3. Upload a screenshot of a rental listing
4. Check the console logs in Vercel for any errors

---

## 📊 What Each API Provides

| API | What it does | Required? |
|-----|--------------|-----------|
| Gemini | Reads screenshots, extracts listing data | ✅ Yes |
| Google Cloud | Verifies addresses, finds nearby places | ✅ Yes |
| Claude | Backup AI if Gemini fails | Optional |
| RapidAPI | Gets comparable listings from Zillow | Optional |
| Rentcast | Rental price estimates | Optional |
| NYC Open Data | Building violations (NYC only) | FREE built-in |
| NHTSA | Vehicle VIN/recalls | FREE built-in |
| HUD FMR | Fair market rent data | FREE built-in |

---

## 💰 Cost Estimate

| Volume | Monthly Cost |
|--------|--------------|
| 100 analyses | ~$20 |
| 500 analyses | ~$100 |
| 1000 analyses | ~$200 |

Most of the cost is Google Places API. The AI (Gemini) is free!
