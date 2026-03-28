const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === "/api/search") {
      await handleSearchProxy(url, res);
      return;
    }

    if (url.pathname === "/api/peer-search") {
      await handlePeerSearch(url, res);
      return;
    }

    if (req.method !== "GET" && req.method !== "HEAD") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }

    serveStatic(url.pathname, res);
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
}).listen(PORT, () => {
  console.log(`Financial Statement Intelligence Studio running at http://localhost:${PORT}`);
});

async function handleSearchProxy(url, res) {
  const target = url.searchParams.get("target");
  const query = url.searchParams.get("q");
  const apiKey = url.searchParams.get("apiKey");
  const mode = url.searchParams.get("mode") || "generic";
  const alphaFunction = url.searchParams.get("alphaFunction") || "NEWS_SENTIMENT";

  if (!target || !query) {
    sendJson(res, 400, { error: "Missing target or q query parameter." });
    return;
  }

  const upstream = new URL(target);
  const headers = {};

  if (mode === "alphavantage") {
    upstream.searchParams.set("function", alphaFunction);
    if (alphaFunction === "NEWS_SENTIMENT") {
      upstream.searchParams.set("tickers", query.toUpperCase());
    } else {
      upstream.searchParams.set("symbol", query.toUpperCase());
    }
    if (!apiKey) {
      sendJson(res, 400, { error: "Missing apiKey for Alpha Vantage mode." });
      return;
    }
    upstream.searchParams.set("apikey", apiKey);
  } else if (mode === "gnews") {
    upstream.searchParams.set("q", query);
    if (!apiKey) {
      sendJson(res, 400, { error: "Missing apiKey for GNews mode." });
      return;
    }
    upstream.searchParams.set("apikey", apiKey);
    if (!upstream.searchParams.has("lang")) upstream.searchParams.set("lang", "en");
    if (!upstream.searchParams.has("max")) upstream.searchParams.set("max", "10");
  } else {
    upstream.searchParams.set("q", query);
    if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
    }
  }

  const response = await fetch(upstream, { headers });
  const text = await response.text();
  res.writeHead(response.status, {
    "Content-Type": response.headers.get("content-type") || "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(text);
}

async function handlePeerSearch(url, res) {
  const query = url.searchParams.get("q");
  const apiKey = url.searchParams.get("apiKey");

  if (!query || !apiKey) {
    sendJson(res, 400, { error: "Missing q or apiKey query parameter." });
    return;
  }

  const symbol = await resolveAlphaSymbol(query, apiKey);
  const [overview, quote] = await Promise.all([
    fetchAlpha({ function: "OVERVIEW", symbol, apikey: apiKey }),
    fetchAlpha({ function: "GLOBAL_QUOTE", symbol, apikey: apiKey })
  ]);

  if (!overview || !overview.Symbol) {
    sendJson(res, 404, { error: "Unable to resolve company overview from Alpha Vantage." });
    return;
  }

  const revenue = Number(overview.RevenueTTM || 0);
  const ebitda = Number(overview.EBITDA || 0);
  const marketCap = Number(overview.MarketCapitalization || 0);
  const pe = Number(overview.PERatio || 0);
  const evRevenue = Number(overview.EVToRevenue || 0);
  const evEbitda = Number(overview.EVToEBITDA || 0);
  const enterpriseValue = evRevenue && revenue ? evRevenue * revenue : evEbitda && ebitda ? evEbitda * ebitda : marketCap;
  const netIncome = pe && marketCap ? marketCap / pe : 0;

  sendJson(res, 200, {
    company: overview.Name || symbol,
    ticker: overview.Symbol || symbol,
    price: Number(quote["Global Quote"]?.["05. price"] || 0),
    marketCap,
    enterpriseValue,
    revenue,
    ebitda,
    netIncome
  });
}

async function resolveAlphaSymbol(query, apiKey) {
  if (/^[A-Za-z.\-]{1,10}$/.test(query.trim())) {
    return query.trim().toUpperCase();
  }

  const data = await fetchAlpha({ function: "SYMBOL_SEARCH", keywords: query, apikey: apiKey });
  const best = Array.isArray(data.bestMatches) ? data.bestMatches[0] : null;
  if (!best || !best["1. symbol"]) {
    throw new Error("No Alpha Vantage symbol match found.");
  }
  return best["1. symbol"];
}

async function fetchAlpha(params) {
  const url = new URL("https://www.alphavantage.co/query");
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Alpha Vantage request failed with ${response.status}.`);
  }
  return response.json();
}

function serveStatic(requestPath, res) {
  const relativePath = requestPath === "/" ? "/index.html" : requestPath;
  const safePath = path.normalize(relativePath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(ROOT, safePath);

  if (!filePath.startsWith(ROOT)) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }

  fs.readFile(filePath, (error, buffer) => {
    if (error) {
      if (error.code === "ENOENT") {
        sendJson(res, 404, { error: "Not found" });
        return;
      }
      sendJson(res, 500, { error: "Unable to read file" });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    res.end(buffer);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(JSON.stringify(payload));
}
