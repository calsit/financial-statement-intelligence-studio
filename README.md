# Financial Statement Intelligence Studio

A bilingual equity-research workflow demo that combines structured financial parsing, annual-report analysis, web research, LLM-style qualitative output, and peer valuation comparison in one lightweight interface.

## Overview

This project is designed as a portfolio piece for finance, fintech, research, and AI application roles. It turns raw company inputs into a more analyst-like workflow:

- upload financial statements
- extract key ratios and trends
- analyze annual-report text
- run web research through pluggable APIs
- compare peer valuation multiples
- generate memo-style output

## Core features

- Financial statement ingestion via `CSV` or `JSON`
- Automatic calculation of revenue growth, margins, leverage, and free cash flow
- Annual-report text analysis from `TXT` or browser-side PDF extraction
- Real LLM integration through OpenAI-compatible APIs
- Web research integration with `GNews` and `Alpha Vantage`
- Local proxy support to avoid common browser `CORS` issues
- Peer comparison with selectable subject company and custom comparable set
- Add-company flow for pulling new peers from `Alpha Vantage`
- Editable field mapping for inconsistent source column names
- English and Chinese UI toggle

## Tech setup

- Frontend: plain `HTML`, `CSS`, and `JavaScript`
- Local proxy: plain `Node.js` using built-in modules only
- No frontend framework
- No external runtime dependencies required

## Project structure

```text
.
|-- app/
|   |-- index.html
|   |-- app.js
|   `-- styles.css
|-- data/
|   |-- sample-annual-report.txt
|   |-- sample-annual-report-alt.txt
|   |-- sample-financials.csv
|   |-- sample-financials-alt.csv
|   |-- sample-peer-comps.csv
|   `-- sample-peer-comps-alt.csv
|-- scripts/
|   |-- server.js
|   `-- stop-server.bat
|-- start.bat
`-- README.md
```

## Run locally

For offline UI testing only, you can open:

```text
app/index.html
```

For full functionality, especially `Web Research` and local proxy routing:

```powershell
node scripts/server.js
```

Then open:

```text
http://localhost:3000
```

On Windows, you can also use:

- `start.bat` to launch the local server and open the app
- `scripts/stop-server.bat` to stop anything listening on port `3000`

## Sample data

Demo datasets are stored in `data/`:

- `sample-financials.csv`
- `sample-financials-alt.csv`
- `sample-annual-report.txt`
- `sample-annual-report-alt.txt`
- `sample-peer-comps.csv`
- `sample-peer-comps-alt.csv`

## Web research setup

### GNews

- Search Base URL: `https://gnews.io/api/v4/search`
- Response Format: `GNews`
- Request Route: `Local Proxy`
- Company or Ticker: for example `Microsoft`
- Search API Key: your `GNews` API key

### Alpha Vantage

- Search Base URL: `https://www.alphavantage.co/query`
- Response Format: `Alpha Vantage`
- Alpha Function: `NEWS_SENTIMENT`, `OVERVIEW`, `INCOME_STATEMENT`, `BALANCE_SHEET`, or `CASH_FLOW`
- Request Route: `Local Proxy`
- Company or Ticker: for example `MSFT`
- Search API Key: your `Alpha Vantage` API key

You can also use the `Add Company` control inside `Peer Comparison` to fetch and append a comparable company through the same `Alpha Vantage` key.

## Expected financial input

Expected base financial fields:

```text
year,revenue,grossProfit,operatingIncome,netIncome,cash,assets,liabilities,equity,operatingCashFlow,capex
```

Example JSON:

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

If source files use different field names, the app supports alias mapping through the `Field Mapping` modal.

## Resume-ready description

Use this as a concise bullet:

> Built a financial statement intelligence platform that parses structured company financials, analyzes annual-report text, integrates live company research APIs, supports peer valuation comparison, and generates memo-ready investment commentary.
