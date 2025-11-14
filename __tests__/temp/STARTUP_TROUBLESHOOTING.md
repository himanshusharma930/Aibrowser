# App Startup Troubleshooting

## Issue: App is loading but not starting

### Possible Causes

1. **Missing API Configuration**
   - AI service keys not configured
   - Remote service connection timeout
   - Missing environment variables

2. **Network Issues**
   - DNS resolution failing
   - Network connectivity problems
   - Firewall blocking connections

3. **Corrupted Cache**
   - Stale local storage
   - Bad leveldb files
   - IndexedDB corruption

## Solution 1: Check API Configuration

The app needs AI service keys to operate. Check `.env.local` or environment:

```bash
# Should have at least one of these:
echo $DEEPSEEK_API_KEY
echo $QWEN_API_KEY
echo $GOOGLE_API_KEY
echo $ANTHROPIC_API_KEY
echo $OPENROUTER_API_KEY
```

If empty, configure in the UI or set in `.env.local`

## Solution 2: Clear Cache & Restart

```bash
# Kill the app
killall DeepFundAIBrowser 2>/dev/null

# Clear application cache
rm -rf ~/Library/Application\ Support/ai-browser/

# Start development version
npm run dev
```

## Solution 3: Run Development Version

Development version is more reliable and shows console logs:

```bash
# Stop any running instances
killall DeepFundAIBrowser 2>/dev/null
pkill -f "npm run dev"

# Start fresh dev environment
npm run dev

# The app should now open automatically
```

## Solution 4: Check Dev Tools

If still hanging:

1. Development version should open Electron window
2. Open DevTools (Cmd+Option+I)
3. Check Console tab for errors
4. Check Network tab for failed requests

## Solution 5: Check Network Connectivity

```bash
# Test network connectivity
ping google.com

# Check if services are accessible
curl -I https://api.openai.com
```

If network is down, the app will hang waiting for services.

## Prevention

1. Always use **development version** during development: `npm run dev`
2. Configure at least one AI API key before running
3. Clear app cache if it starts behaving strangely
4. Check console logs for any errors

## For Production Builds

If the production DMG is hanging:

1. Try running from Applications (already installed)
2. If hanging, run development version instead
3. Check that `.env.production` has API keys configured
4. Consider re-building if persistent: `npm run build`

---

**TL;DR**: If the app is hanging on startup, run `npm run dev` and ensure you have API keys configured.
