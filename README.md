# Financial Statement Intelligence Studio

A zero-dependency portfolio project for finance and fintech applications. The app turns uploaded financial statement data into an analyst-style dashboard with ratio analysis, memo generation, and simple trend visualization.

## What it does

- Uploads `CSV` or `JSON` financial statement datasets
- Calculates revenue growth, margins, leverage, and free cash flow
- Surfaces strengths and risks based on trend rules
- Produces a ready-to-use investment memo summary
- Displays a simple chart and normalized financial table

## Expected input

The CSV header should include:

```text
year,revenue,grossProfit,operatingIncome,netIncome,cash,assets,liabilities,equity,operatingCashFlow,capex
```

Example JSON format:

```json
{
  "company": "Example Corp",
  "currency": "USD",
  "periods": [
    {
      "year": 2022,
      "revenue": 920000000,
      "grossProfit": 418000000,
      "operatingIncome": 110000000,
      "netIncome": 82000000,
      "cash": 175000000,
      "assets": 1250000000,
      "liabilities": 540000000,
      "equity": 710000000,
      "operatingCashFlow": 136000000,
      "capex": 42000000
    }
  ]
}
```

## Run locally

You can still open `index.html` directly in a browser for offline demo features.

If you want `Web Research` with a local proxy for services like GNews, run:

```powershell
node server.js
```

Then open:

```text
http://localhost:3000
```

On Windows, you can also just double-click:

- `start.bat` to launch the local server and open the app
- `stop-server.bat` to stop anything listening on port `3000`

Recommended `GNews` settings in the app:

- Search Base URL: `https://gnews.io/api/v4/search`
- Response Format: `GNews`
- Request Route: `Local Proxy`
- Company or Ticker: for example `Microsoft`
- Search API Key: your GNews API key

Recommended `Alpha Vantage` settings in the app:

- Search Base URL: `https://www.alphavantage.co/query`
- Response Format: `Alpha Vantage`
- Alpha Function: `NEWS_SENTIMENT` or `OVERVIEW`
- Request Route: `Local Proxy`
- Company or Ticker: for example `MSFT`
- Search API Key: your Alpha Vantage API key

You can also use the `Add Company` control inside `Peer Comparison` to fetch and append a comparable company using the Alpha Vantage API key already configured in `Web Research`.

## Resume angle

You can describe this project as:

> Built a financial statement analysis tool that parses structured company financials, computes key ratios, visualizes trends, and generates memo-ready investment commentary.
