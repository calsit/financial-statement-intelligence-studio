const sampleDataset = {
  company: "Aurora Consumer Technologies",
  currency: "USD",
  periods: [
    { year: 2022, revenue: 920000000, grossProfit: 418000000, operatingIncome: 110000000, netIncome: 82000000, cash: 175000000, assets: 1250000000, liabilities: 540000000, equity: 710000000, operatingCashFlow: 136000000, capex: 42000000 },
    { year: 2023, revenue: 1080000000, grossProfit: 501000000, operatingIncome: 141000000, netIncome: 107000000, cash: 204000000, assets: 1385000000, liabilities: 574000000, equity: 811000000, operatingCashFlow: 164000000, capex: 47000000 },
    { year: 2024, revenue: 1265000000, grossProfit: 601000000, operatingIncome: 182000000, netIncome: 145000000, cash: 248000000, assets: 1534000000, liabilities: 612000000, equity: 922000000, operatingCashFlow: 201000000, capex: 56000000 }
  ]
};

const sampleReportText = `Aurora Consumer Technologies delivered another year of strong demand across premium devices and subscription services. Management highlighted resilient consumer engagement, improving mix, and healthy renewal rates in its software ecosystem. Gross margin expanded as supply chain normalization and pricing discipline offset higher marketing investment.

The company continues to prioritize disciplined capital allocation, with operating cash flow increasing on the back of better working capital management. Management noted that international expansion and enterprise partnerships remain important growth drivers for the coming year.

Key watch items include rising competition in connected devices, foreign exchange volatility, and the risk that channel inventory normalization could weigh on near-term revenue conversion. The annual report also emphasized continued investment in AI-enabled product features, cyber security, and regional compliance capabilities.`;

const samplePeers = [
  { company: "Aurora Consumer Technologies", ticker: "ACT", price: 42.6, marketCap: 4950000000, enterpriseValue: 5170000000, revenue: 1265000000, ebitda: 241000000, netIncome: 145000000 },
  { company: "Nova Devices", ticker: "NOVA", price: 38.2, marketCap: 4620000000, enterpriseValue: 4890000000, revenue: 1380000000, ebitda: 212000000, netIncome: 118000000 },
  { company: "Helix Consumer Systems", ticker: "HLX", price: 51.1, marketCap: 5880000000, enterpriseValue: 6210000000, revenue: 1495000000, ebitda: 287000000, netIncome: 164000000 },
  { company: "Pioneer Smart Living", ticker: "PSL", price: 29.4, marketCap: 3310000000, enterpriseValue: 3560000000, revenue: 1120000000, ebitda: 176000000, netIncome: 93000000 }
];

const requiredFields = ["year", "revenue", "grossProfit", "operatingIncome", "netIncome", "cash", "assets", "liabilities", "equity", "operatingCashFlow", "capex"];
const peerFields = ["company", "ticker", "price", "marketCap", "enterpriseValue", "revenue", "ebitda", "netIncome"];
const currencySymbols = { USD: "$", GBP: "GBP ", EUR: "EUR ", CNY: "CNY " };
const defaultFinancialAliases = {
  year: ["fy", "fiscal_year"],
  revenue: ["sales", "total_revenue"],
  grossProfit: ["gross_profit"],
  operatingIncome: ["ebit", "operating_profit"],
  netIncome: ["net_profit", "profit_after_tax"],
  cash: ["cash_balance", "cash_and_equivalents"],
  assets: ["total_assets"],
  liabilities: ["total_liabilities"],
  equity: ["shareholders_equity", "total_equity"],
  operatingCashFlow: ["ocf", "cash_from_operations", "operating_cash_flow"],
  capex: ["capital_expenditure", "capital_expenditures"]
};
const defaultPeerAliases = {
  company: ["name"],
  ticker: ["symbol"],
  price: ["share_price"],
  marketCap: ["market_cap", "marketcapitalization"],
  enterpriseValue: ["ev", "enterprise_value"],
  revenue: ["sales", "total_revenue"],
  ebitda: ["adj_ebitda"],
  netIncome: ["net_profit", "profit"]
};

const translations = {
  en: {
    language: "en", heroEyebrow: "AI Finance Portfolio Project", heroTitle: "Financial Statement Intelligence Studio", heroText: "Upload financial data, annual-report text, and peer valuation comps to generate an analyst-style dashboard.",
    financialUploadLabel: "Financial dataset", uploadFinanceBtn: "Upload CSV or JSON", loadSampleBtn: "Load Demo Dataset", financialHelper: "Expected fields:",
    reportUploadLabel: "Annual report text", uploadReportBtn: "Upload PDF or TXT", loadReportSampleBtn: "Load Demo Report", reportHelper: "PDF parsing is browser-side best effort. Paste text below if extraction is partial.",
    peerUploadLabel: "Peer valuation comps", uploadPeerBtn: "Upload Peer CSV", loadPeerSampleBtn: "Load Demo Comps", peerHelper: "Expected fields:",
    snapshotLabel: "Company Snapshot", trendLabel: "Trend Monitor", trendTitle: "Revenue vs. Net Income", analysisLabel: "Auto Summary", analysisTitle: "Analyst Notes", highlightsTitle: "Highlights", risksTitle: "Risks",
    reportTextLabel: "Report Intelligence", reportTextTitle: "Annual Report Text", analyzeReportBtn: "Analyze Text", reportSummaryLabel: "Qualitative Readout", reportSummaryTitle: "LLM-Style Summary", reportSentimentTitle: "Management Tone", reportSignalsTitle: "Key Signals", reportWatchTitle: "Watch Items",
    llmConfigLabel: "LLM Integration", llmConfigTitle: "OpenAI-Compatible API", apiBaseLabel: "Base URL", apiModelLabel: "Model", apiKeyLabel: "API Key", apiModeLabel: "API Mode", llmHelper: "Keys stay in your browser via local storage. Use an OpenAI-compatible endpoint with CORS enabled.", runLlmBtn: "Run LLM Analysis", llmIdle: "Using local heuristic summary. Configure an API to run a real LLM analysis.", llmRunning: "Calling LLM...", llmSuccess: "LLM analysis completed.", llmErrorPrefix: "LLM request failed:",
    openMappingBtn: "Field Mapping", closeMappingBtn: "Close", openResearchBtn: "Web Research", closeResearchBtn: "Close",
    webResearchLabel: "Web Research", webResearchTitle: "Company Search Results", researchConfigLabel: "Web Research Setup", researchConfigTitle: "Pluggable Search API", searchBaseLabel: "Search Base URL", searchApiKeyLabel: "Search API Key", searchQueryLabel: "Company or Ticker", searchModeLabel: "Response Format", alphaFunctionLabel: "Alpha Function", searchProxyLabel: "Request Route", runResearchBtn: "Run Search", applyResearchBtn: "Append to Report Text", researchHelper: "For GNews, choose GNews mode. For Alpha Vantage, choose Alpha Vantage mode and a function such as NEWS_SENTIMENT or OVERVIEW. If browser requests are blocked, switch Request Route to Local Proxy and run `node server.js`.", researchIdle: "Configure a search endpoint to fetch live company/news context.", researchRunning: "Running search...", researchSuccess: "Search completed.", researchErrorPrefix: "Search request failed:", researchEmpty: "No web research loaded yet.",
    fieldMappingLabel: "Field Mapping", fieldMappingTitle: "Editable Column Aliases", financialAliasLabel: "Financial aliases", peerAliasLabel: "Peer comp aliases", fieldMappingHelper: "One line per standard field. Format: standard=alias1,alias2",
    subjectCompanyLabel: "Subject Company", compareCompaniesLabel: "Compare Companies", compareSearchPlaceholder: "Search companies", selectAllPeersBtn: "Select all", clearPeersBtn: "Clear all", compareSummaryText: "Selected {count} companies", peerSearchPlaceholder: "Search company or ticker to add", addPeerBtn: "Add Company", peerSearchHelper: "Uses the Alpha Vantage API key from Web Research settings.", peerSearchIdle: "", peerSearchAdding: "Adding company...", peerSearchSuccess: "Company added to peer comparison.", peerSearchErrorPrefix: "Peer search failed:",
    valuationLabel: "Relative Valuation", valuationTitle: "Peer Comparison", memoLabel: "Memo Builder", memoTitle: "Investment Brief", copyMemoBtn: "Copy Memo", copiedLabel: "Copied", dataPreviewLabel: "Data Preview", dataPreviewTitle: "Parsed Financial Table",
    awaitingDataset: "Awaiting dataset", reportPlaceholder: "Paste extracted annual-report text here, or upload a PDF/TXT file above.", emptyList: "Load data to populate this section.", emptyValuation: "Load peer comps to populate relative valuation.", noPriorComparison: "No prior period comparison",
    noReportTone: "No annual report text loaded yet.", noReportSummary: "Upload or paste annual report text to generate qualitative insights.", valuationMedian: "Peer median EV / Revenue", valuationPremium: "Subject premium vs. median", valuationCheapest: "Cheapest peer on EV / Revenue",
    managementTonePositive: "Management tone reads constructive, with language centered on demand, margin discipline, and expansion.", managementToneBalanced: "Management tone appears balanced, mixing growth language with operational caution and competitive awareness.", managementToneCautious: "Management tone reads cautious, with heavier emphasis on pressure points, volatility, and execution risk.",
    reportSignalsFallback: "The report text indicates a business balancing growth initiatives with execution discipline.", reportWatchFallback: "Further diligence should focus on competition, customer concentration, and delivery against guidance.",
    memoExecutive: "Executive summary:", memoStrengths: "Key strengths:", memoRisks: "Key risks:", memoQualitative: "Qualitative readout:", memoValuation: "Relative valuation:", memoPreliminary: "Preliminary view:", memoPreliminaryText: "The uploaded materials suggest a company with visible profitability and manageable leverage, but a full recommendation would still require valuation work, peer benchmarking, and qualitative diligence on business concentration, management, and industry outlook."
  },
  zh: {
    language: "zh", heroEyebrow: "AI 金融作品项目", heroTitle: "财报智能分析工作台", heroText: "上传财务数据、年报文本和可比公司估值数据，自动生成更像研究员产出的分析看板。",
    financialUploadLabel: "财务数据", uploadFinanceBtn: "上传 CSV 或 JSON", loadSampleBtn: "加载示例财务数据", financialHelper: "字段要求：",
    reportUploadLabel: "年报文本", uploadReportBtn: "上传 PDF 或 TXT", loadReportSampleBtn: "加载示例年报", reportHelper: "PDF 解析为浏览器端尽力提取；如果文本不完整，可直接粘贴年报内容。",
    peerUploadLabel: "可比公司估值", uploadPeerBtn: "上传 Peer CSV", loadPeerSampleBtn: "加载示例可比公司", peerHelper: "字段要求：",
    snapshotLabel: "公司概览", trendLabel: "趋势监控", trendTitle: "收入与净利润走势", analysisLabel: "自动摘要", analysisTitle: "分析师笔记", highlightsTitle: "亮点", risksTitle: "风险",
    reportTextLabel: "年报智能分析", reportTextTitle: "年报文本输入", analyzeReportBtn: "分析文本", reportSummaryLabel: "定性解读", reportSummaryTitle: "LLM 风格摘要", reportSentimentTitle: "管理层语气", reportSignalsTitle: "关键信号", reportWatchTitle: "关注事项",
    llmConfigLabel: "LLM 接口", llmConfigTitle: "OpenAI 兼容接口", apiBaseLabel: "Base URL", apiModelLabel: "模型", apiKeyLabel: "API Key", apiModeLabel: "接口模式", llmHelper: "密钥只保存在浏览器本地存储中。请使用支持 CORS 的 OpenAI-compatible 接口。", runLlmBtn: "运行 LLM 分析", llmIdle: "当前使用本地规则摘要。填写接口后可运行真实 LLM 分析。", llmRunning: "正在请求 LLM...", llmSuccess: "LLM 分析完成。", llmErrorPrefix: "LLM 请求失败：",
    openMappingBtn: "字段映射", closeMappingBtn: "关闭", openResearchBtn: "联网搜索", closeResearchBtn: "关闭",
    webResearchLabel: "联网搜索", webResearchTitle: "公司搜索结果", researchConfigLabel: "搜索接口设置", researchConfigTitle: "可插拔搜索 API", searchBaseLabel: "搜索接口 URL", searchApiKeyLabel: "搜索 API Key", searchQueryLabel: "公司名或股票代码", searchModeLabel: "返回格式", alphaFunctionLabel: "Alpha 功能", searchProxyLabel: "请求路径", runResearchBtn: "开始搜索", applyResearchBtn: "追加到年报文本", researchHelper: "GNews 官方接口请选择 GNews 模式。Alpha Vantage 请选择 Alpha Vantage 模式，并选择 NEWS_SENTIMENT 或 OVERVIEW 等功能。如果浏览器直连被拦，改成 Local Proxy，并运行 `node server.js`。", researchIdle: "当前还没有联网搜索结果。", researchRunning: "正在搜索...", researchSuccess: "搜索完成。", researchErrorPrefix: "搜索请求失败：", researchEmpty: "尚未加载联网搜索结果。",
    fieldMappingLabel: "字段映射", fieldMappingTitle: "可编辑字段别名", financialAliasLabel: "财务字段别名", peerAliasLabel: "可比公司字段别名", fieldMappingHelper: "每行一个标准字段，格式：standard=alias1,alias2",
    subjectCompanyLabel: "主体公司", compareCompaniesLabel: "对比公司", compareSearchPlaceholder: "搜索公司", selectAllPeersBtn: "全选", clearPeersBtn: "清空", compareSummaryText: "已选 {count} 家公司", peerSearchPlaceholder: "搜索要添加的公司或 ticker", addPeerBtn: "添加公司", peerSearchHelper: "使用 Web Research 设置里的 Alpha Vantage API key。", peerSearchIdle: "", peerSearchAdding: "正在添加公司...", peerSearchSuccess: "公司已加入可比对比。", peerSearchErrorPrefix: "可比公司搜索失败：",
    valuationLabel: "相对估值", valuationTitle: "可比公司对比", memoLabel: "备忘录生成", memoTitle: "投资简报", copyMemoBtn: "复制简报", copiedLabel: "已复制", dataPreviewLabel: "数据预览", dataPreviewTitle: "解析后的财务表",
    awaitingDataset: "等待上传数据", reportPlaceholder: "在这里粘贴提取后的年报文本，或使用上方按钮上传 PDF/TXT。", emptyList: "加载数据后，这里会自动生成内容。", emptyValuation: "加载可比公司数据后，这里会显示相对估值结果。", noPriorComparison: "暂无可比期间",
    noReportTone: "尚未加载年报文本。", noReportSummary: "上传或粘贴年报文本后，这里会生成定性分析。", valuationMedian: "可比公司 EV/Revenue 中位数", valuationPremium: "主体相对中位数溢价", valuationCheapest: "EV/Revenue 最低的可比公司",
    managementTonePositive: "管理层整体语气偏积极，重点强调需求、利润率改善和扩张机会。", managementToneBalanced: "管理层语气较为平衡，既强调增长，也提到执行与竞争层面的谨慎点。", managementToneCautious: "管理层语气偏谨慎，对压力、波动和执行风险的提及明显更多。",
    reportSignalsFallback: "文本整体显示公司在推进增长计划的同时，仍然保持一定的经营纪律。", reportWatchFallback: "后续尽调应重点关注竞争格局、客户集中度以及管理层指引兑现情况。",
    memoExecutive: "执行摘要：", memoStrengths: "主要亮点：", memoRisks: "主要风险：", memoQualitative: "定性解读：", memoValuation: "相对估值：", memoPreliminary: "初步判断：", memoPreliminaryText: "当前上传材料显示公司具备一定盈利能力和可控杠杆，但要形成完整投资建议，仍需结合估值、可比公司对比以及对行业、管理层和业务质量的进一步尽调。"
  }
};

const elements = {
  fileInput: document.getElementById("fileInput"), reportFileInput: document.getElementById("reportFileInput"), peerFileInput: document.getElementById("peerFileInput"),
  loadSampleBtn: document.getElementById("loadSampleBtn"), loadReportSampleBtn: document.getElementById("loadReportSampleBtn"), loadPeerSampleBtn: document.getElementById("loadPeerSampleBtn"), analyzeReportBtn: document.getElementById("analyzeReportBtn"),
  companyTitle: document.getElementById("companyTitle"), statusPills: document.getElementById("statusPills"), metricsGrid: document.getElementById("metricsGrid"), highlightsList: document.getElementById("highlightsList"), risksList: document.getElementById("risksList"),
  reportInput: document.getElementById("reportInput"), reportTone: document.getElementById("reportTone"), reportSignalsList: document.getElementById("reportSignalsList"), reportWatchList: document.getElementById("reportWatchList"),
  financialAliasInput: document.getElementById("financialAliasInput"), peerAliasInput: document.getElementById("peerAliasInput"),
  apiBaseInput: document.getElementById("apiBaseInput"), apiModelInput: document.getElementById("apiModelInput"), apiKeyInput: document.getElementById("apiKeyInput"), apiModeSelect: document.getElementById("apiModeSelect"), runLlmBtn: document.getElementById("runLlmBtn"), llmStatus: document.getElementById("llmStatus"),
  searchBaseInput: document.getElementById("searchBaseInput"), searchApiKeyInput: document.getElementById("searchApiKeyInput"), searchQueryInput: document.getElementById("searchQueryInput"), searchModeSelect: document.getElementById("searchModeSelect"), alphaFunctionSelect: document.getElementById("alphaFunctionSelect"), searchProxySelect: document.getElementById("searchProxySelect"), runResearchBtn: document.getElementById("runResearchBtn"), applyResearchBtn: document.getElementById("applyResearchBtn"), researchStatus: document.getElementById("researchStatus"), researchSummary: document.getElementById("researchSummary"), researchResults: document.getElementById("researchResults"),
  openMappingBtn: document.getElementById("openMappingBtn"), closeMappingBtn: document.getElementById("closeMappingBtn"), mappingModal: document.getElementById("mappingModal"),
  openResearchBtn: document.getElementById("openResearchBtn"), closeResearchBtn: document.getElementById("closeResearchBtn"), researchModal: document.getElementById("researchModal"),
  valuationSummary: document.getElementById("valuationSummary"), peerSearchInput: document.getElementById("peerSearchInput"), addPeerBtn: document.getElementById("addPeerBtn"), peerSearchHelper: document.getElementById("peerSearchHelper"), peerSearchStatus: document.getElementById("peerSearchStatus"), subjectCompanySelect: document.getElementById("subjectCompanySelect"), compareCompaniesSelect: document.getElementById("compareCompaniesSelect"), compareSearchInput: document.getElementById("compareSearchInput"), compareSummaryText: document.getElementById("compareSummaryText"), selectAllPeersBtn: document.getElementById("selectAllPeersBtn"), clearPeersBtn: document.getElementById("clearPeersBtn"), peerTableHead: document.querySelector("#peerTable thead"), peerTableBody: document.querySelector("#peerTable tbody"),
  memoOutput: document.getElementById("memoOutput"), copyMemoBtn: document.getElementById("copyMemoBtn"), dataTableHead: document.querySelector("#dataTable thead"), dataTableBody: document.querySelector("#dataTable tbody"), chart: document.getElementById("trendChart"),
  langEnBtn: document.getElementById("langEnBtn"), langZhBtn: document.getElementById("langZhBtn"),
  texts: {
    eyebrowLabel: document.getElementById("eyebrowLabel"), heroTitle: document.getElementById("heroTitle"), heroText: document.getElementById("heroText"),
    financialUploadLabel: document.getElementById("financialUploadLabel"), uploadFinanceBtn: document.getElementById("uploadFinanceBtn"), reportUploadLabel: document.getElementById("reportUploadLabel"), uploadReportBtn: document.getElementById("uploadReportBtn"),
    peerUploadLabel: document.getElementById("peerUploadLabel"), uploadPeerBtn: document.getElementById("uploadPeerBtn"), financialHelper: document.getElementById("financialHelper"), reportHelper: document.getElementById("reportHelper"), peerHelper: document.getElementById("peerHelper"),
    snapshotLabel: document.getElementById("snapshotLabel"), trendLabel: document.getElementById("trendLabel"), trendTitle: document.getElementById("trendTitle"), analysisLabel: document.getElementById("analysisLabel"), analysisTitle: document.getElementById("analysisTitle"),
    highlightsTitle: document.getElementById("highlightsTitle"), risksTitle: document.getElementById("risksTitle"), reportTextLabel: document.getElementById("reportTextLabel"), reportTextTitle: document.getElementById("reportTextTitle"), analyzeReportBtn: document.getElementById("analyzeReportBtn"),
    reportSummaryLabel: document.getElementById("reportSummaryLabel"), reportSummaryTitle: document.getElementById("reportSummaryTitle"), reportSentimentTitle: document.getElementById("reportSentimentTitle"), reportSignalsTitle: document.getElementById("reportSignalsTitle"), reportWatchTitle: document.getElementById("reportWatchTitle"),
    llmConfigLabel: document.getElementById("llmConfigLabel"), llmConfigTitle: document.getElementById("llmConfigTitle"), apiBaseLabel: document.getElementById("apiBaseLabel"), apiModelLabel: document.getElementById("apiModelLabel"), apiKeyLabel: document.getElementById("apiKeyLabel"), apiModeLabel: document.getElementById("apiModeLabel"), llmHelper: document.getElementById("llmHelper"),
    webResearchLabel: document.getElementById("webResearchLabel"), webResearchTitle: document.getElementById("webResearchTitle"), researchConfigLabel: document.getElementById("researchConfigLabel"), researchConfigTitle: document.getElementById("researchConfigTitle"), searchBaseLabel: document.getElementById("searchBaseLabel"), searchApiKeyLabel: document.getElementById("searchApiKeyLabel"), searchQueryLabel: document.getElementById("searchQueryLabel"), searchModeLabel: document.getElementById("searchModeLabel"), alphaFunctionLabel: document.getElementById("alphaFunctionLabel"), searchProxyLabel: document.getElementById("searchProxyLabel"), researchHelper: document.getElementById("researchHelper"),
    fieldMappingLabel: document.getElementById("fieldMappingLabel"), fieldMappingTitle: document.getElementById("fieldMappingTitle"), financialAliasLabel: document.getElementById("financialAliasLabel"), peerAliasLabel: document.getElementById("peerAliasLabel"), fieldMappingHelper: document.getElementById("fieldMappingHelper"), subjectCompanyLabel: document.getElementById("subjectCompanyLabel"), compareCompaniesLabel: document.getElementById("compareCompaniesLabel"),
    valuationLabel: document.getElementById("valuationLabel"), valuationTitle: document.getElementById("valuationTitle"), memoLabel: document.getElementById("memoLabel"), memoTitle: document.getElementById("memoTitle"), dataPreviewLabel: document.getElementById("dataPreviewLabel"), dataPreviewTitle: document.getElementById("dataPreviewTitle")
  }
};

const persistedConfig = loadLlmConfig();
const persistedAliases = loadAliasConfig();
const persistedSearch = loadSearchConfig();
const state = { language: "en", financialDataset: sampleDataset, reportText: sampleReportText, peerDataset: samplePeers, selectedSubjectCompany: "", selectedPeerCompanies: [], compareSearchTerm: "", peerSearchStatus: "", llmConfig: persistedConfig, searchConfig: persistedSearch, aliases: persistedAliases, llmSummary: null, llmStatus: "", llmLoading: false, mappingModalOpen: false, researchModalOpen: false, researchLoading: false, researchStatus: "", researchResults: [] };

elements.loadSampleBtn.addEventListener("click", () => { state.financialDataset = sampleDataset; renderApp(); });
elements.loadReportSampleBtn.addEventListener("click", () => { state.reportText = sampleReportText; elements.reportInput.value = sampleReportText; renderApp(); });
elements.loadPeerSampleBtn.addEventListener("click", () => { state.peerDataset = samplePeers; resetPeerSelection(); renderApp(); });
elements.analyzeReportBtn.addEventListener("click", () => { state.reportText = elements.reportInput.value.trim(); state.llmSummary = null; state.llmStatus = t().llmIdle; renderApp(); });
elements.langEnBtn.addEventListener("click", () => { state.language = "en"; renderApp(); });
elements.langZhBtn.addEventListener("click", () => { state.language = "zh"; renderApp(); });
elements.runLlmBtn.addEventListener("click", runLlmAnalysis);
elements.openMappingBtn.addEventListener("click", () => { state.mappingModalOpen = true; renderApp(); });
elements.closeMappingBtn.addEventListener("click", () => { state.mappingModalOpen = false; renderApp(); });
elements.openResearchBtn.addEventListener("click", () => { state.researchModalOpen = true; renderApp(); });
elements.closeResearchBtn.addEventListener("click", () => { state.researchModalOpen = false; renderApp(); });
elements.runResearchBtn.addEventListener("click", runWebResearch);
elements.applyResearchBtn.addEventListener("click", appendResearchToReport);
elements.subjectCompanySelect.addEventListener("change", () => {
  const previousSubject = state.selectedSubjectCompany;
  state.selectedSubjectCompany = elements.subjectCompanySelect.value;
  if (previousSubject && previousSubject !== state.selectedSubjectCompany && !state.selectedPeerCompanies.includes(previousSubject)) {
    state.selectedPeerCompanies = [...state.selectedPeerCompanies, previousSubject];
  }
  state.selectedPeerCompanies = state.selectedPeerCompanies.filter((company) => company !== state.selectedSubjectCompany);
  renderApp();
});
elements.addPeerBtn.addEventListener("click", addPeerFromSearch);
elements.compareCompaniesSelect.addEventListener("change", () => {
  state.selectedPeerCompanies = Array.from(elements.compareCompaniesSelect.selectedOptions)
    .map((option) => option.value)
    .filter((company) => company !== state.selectedSubjectCompany);
  renderApp();
});
elements.compareCompaniesSelect.addEventListener("mousedown", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLOptionElement)) return;
  event.preventDefault();
  target.selected = !target.selected;
  state.selectedPeerCompanies = Array.from(elements.compareCompaniesSelect.options)
    .filter((option) => option.selected)
    .map((option) => option.value)
    .filter((company) => company !== state.selectedSubjectCompany);
  renderApp();
});
elements.compareSearchInput.addEventListener("input", () => {
  state.compareSearchTerm = elements.compareSearchInput.value.trim().toLowerCase();
  renderApp();
});
elements.selectAllPeersBtn.addEventListener("click", () => {
  const visibleCompanies = Array.from(elements.compareCompaniesSelect.options).map((option) => option.value);
  state.selectedPeerCompanies = Array.from(new Set([...state.selectedPeerCompanies, ...visibleCompanies]))
    .filter((company) => company !== state.selectedSubjectCompany);
  renderApp();
});
elements.clearPeersBtn.addEventListener("click", () => {
  const visibleCompanies = new Set(Array.from(elements.compareCompaniesSelect.options).map((option) => option.value));
  state.selectedPeerCompanies = state.selectedPeerCompanies.filter((company) => !visibleCompanies.has(company));
  renderApp();
});
elements.mappingModal.addEventListener("click", (event) => {
  if (event.target === elements.mappingModal) {
    state.mappingModalOpen = false;
    renderApp();
  }
});
elements.researchModal.addEventListener("click", (event) => {
  if (event.target === elements.researchModal) {
    state.researchModalOpen = false;
    renderApp();
  }
});

["input", "change"].forEach((eventName) => {
  elements.apiBaseInput.addEventListener(eventName, persistLlmConfigFromInputs);
  elements.apiModelInput.addEventListener(eventName, persistLlmConfigFromInputs);
  elements.apiKeyInput.addEventListener(eventName, persistLlmConfigFromInputs);
  elements.apiModeSelect.addEventListener(eventName, persistLlmConfigFromInputs);
  elements.financialAliasInput.addEventListener(eventName, persistAliasConfigFromInputs);
  elements.peerAliasInput.addEventListener(eventName, persistAliasConfigFromInputs);
  elements.searchBaseInput.addEventListener(eventName, persistSearchConfigFromInputs);
  elements.searchApiKeyInput.addEventListener(eventName, persistSearchConfigFromInputs);
  elements.searchQueryInput.addEventListener(eventName, persistSearchConfigFromInputs);
  elements.searchModeSelect.addEventListener(eventName, persistSearchConfigFromInputs);
  elements.alphaFunctionSelect.addEventListener(eventName, persistSearchConfigFromInputs);
  elements.searchProxySelect.addEventListener(eventName, persistSearchConfigFromInputs);
});

elements.copyMemoBtn.addEventListener("click", async () => {
  const memo = elements.memoOutput.value;
  if (!memo) return;
  try {
    await navigator.clipboard.writeText(memo);
    elements.copyMemoBtn.textContent = t().copiedLabel;
    window.setTimeout(() => { elements.copyMemoBtn.textContent = t().copyMemoBtn; }, 1200);
  } catch {
    window.alert("Clipboard copy is not available in this browser context.");
  }
});

elements.fileInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    state.financialDataset = file.name.toLowerCase().endsWith(".json") ? parseJsonDataset(text) : parseCsvDataset(text, file.name.replace(/\.[^.]+$/, ""));
    renderApp();
  } catch (error) {
    window.alert(error.message);
  } finally {
    event.target.value = "";
  }
});

elements.reportFileInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const text = file.name.toLowerCase().endsWith(".pdf") ? await parsePdfFile(file) : await file.text();
    state.reportText = text.trim();
    elements.reportInput.value = state.reportText;
    renderApp();
  } catch (error) {
    window.alert(error.message);
  } finally {
    event.target.value = "";
  }
});

elements.peerFileInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    state.peerDataset = parsePeerCsv(await file.text());
    resetPeerSelection();
    renderApp();
  } catch (error) {
    window.alert(error.message);
  } finally {
    event.target.value = "";
  }
});

function t() { return translations[state.language]; }

function resetPeerSelection() {
  const companies = state.peerDataset.map((peer) => peer.company);
  state.selectedSubjectCompany = companies.find((company) => company.toLowerCase() === state.financialDataset.company.toLowerCase()) || companies[0] || "";
  state.selectedPeerCompanies = companies.filter((company) => company !== state.selectedSubjectCompany);
}

function ensurePeerSelection(peers, companyName) {
  const companies = peers.map((peer) => peer.company);
  if (!state.selectedSubjectCompany || !companies.includes(state.selectedSubjectCompany)) {
    state.selectedSubjectCompany = companies.find((company) => company.toLowerCase() === companyName.toLowerCase()) || companies[0] || "";
  }

  state.selectedPeerCompanies = state.selectedPeerCompanies.filter((company) => companies.includes(company) && company !== state.selectedSubjectCompany);
}

function loadAliasConfig() {
  try {
    const raw = window.localStorage.getItem("finance-field-aliases");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { financial: defaultFinancialAliases, peer: defaultPeerAliases };
}

function loadSearchConfig() {
  try {
    const raw = window.localStorage.getItem("finance-search-config");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { baseUrl: "", apiKey: "", query: "", mode: "generic", alphaFunction: "NEWS_SENTIMENT", route: "direct" };
}

function loadLlmConfig() {
  try {
    const raw = window.localStorage.getItem("finance-llm-config");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { baseUrl: "https://api.openai.com/v1", model: "gpt-5-mini", apiKey: "", mode: "responses" };
}

function persistAliasConfigFromInputs() {
  state.aliases = {
    financial: parseAliasEditor(elements.financialAliasInput.value, defaultFinancialAliases),
    peer: parseAliasEditor(elements.peerAliasInput.value, defaultPeerAliases)
  };
  try {
    window.localStorage.setItem("finance-field-aliases", JSON.stringify(state.aliases));
  } catch {}
}

function persistSearchConfigFromInputs() {
  state.searchConfig = {
    baseUrl: elements.searchBaseInput.value.trim(),
    apiKey: elements.searchApiKeyInput.value.trim(),
    query: elements.searchQueryInput.value.trim(),
    mode: elements.searchModeSelect.value,
    alphaFunction: elements.alphaFunctionSelect.value,
    route: elements.searchProxySelect.value
  };
  try {
    window.localStorage.setItem("finance-search-config", JSON.stringify(state.searchConfig));
  } catch {}
}

function parseAliasEditor(text, defaults) {
  const result = {};
  Object.keys(defaults).forEach((key) => { result[key] = [...defaults[key]]; });
  text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).forEach((line) => {
    const [standard, aliases] = line.split("=");
    if (!standard || !aliases) return;
    result[standard.trim()] = aliases.split(",").map((item) => item.trim()).filter(Boolean);
  });
  return result;
}

function serializeAliasEditor(config, fields) {
  return fields.map((field) => `${field}=${(config[field] || []).join(",")}`).join("\n");
}

function persistLlmConfigFromInputs() {
  state.llmConfig = {
    baseUrl: elements.apiBaseInput.value.trim(),
    model: elements.apiModelInput.value.trim(),
    apiKey: elements.apiKeyInput.value.trim(),
    mode: elements.apiModeSelect.value
  };
  try {
    window.localStorage.setItem("finance-llm-config", JSON.stringify(state.llmConfig));
  } catch {}
}

async function runLlmAnalysis() {
  state.reportText = elements.reportInput.value.trim();
  persistLlmConfigFromInputs();
  if (!state.reportText) {
    state.llmStatus = t().noReportSummary;
    renderApp();
    return;
  }
  if (!state.llmConfig.baseUrl || !state.llmConfig.model || !state.llmConfig.apiKey) {
    state.llmStatus = `${t().llmErrorPrefix} missing base URL, model, or API key.`;
    renderApp();
    return;
  }

  state.llmLoading = true;
  state.llmStatus = t().llmRunning;
  renderApp();

  try {
    const summary = await requestLlmSummary();
    state.llmSummary = summary;
    state.llmStatus = t().llmSuccess;
  } catch (error) {
    state.llmSummary = null;
    state.llmStatus = `${t().llmErrorPrefix} ${error.message}`;
  } finally {
    state.llmLoading = false;
    renderApp();
  }
}

async function runWebResearch() {
  persistSearchConfigFromInputs();
  if (!state.searchConfig.baseUrl || !state.searchConfig.query) {
    state.researchStatus = `${t().researchErrorPrefix} missing search URL or query.`;
    renderApp();
    return;
  }
  if (state.searchConfig.route === "local-proxy" && !/^https?:/i.test(window.location.protocol)) {
    state.researchStatus = `${t().researchErrorPrefix} local proxy requires opening the app from http://localhost:3000, not directly from a file.`;
    renderApp();
    return;
  }
  state.researchLoading = true;
  state.researchStatus = t().researchRunning;
  renderApp();
  try {
    const items = await requestWebResearch();
    state.researchResults = items;
    state.researchStatus = t().researchSuccess;
  } catch (error) {
    state.researchResults = [];
    let detail = error.message;
    if (error.message === "Failed to fetch") {
      detail = state.searchConfig.route === "local-proxy"
        ? "Local proxy was unreachable. Start `node server.js` and open the app at http://localhost:3000."
        : "Network or CORS blocked the browser request. Try a backend proxy if the provider does not allow browser access.";
    }
    state.researchStatus = `${t().researchErrorPrefix} ${detail}`;
  } finally {
    state.researchLoading = false;
    renderApp();
  }
}

async function addPeerFromSearch() {
  const query = elements.peerSearchInput.value.trim();
  const apiKey = state.searchConfig.apiKey;
  if (!query) {
    state.peerSearchStatus = `${t().peerSearchErrorPrefix} missing company or ticker.`;
    renderApp();
    return;
  }
  if (!apiKey) {
    state.peerSearchStatus = `${t().peerSearchErrorPrefix} missing Alpha Vantage API key in Web Research settings.`;
    renderApp();
    return;
  }

  state.peerSearchStatus = t().peerSearchAdding;
  renderApp();

  try {
    const proxyUrl = new URL("/api/peer-search", window.location.origin);
    proxyUrl.searchParams.set("q", query);
    proxyUrl.searchParams.set("apiKey", apiKey);
    const response = await fetch(proxyUrl.toString());
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`${response.status} ${response.statusText} ${text.slice(0, 160)}`.trim());
    }
    const peer = await response.json();
    const normalizedPeer = {
      company: peer.company,
      ticker: peer.ticker,
      price: Number(peer.price),
      marketCap: Number(peer.marketCap),
      enterpriseValue: Number(peer.enterpriseValue),
      revenue: Number(peer.revenue),
      ebitda: Number(peer.ebitda),
      netIncome: Number(peer.netIncome)
    };

    state.peerDataset = [
      ...state.peerDataset.filter((item) => item.company !== normalizedPeer.company && item.ticker !== normalizedPeer.ticker),
      normalizedPeer
    ];

    if (!state.selectedSubjectCompany) {
      state.selectedSubjectCompany = normalizedPeer.company;
    } else if (state.selectedSubjectCompany !== normalizedPeer.company && !state.selectedPeerCompanies.includes(normalizedPeer.company)) {
      state.selectedPeerCompanies = [...state.selectedPeerCompanies, normalizedPeer.company];
    }

    elements.peerSearchInput.value = "";
    state.peerSearchStatus = t().peerSearchSuccess;
  } catch (error) {
    state.peerSearchStatus = `${t().peerSearchErrorPrefix} ${error.message}`;
  } finally {
    renderApp();
  }
}

async function requestWebResearch() {
  const { baseUrl, apiKey, query, mode, alphaFunction, route } = state.searchConfig;
  if (route === "local-proxy") {
    const proxyUrl = new URL("/api/search", window.location.origin);
    proxyUrl.searchParams.set("target", baseUrl);
    proxyUrl.searchParams.set("q", query);
    proxyUrl.searchParams.set("mode", mode);
    proxyUrl.searchParams.set("alphaFunction", alphaFunction);
    if (apiKey) proxyUrl.searchParams.set("apiKey", apiKey);
    const response = await fetch(proxyUrl.toString());
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`${response.status} ${response.statusText} ${text.slice(0, 160)}`.trim());
    }
    return normalizeSearchResults(await response.json(), mode);
  }

  const url = new URL(baseUrl);
  const headers = {};
  if (mode === "alphavantage") {
    url.searchParams.set("function", alphaFunction || "NEWS_SENTIMENT");
    if (alphaFunction === "NEWS_SENTIMENT") {
      url.searchParams.set("tickers", query.toUpperCase());
    } else {
      url.searchParams.set("symbol", query.toUpperCase());
    }
    if (apiKey) url.searchParams.set("apikey", apiKey);
  } else {
    url.searchParams.set("q", query);
  }

  if (mode === "gnews") {
    if (apiKey) url.searchParams.set("apikey", apiKey);
    if (!url.searchParams.has("lang")) url.searchParams.set("lang", "en");
    if (!url.searchParams.has("max")) url.searchParams.set("max", "10");
  } else if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }
  const response = await fetch(url.toString(), { headers });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} ${response.statusText} ${text.slice(0, 160)}`.trim());
  }
  const data = await response.json();
  return normalizeSearchResults(data, mode);
}

function normalizeSearchResults(data, mode) {
  if (mode === "alphavantage") {
    if (Array.isArray(data.feed)) {
      return data.feed.slice(0, 6).map((item) => ({
        title: item.title || "Untitled",
        summary: item.summary || item.overall_sentiment_label || "",
        url: item.url || "",
        source: item.source || "",
        publishedAt: item.time_published || ""
      }));
    }

    if (Array.isArray(data.annualReports) || Array.isArray(data.quarterlyReports)) {
      const reports = Array.isArray(data.annualReports) && data.annualReports.length ? data.annualReports : data.quarterlyReports || [];
      const latest = reports[0] || {};
      const prioritizedKeys = [
        "fiscalDateEnding",
        "totalRevenue",
        "grossProfit",
        "operatingIncome",
        "netIncome",
        "ebitda",
        "totalAssets",
        "totalLiabilities",
        "totalShareholderEquity",
        "operatingCashflow",
        "capitalExpenditures",
        "cashAndCashEquivalentsAtCarryingValue"
      ];

      const summary = prioritizedKeys
        .filter((key) => latest[key] && latest[key] !== "None")
        .slice(0, 6)
        .map((key) => `${key}: ${latest[key]}`);

      return [{
        title: `${data.symbol || data.Symbol || "Alpha Vantage"} ${Array.isArray(data.annualReports) && data.annualReports.length ? "Annual Report Snapshot" : "Quarterly Report Snapshot"}`,
        summary: summary.join(" | "),
        url: "",
        source: "Alpha Vantage",
        publishedAt: latest.fiscalDateEnding || ""
      }];
    }

    const summary = Object.entries(data)
      .filter(([key, value]) => typeof value === "string" && value)
      .slice(0, 8)
      .map(([key, value]) => `${key}: ${value}`);

    return [{
      title: data.Name || data.Symbol || "Alpha Vantage Result",
      summary: summary.join(" | "),
      url: "",
      source: "Alpha Vantage",
      publishedAt: ""
    }];
  }

  if (mode === "newsapi" || mode === "gnews") {
    return (data.articles || []).slice(0, 6).map((item) => ({
      title: item.title || "Untitled",
      summary: item.description || item.content || "",
      url: item.url || "",
      source: item.source?.name || "",
      publishedAt: item.publishedAt || ""
    }));
  }
  const candidates = Array.isArray(data.results) ? data.results : Array.isArray(data.items) ? data.items : Array.isArray(data.articles) ? data.articles : [];
  return candidates.slice(0, 6).map((item) => ({
    title: item.title || item.name || "Untitled",
    summary: item.summary || item.snippet || item.description || "",
    url: item.url || item.link || "",
    source: item.source || item.domain || "",
    publishedAt: item.publishedAt || item.date || ""
  }));
}

function appendResearchToReport() {
  if (!state.researchResults.length) return;
  const text = state.researchResults.map((item) => `${item.title}\n${item.summary}`).join("\n\n");
  state.reportText = [state.reportText, text].filter(Boolean).join("\n\n");
  state.researchModalOpen = false;
  state.llmSummary = null;
  renderApp();
}

async function requestLlmSummary() {
  const { baseUrl, model, apiKey, mode } = state.llmConfig;
  const prompt = buildLlmPrompt();
  const endpoint = `${baseUrl.replace(/\/$/, "")}/${mode === "chat" ? "chat/completions" : "responses"}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`
  };

  const body = mode === "chat"
    ? {
        model,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are an equity research analyst. Return strict JSON only." },
          { role: "user", content: prompt }
        ]
      }
    : {
        model,
        input: [
          {
            role: "system",
            content: [{ type: "input_text", text: "You are an equity research analyst. Return strict JSON only." }]
          },
          {
            role: "user",
            content: [{ type: "input_text", text: prompt }]
          }
        ]
      };

  const response = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify(body) });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${response.status} ${response.statusText} ${errorText.slice(0, 180)}`.trim());
  }

  const data = await response.json();
  const rawText = mode === "chat" ? data.choices?.[0]?.message?.content : extractResponsesText(data);
  if (!rawText) throw new Error("No text content returned by the model.");
  return normalizeLlmSummary(parseMaybeJson(rawText));
}

function buildLlmPrompt() {
  const latest = enrichPeriods(state.financialDataset.periods).slice(-1)[0];
  const peers = enrichPeers(state.peerDataset);
  return [
    "Analyze the following company like an equity research associate.",
    "Return valid JSON with keys: tone, signals, watchItems.",
    'tone must be a short paragraph string.',
    'signals must be an array of 3 concise bullets.',
    'watchItems must be an array of 3 concise bullets.',
    "Keep the analysis grounded in the financial data, annual-report text, and peer valuation context below.",
    "",
    `Language: ${state.language === "zh" ? "Chinese" : "English"}`,
    `Company: ${state.financialDataset.company}`,
    `Latest period revenue: ${latest.revenue}`,
    `Latest period net income: ${latest.netIncome}`,
    `Latest period net margin: ${latest.netMargin}`,
    `Latest period free cash flow: ${latest.freeCashFlow}`,
    `Peer set: ${peers.map((peer) => `${peer.company} EV/Revenue=${peer.evRevenue.toFixed(2)}x EV/EBITDA=${peer.evEbitda.toFixed(2)}x P/E=${peer.pe.toFixed(2)}x`).join("; ")}`,
    "",
    "Annual report text:",
    state.reportText
  ].join("\n");
}

function extractResponsesText(data) {
  if (typeof data.output_text === "string" && data.output_text) return data.output_text;
  const parts = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.text) parts.push(content.text);
      if (content.type === "output_text" && content.text) parts.push(content.text);
    }
  }
  return parts.join("\n").trim();
}

function parseMaybeJson(rawText) {
  try {
    return JSON.parse(rawText);
  } catch {
    const fencedMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fencedMatch) return parseMaybeJson(fencedMatch[1].trim());
    const extracted = extractFirstJsonObject(rawText);
    if (extracted) return JSON.parse(extracted);
    throw new Error("Model response was not valid JSON.");
  }
}

function extractFirstJsonObject(text) {
  let start = -1;
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (start === -1) {
      if (char === "{") {
        start = index;
        depth = 1;
      }
      continue;
    }

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (inString) {
      continue;
    }

    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return text.slice(start, index + 1);
      }
    }
  }

  return null;
}

function normalizeLlmSummary(payload) {
  return {
    tone: typeof payload.tone === "string" ? payload.tone.trim() : t().noReportSummary,
    signals: Array.isArray(payload.signals) ? payload.signals.map((item) => String(item).trim()).filter(Boolean).slice(0, 5) : [t().noReportSummary],
    watchItems: Array.isArray(payload.watchItems) ? payload.watchItems.map((item) => String(item).trim()).filter(Boolean).slice(0, 5) : [t().noReportSummary]
  };
}

function parseJsonDataset(rawText) {
  const parsed = JSON.parse(rawText);
  if (!parsed.periods || !Array.isArray(parsed.periods)) throw new Error("JSON format should include a top-level periods array.");
  return normalizeDataset(parsed.company || "Uploaded Company", parsed.periods, parsed.currency || "USD");
}

function parseCsvDataset(rawText, fallbackName) {
  const lines = rawText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length < 2) throw new Error("CSV needs a header row and at least one data row.");
  const headers = splitCsvLine(lines[0]).map((header) => header.trim());
  const canonicalHeaders = headers.map((header) => mapHeaderToCanonical(header, state.aliases.financial));
  const periods = lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    return canonicalHeaders.reduce((row, header, index) => {
      row[header] = values[index];
      return row;
    }, {});
  });
  return normalizeDataset(fallbackName, periods, "USD");
}

function parsePeerCsv(rawText) {
  const lines = rawText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length < 2) throw new Error("Peer CSV needs a header row and at least one data row.");
  const headers = splitCsvLine(lines[0]).map((header) => header.trim());
  const canonicalHeaders = headers.map((header) => mapHeaderToCanonical(header, state.aliases.peer));
  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    const row = canonicalHeaders.reduce((item, header, index) => {
      item[header] = values[index];
      return item;
    }, {});
    peerFields.forEach((field) => {
      if (!(field in row)) throw new Error(`Missing field "${field}" in peer CSV.`);
    });
    return {
      company: row.company,
      ticker: row.ticker,
      price: Number(row.price),
      marketCap: Number(row.marketCap),
      enterpriseValue: Number(row.enterpriseValue),
      revenue: Number(row.revenue),
      ebitda: Number(row.ebitda),
      netIncome: Number(row.netIncome)
    };
  });
}

function mapHeaderToCanonical(header, aliasConfig) {
  const normalized = normalizeHeaderName(header);
  for (const [canonical, aliases] of Object.entries(aliasConfig)) {
    const candidates = [canonical, ...(aliases || [])].map(normalizeHeaderName);
    if (candidates.includes(normalized)) return canonical;
  }
  return header;
}

function normalizeHeaderName(value) {
  return String(value).trim().toLowerCase().replace(/[\s_\-()/]+/g, "");
}

function splitCsvLine(line) {
  const values = [];
  let current = "";
  let insideQuotes = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}

function normalizeDataset(company, periods, currency) {
  const normalized = periods.map((period) => {
    const row = {};
    requiredFields.forEach((field) => {
      if (!(field in period)) throw new Error(`Missing field "${field}" in uploaded dataset.`);
      row[field] = field === "year" ? Number(period[field]) : Number(String(period[field]).replace(/[$,\s]/g, ""));
      if (Number.isNaN(row[field])) throw new Error(`Field "${field}" contains a non-numeric value.`);
    });
    return row;
  });
  normalized.sort((a, b) => a.year - b.year);
  return { company, periods: normalized, currency };
}

async function parsePdfFile(file) {
  const buffer = await file.arrayBuffer();
  const raw = new TextDecoder("latin1").decode(buffer);
  const textSnippets = [];
  let match;
  const textPattern = /\(([^()]*)\)\s*Tj/g;
  while ((match = textPattern.exec(raw)) !== null) textSnippets.push(cleanPdfString(match[1]));
  const arrayPattern = /\[(.*?)\]\s*TJ/g;
  while ((match = arrayPattern.exec(raw)) !== null) {
    const fragments = [...match[1].matchAll(/\(([^()]*)\)/g)].map((item) => cleanPdfString(item[1]));
    if (fragments.length) textSnippets.push(fragments.join(""));
  }
  const combined = textSnippets.join(" ").replace(/\s+/g, " ").trim();
  if (combined.length > 120) return combined;
  const fallback = raw.replace(/[^A-Za-z0-9.,:%;()\-\/\s]/g, " ").replace(/\s+/g, " ").trim();
  if (fallback.length < 120) throw new Error("PDF text extraction was too limited. Try a text-based PDF or paste report text manually.");
  return fallback;
}

function cleanPdfString(value) {
  return value.replace(/\\\(/g, "(").replace(/\\\)/g, ")").replace(/\\n/g, " ").replace(/\\r/g, " ").replace(/\\t/g, " ").replace(/\\\d{3}/g, " ");
}

function enrichPeriods(periods) {
  return periods.map((period, index) => {
    const previous = periods[index - 1];
    const grossMargin = safeRatio(period.grossProfit, period.revenue);
    const operatingMargin = safeRatio(period.operatingIncome, period.revenue);
    const netMargin = safeRatio(period.netIncome, period.revenue);
    const currentRatio = safeRatio(period.assets, period.liabilities);
    const debtToEquity = safeRatio(period.liabilities, period.equity);
    const freeCashFlow = period.operatingCashFlow - period.capex;
    const revenueGrowth = previous ? safeRatio(period.revenue - previous.revenue, previous.revenue) : null;
    const netIncomeGrowth = previous ? safeRatio(period.netIncome - previous.netIncome, previous.netIncome) : null;
    return { ...period, grossMargin, operatingMargin, netMargin, currentRatio, debtToEquity, freeCashFlow, revenueGrowth, netIncomeGrowth };
  });
}

function buildHighlights(periods, currencySymbol) {
  const latest = periods[periods.length - 1];
  const previous = periods[periods.length - 2];
  const items = [];
  if (latest.revenueGrowth !== null && latest.revenueGrowth > 0.12) items.push(state.language === "zh" ? `最新一年收入同比增长 ${formatPercent(latest.revenueGrowth)}，收入端动能较强。` : `Revenue grew ${formatPercent(latest.revenueGrowth)} year over year, signalling strong top-line momentum.`);
  if (latest.netMargin > 0.1) items.push(state.language === "zh" ? `净利率达到 ${formatPercent(latest.netMargin)}，显示成本控制和规模化盈利能力在改善。` : `Net margin reached ${formatPercent(latest.netMargin)}, suggesting disciplined cost control and scalable profitability.`);
  if (latest.freeCashFlow > 0) items.push(state.language === "zh" ? `自由现金流为正，达到 ${formatMoney(latest.freeCashFlow, currencySymbol, true)}，为再投资和抗风险提供空间。` : `Free cash flow remained positive at ${formatMoney(latest.freeCashFlow, currencySymbol, true)}, supporting reinvestment capacity.`);
  if (previous && latest.debtToEquity < previous.debtToEquity) items.push(state.language === "zh" ? "杠杆水平较上期改善，债务股本比呈下降趋势。" : "Leverage improved versus the prior period, with debt-to-equity trending down.");
  if (!items.length) items.push(t().emptyList);
  return items;
}

function buildRisks(periods) {
  const latest = periods[periods.length - 1];
  const items = [];
  if (latest.revenueGrowth !== null && latest.revenueGrowth < 0.05) items.push(state.language === "zh" ? "收入增长偏弱，如果市场预期较高，估值支撑可能有限。" : "Revenue growth is modest, which may limit valuation upside if market expectations remain high.");
  if (latest.netIncomeGrowth !== null && latest.revenueGrowth !== null && latest.netIncomeGrowth < latest.revenueGrowth) items.push(state.language === "zh" ? "净利润增速低于收入增速，说明利润率可能承压或费用端负担上升。" : "Net income is not compounding faster than revenue, hinting at margin pressure or heavier operating costs.");
  if (latest.debtToEquity > 0.9) items.push(state.language === "zh" ? "相对股东权益来看，杠杆水平偏高，需要持续跟踪偿债压力。" : "Balance-sheet leverage is elevated relative to equity and should be monitored closely.");
  if (latest.currentRatio < 1.2) items.push(state.language === "zh" ? "流动性覆盖偏紧，若经营端出现波动，缓冲空间有限。" : "Liquidity coverage looks tight, leaving less room for an earnings miss or working capital shock.");
  if (latest.freeCashFlow < 0) items.push(state.language === "zh" ? "自由现金流为负，需要关注资本开支强度与外部融资需求。" : "Negative free cash flow raises questions about capital intensity and funding needs.");
  if (!items.length) items.push(state.language === "zh" ? "当前财务期内未见特别突出的短期财务红旗，但竞争、行业和宏观风险仍需额外尽调。" : "No immediate red flags appear in the uploaded periods, though concentration, competition, and macro risks still require external diligence.");
  return items;
}

function analyzeReport(reportText, latestPeriod, currencySymbol) {
  if (!reportText) return { tone: t().noReportTone, signals: [t().noReportSummary], watchItems: [t().noReportSummary] };
  const lower = reportText.toLowerCase();
  const positiveTerms = ["growth", "strong", "improve", "resilient", "expand", "discipline", "renewal", "cash flow", "partnership"];
  const cautionTerms = ["risk", "pressure", "volatility", "competition", "inventory", "regulation", "foreign exchange", "compliance"];
  const positiveScore = positiveTerms.reduce((sum, term) => sum + countMatches(lower, term), 0);
  const cautionScore = cautionTerms.reduce((sum, term) => sum + countMatches(lower, term), 0);
  let tone = t().managementToneBalanced;
  if (positiveScore >= cautionScore + 2) tone = t().managementTonePositive;
  else if (cautionScore > positiveScore) tone = t().managementToneCautious;
  const signals = [];
  const watchItems = [];
  if (lower.includes("demand") || lower.includes("engagement")) signals.push(state.language === "zh" ? "管理层反复提及需求和用户参与度，说明业务端仍在强调增长韧性。" : "Management repeatedly highlights demand and engagement, pointing to confidence in commercial momentum.");
  if (lower.includes("margin") || lower.includes("pricing")) signals.push(state.language === "zh" ? `文本提到利润率或定价纪律，与当前 ${formatPercent(latestPeriod.netMargin)} 的净利率表现形成呼应。` : `Mentions of margin and pricing discipline align with the latest ${formatPercent(latestPeriod.netMargin)} net margin profile.`);
  if (lower.includes("cash flow") || lower.includes("working capital")) signals.push(state.language === "zh" ? `年报强调现金流和营运资本管理，与 ${formatMoney(latestPeriod.freeCashFlow, currencySymbol)} 的自由现金流表现一致。` : `Cash flow and working capital commentary support the latest free cash flow result of ${formatMoney(latestPeriod.freeCashFlow, currencySymbol)}.`);
  if (lower.includes("ai")) signals.push(state.language === "zh" ? "文本提到 AI 相关投入或产品能力，这为未来产品升级和估值故事提供了叙事空间。" : "AI-related commentary creates a potential innovation and multiple-expansion angle for the equity story.");
  if (lower.includes("competition")) watchItems.push(state.language === "zh" ? "竞争压力被明确提及，后续需要验证公司是否具备持续的产品差异化能力。" : "Competitive pressure is explicitly called out, so product differentiation should remain a diligence focus.");
  if (lower.includes("foreign exchange") || lower.includes("volatility")) watchItems.push(state.language === "zh" ? "汇率或波动性风险被提到，说明外部变量可能影响短期业绩兑现。" : "Foreign exchange and volatility references suggest near-term delivery could be sensitive to macro swings.");
  if (lower.includes("inventory")) watchItems.push(state.language === "zh" ? "库存去化或渠道节奏被提到，可能影响收入确认节奏。" : "Inventory normalization commentary may imply timing risk for revenue conversion.");
  if (!signals.length) signals.push(t().reportSignalsFallback);
  if (!watchItems.length) watchItems.push(t().reportWatchFallback);
  return { tone, signals, watchItems };
}

function countMatches(text, term) {
  const matches = text.match(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"));
  return matches ? matches.length : 0;
}

function enrichPeers(peers) {
  return peers.map((peer) => ({ ...peer, evRevenue: safeRatio(peer.enterpriseValue, peer.revenue), evEbitda: safeRatio(peer.enterpriseValue, peer.ebitda), pe: safeRatio(peer.marketCap, peer.netIncome), ebitdaMargin: safeRatio(peer.ebitda, peer.revenue) }));
}

function renderTexts() {
  const copy = t();
  document.documentElement.lang = copy.language;
  elements.texts.eyebrowLabel.textContent = copy.heroEyebrow;
  elements.texts.heroTitle.textContent = copy.heroTitle;
  elements.texts.heroText.textContent = copy.heroText;
  elements.openMappingBtn.textContent = copy.openMappingBtn;
  elements.openResearchBtn.textContent = copy.openResearchBtn;
  elements.texts.financialUploadLabel.textContent = copy.financialUploadLabel;
  elements.texts.uploadFinanceBtn.textContent = copy.uploadFinanceBtn;
  elements.loadSampleBtn.textContent = copy.loadSampleBtn;
  elements.texts.reportUploadLabel.textContent = copy.reportUploadLabel;
  elements.texts.uploadReportBtn.textContent = copy.uploadReportBtn;
  elements.loadReportSampleBtn.textContent = copy.loadReportSampleBtn;
  elements.texts.peerUploadLabel.textContent = copy.peerUploadLabel;
  elements.texts.uploadPeerBtn.textContent = copy.uploadPeerBtn;
  elements.loadPeerSampleBtn.textContent = copy.loadPeerSampleBtn;
  elements.texts.snapshotLabel.textContent = copy.snapshotLabel;
  elements.texts.trendLabel.textContent = copy.trendLabel;
  elements.texts.trendTitle.textContent = copy.trendTitle;
  elements.texts.analysisLabel.textContent = copy.analysisLabel;
  elements.texts.analysisTitle.textContent = copy.analysisTitle;
  elements.texts.highlightsTitle.textContent = copy.highlightsTitle;
  elements.texts.risksTitle.textContent = copy.risksTitle;
  elements.texts.reportTextLabel.textContent = copy.reportTextLabel;
  elements.texts.reportTextTitle.textContent = copy.reportTextTitle;
  elements.texts.analyzeReportBtn.textContent = copy.analyzeReportBtn;
  elements.texts.reportSummaryLabel.textContent = copy.reportSummaryLabel;
  elements.texts.reportSummaryTitle.textContent = copy.reportSummaryTitle;
  elements.texts.reportSentimentTitle.textContent = copy.reportSentimentTitle;
  elements.texts.reportSignalsTitle.textContent = copy.reportSignalsTitle;
  elements.texts.reportWatchTitle.textContent = copy.reportWatchTitle;
  elements.texts.llmConfigLabel.textContent = copy.llmConfigLabel;
  elements.texts.llmConfigTitle.textContent = copy.llmConfigTitle;
  elements.texts.webResearchLabel.textContent = copy.webResearchLabel;
  elements.texts.webResearchTitle.textContent = copy.webResearchTitle;
  elements.texts.researchConfigLabel.textContent = copy.researchConfigLabel;
  elements.texts.researchConfigTitle.textContent = copy.researchConfigTitle;
  elements.texts.searchBaseLabel.textContent = copy.searchBaseLabel;
  elements.texts.searchApiKeyLabel.textContent = copy.searchApiKeyLabel;
  elements.texts.searchQueryLabel.textContent = copy.searchQueryLabel;
  elements.texts.searchModeLabel.textContent = copy.searchModeLabel;
  elements.texts.alphaFunctionLabel.textContent = copy.alphaFunctionLabel;
  elements.texts.searchProxyLabel.textContent = copy.searchProxyLabel;
  elements.texts.researchHelper.textContent = copy.researchHelper;
  elements.texts.apiBaseLabel.textContent = copy.apiBaseLabel;
  elements.texts.apiModelLabel.textContent = copy.apiModelLabel;
  elements.texts.apiKeyLabel.textContent = copy.apiKeyLabel;
  elements.texts.apiModeLabel.textContent = copy.apiModeLabel;
  elements.texts.llmHelper.textContent = copy.llmHelper;
  elements.runLlmBtn.textContent = copy.runLlmBtn;
  elements.texts.fieldMappingLabel.textContent = copy.fieldMappingLabel;
  elements.texts.fieldMappingTitle.textContent = copy.fieldMappingTitle;
  elements.texts.financialAliasLabel.textContent = copy.financialAliasLabel;
  elements.texts.peerAliasLabel.textContent = copy.peerAliasLabel;
  elements.texts.fieldMappingHelper.textContent = copy.fieldMappingHelper;
  elements.texts.subjectCompanyLabel.textContent = copy.subjectCompanyLabel;
  elements.texts.compareCompaniesLabel.textContent = copy.compareCompaniesLabel;
  elements.closeMappingBtn.textContent = copy.closeMappingBtn;
  elements.closeResearchBtn.textContent = copy.closeResearchBtn;
  elements.runResearchBtn.textContent = copy.runResearchBtn;
  elements.applyResearchBtn.textContent = copy.applyResearchBtn;
  elements.texts.valuationLabel.textContent = copy.valuationLabel;
  elements.texts.valuationTitle.textContent = copy.valuationTitle;
  elements.texts.memoLabel.textContent = copy.memoLabel;
  elements.texts.memoTitle.textContent = copy.memoTitle;
  elements.copyMemoBtn.textContent = copy.copyMemoBtn;
  elements.texts.dataPreviewLabel.textContent = copy.dataPreviewLabel;
  elements.texts.dataPreviewTitle.textContent = copy.dataPreviewTitle;
  elements.texts.financialHelper.innerHTML = `${copy.financialHelper} <code>year,revenue,grossProfit,operatingIncome,netIncome,cash,assets,liabilities,equity,operatingCashFlow,capex</code>`;
  elements.texts.reportHelper.textContent = copy.reportHelper;
  elements.texts.peerHelper.innerHTML = `${copy.peerHelper} <code>company,ticker,price,marketCap,enterpriseValue,revenue,ebitda,netIncome</code>`;
  elements.reportInput.placeholder = copy.reportPlaceholder;
  elements.apiBaseInput.value = state.llmConfig.baseUrl;
  elements.apiModelInput.value = state.llmConfig.model;
  elements.apiKeyInput.value = state.llmConfig.apiKey;
  elements.apiModeSelect.value = state.llmConfig.mode;
  elements.searchBaseInput.value = state.searchConfig.baseUrl;
  elements.searchApiKeyInput.value = state.searchConfig.apiKey;
  elements.searchQueryInput.value = state.searchConfig.query;
  elements.searchModeSelect.value = state.searchConfig.mode;
  elements.alphaFunctionSelect.value = state.searchConfig.alphaFunction;
  elements.searchProxySelect.value = state.searchConfig.route;
  elements.peerSearchInput.placeholder = copy.peerSearchPlaceholder;
  elements.addPeerBtn.textContent = copy.addPeerBtn;
  elements.peerSearchHelper.textContent = copy.peerSearchHelper;
  elements.peerSearchStatus.textContent = state.peerSearchStatus || copy.peerSearchIdle;
  elements.compareSearchInput.placeholder = copy.compareSearchPlaceholder;
  elements.selectAllPeersBtn.textContent = copy.selectAllPeersBtn;
  elements.clearPeersBtn.textContent = copy.clearPeersBtn;
  elements.financialAliasInput.value = serializeAliasEditor(state.aliases.financial, requiredFields);
  elements.peerAliasInput.value = serializeAliasEditor(state.aliases.peer, peerFields);
  elements.llmStatus.textContent = state.llmStatus || copy.llmIdle;
  elements.researchStatus.textContent = state.researchStatus || copy.researchIdle;
  elements.runLlmBtn.disabled = state.llmLoading;
  elements.runResearchBtn.disabled = state.researchLoading;
  elements.mappingModal.classList.toggle("hidden", !state.mappingModalOpen);
  elements.researchModal.classList.toggle("hidden", !state.researchModalOpen);
  elements.langEnBtn.classList.toggle("active", state.language === "en");
  elements.langZhBtn.classList.toggle("active", state.language === "zh");
}

function renderApp() {
  renderTexts();
  const dataset = state.financialDataset;
  const enriched = enrichPeriods(dataset.periods);
  const latest = enriched[enriched.length - 1];
  const previous = enriched[enriched.length - 2];
  const currencySymbol = currencySymbols[dataset.currency] || `${dataset.currency} `;
  const strengths = buildHighlights(enriched, currencySymbol);
  const risks = buildRisks(enriched);
  const reportSummary = state.llmSummary || analyzeReport(state.reportText, latest, currencySymbol);
  const peers = enrichPeers(state.peerDataset);
  ensurePeerSelection(peers, dataset.company);
  const subjectCompany = state.selectedSubjectCompany || dataset.company;
  const comparePeers = peers.filter((peer) => peer.company !== subjectCompany);
  const selectedPeers = peers.filter((peer) => peer.company === subjectCompany || state.selectedPeerCompanies.includes(peer.company));
  elements.companyTitle.textContent = `${dataset.company} (${latest.year})`;
  elements.reportInput.value = state.reportText;
  renderStatusPills(latest);
  renderMetricCards(latest, previous, currencySymbol);
  renderLists(elements.highlightsList, strengths, t().emptyList);
  renderLists(elements.risksList, risks, t().emptyList);
  renderReportSummary(reportSummary);
  renderResearchSection(state.researchResults);
  renderPeerSection(selectedPeers, peers, comparePeers, subjectCompany, currencySymbol);
  elements.memoOutput.value = buildMemo(dataset.company, latest, strengths, risks, reportSummary, selectedPeers, subjectCompany, currencySymbol);
  renderTable(enriched, currencySymbol);
  drawTrendChart(enriched, currencySymbol);
}

function renderStatusPills(latest) {
  const pills = [
    state.language === "zh" ? `收入增长 ${latest.revenueGrowth === null ? "n/a" : formatPercent(latest.revenueGrowth)}` : `Revenue growth ${latest.revenueGrowth === null ? "n/a" : formatPercent(latest.revenueGrowth)}`,
    state.language === "zh" ? `净利率 ${formatPercent(latest.netMargin)}` : `Net margin ${formatPercent(latest.netMargin)}`,
    state.language === "zh" ? `债务/权益 ${latest.debtToEquity.toFixed(2)}x` : `Debt / equity ${latest.debtToEquity.toFixed(2)}x`
  ];
  elements.statusPills.innerHTML = pills.map((item) => `<span class="pill">${item}</span>`).join("");
}

function renderMetricCards(latest, previous, currencySymbol) {
  const metrics = [
    { label: state.language === "zh" ? "收入" : "Revenue", value: formatMoney(latest.revenue, currencySymbol), delta: latest.revenueGrowth },
    { label: state.language === "zh" ? "净利润" : "Net Income", value: formatMoney(latest.netIncome, currencySymbol), delta: latest.netIncomeGrowth },
    { label: state.language === "zh" ? "营业利润率" : "Operating Margin", value: formatPercent(latest.operatingMargin), delta: previous ? latest.operatingMargin - previous.operatingMargin : null, basisPoints: true },
    { label: state.language === "zh" ? "自由现金流" : "Free Cash Flow", value: formatMoney(latest.freeCashFlow, currencySymbol), delta: previous ? safeRatio(latest.freeCashFlow - previous.freeCashFlow, Math.abs(previous.freeCashFlow) || 1) : null }
  ];
  elements.metricsGrid.innerHTML = metrics.map((metric) => {
    const deltaLabel = formatDelta(metric.delta, metric.basisPoints);
    return `<article class="metric-card"><p>${metric.label}</p><strong>${metric.value}</strong><div class="delta ${deltaLabel.tone}">${deltaLabel.text}</div></article>`;
  }).join("");
}

function renderReportSummary(summary) {
  elements.reportTone.textContent = summary.tone;
  renderLists(elements.reportSignalsList, summary.signals, t().noReportSummary);
  renderLists(elements.reportWatchList, summary.watchItems, t().noReportSummary);
}

function renderResearchSection(items) {
  if (!items.length) {
    elements.researchSummary.innerHTML = `<article class="summary-card"><p>${t().researchEmpty}</p></article>`;
    elements.researchResults.innerHTML = "";
    return;
  }
  elements.researchSummary.innerHTML = `<article class="summary-card"><p>${state.searchConfig.query || ""}</p><strong>${items.length} result(s)</strong></article>`;
  elements.researchResults.innerHTML = items.map((item) => `
    <article class="research-card">
      <h4>${item.title}</h4>
      <p>${item.summary || ""}</p>
      <p>${[item.source, item.publishedAt].filter(Boolean).join(" | ")}</p>
      ${item.url ? `<a href="${item.url}" target="_blank" rel="noreferrer">Open source</a>` : ""}
    </article>
  `).join("");
}

function renderPeerSection(peers, allPeers, comparePeers, companyName, currencySymbol) {
  renderPeerControls(allPeers, comparePeers);
  if (!peers.length) {
    elements.valuationSummary.innerHTML = `<article class="summary-card"><p>${t().emptyValuation}</p></article>`;
    elements.peerTableHead.innerHTML = "";
    elements.peerTableBody.innerHTML = "";
    return;
  }
  const compareSet = comparePeers.length ? comparePeers.filter((peer) => state.selectedPeerCompanies.includes(peer.company)) : [];
  const referencePeers = compareSet.length ? compareSet : peers.filter((peer) => peer.company !== companyName);
  const medianEvRevenue = referencePeers.length ? median(referencePeers.map((peer) => peer.evRevenue)) : 0;
  const cheapest = referencePeers.length ? [...referencePeers].sort((a, b) => a.evRevenue - b.evRevenue)[0] : null;
  const subject = peers.find((peer) => peer.company.toLowerCase() === companyName.toLowerCase()) || peers[0];
  const premium = subject.evRevenue - medianEvRevenue;
  elements.valuationSummary.innerHTML = [
    summaryCard(t().valuationMedian, `${medianEvRevenue.toFixed(2)}x`),
    summaryCard(t().valuationPremium, `${premium >= 0 ? "+" : ""}${premium.toFixed(2)}x`),
    summaryCard(t().valuationCheapest, cheapest ? `${cheapest.company} (${cheapest.evRevenue.toFixed(2)}x)` : "n/a")
  ].join("");
  const headers = [state.language === "zh" ? "公司" : "Company", "Ticker", state.language === "zh" ? "股价" : "Price", "EV / Rev", "EV / EBITDA", "P / E", state.language === "zh" ? "EBITDA 利润率" : "EBITDA Margin"];
  elements.peerTableHead.innerHTML = `<tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr>`;
  elements.peerTableBody.innerHTML = peers.map((peer) => `
    <tr class="${peer.company === subject.company ? "subject-row" : ""}">
      <td>${peer.company}</td><td>${peer.ticker}</td><td>${formatMoney(peer.price, currencySymbol)}</td><td>${peer.evRevenue.toFixed(2)}x</td><td>${peer.evEbitda.toFixed(2)}x</td><td>${peer.pe.toFixed(2)}x</td><td>${formatPercent(peer.ebitdaMargin)}</td>
    </tr>
  `).join("");
}

function renderPeerControls(allPeers, comparePeers) {
  elements.subjectCompanySelect.innerHTML = allPeers
    .map((peer) => `<option value="${peer.company}">${peer.company}</option>`)
    .join("");
  elements.subjectCompanySelect.value = state.selectedSubjectCompany;

  const filteredComparePeers = comparePeers.filter((peer) =>
    !state.compareSearchTerm || peer.company.toLowerCase().includes(state.compareSearchTerm)
  );

  elements.compareCompaniesSelect.innerHTML = filteredComparePeers
    .map((peer) => `<option value="${peer.company}" ${state.selectedPeerCompanies.includes(peer.company) ? "selected" : ""}>${peer.company}</option>`)
    .join("");

  elements.compareSearchInput.value = state.compareSearchTerm;
  elements.compareSummaryText.textContent = t().compareSummaryText.replace("{count}", String(state.selectedPeerCompanies.length));
}

function summaryCard(title, value) {
  return `<article class="summary-card"><p>${title}</p><strong>${value}</strong></article>`;
}

function renderLists(target, items, fallback) {
  target.innerHTML = (items.length ? items : [fallback]).map((item) => `<li>${item}</li>`).join("");
}

function renderTable(periods, currencySymbol) {
  const columns = [state.language === "zh" ? "年份" : "Year", state.language === "zh" ? "收入" : "Revenue", state.language === "zh" ? "毛利率" : "Gross Margin", state.language === "zh" ? "营业利润率" : "Operating Margin", state.language === "zh" ? "净利率" : "Net Margin", state.language === "zh" ? "自由现金流" : "Free Cash Flow", state.language === "zh" ? "债务/权益" : "Debt / Equity"];
  elements.dataTableHead.innerHTML = `<tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr>`;
  elements.dataTableBody.innerHTML = periods.map((period) => `
    <tr><td>${period.year}</td><td>${formatMoney(period.revenue, currencySymbol)}</td><td>${formatPercent(period.grossMargin)}</td><td>${formatPercent(period.operatingMargin)}</td><td>${formatPercent(period.netMargin)}</td><td>${formatMoney(period.freeCashFlow, currencySymbol)}</td><td>${period.debtToEquity.toFixed(2)}x</td></tr>
  `).join("");
}

function drawTrendChart(periods, currencySymbol) {
  const canvas = elements.chart;
  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const padding = 44;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const years = periods.map((period) => period.year);
  const revenueSeries = periods.map((period) => period.revenue);
  const incomeSeries = periods.map((period) => period.netIncome);
  const maxValue = Math.max(...revenueSeries, ...incomeSeries) * 1.1;
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#fffaf2";
  context.fillRect(0, 0, width, height);
  context.strokeStyle = "rgba(24,33,38,0.16)";
  context.lineWidth = 1;
  for (let grid = 0; grid <= 4; grid += 1) {
    const y = padding + (chartHeight / 4) * grid;
    context.beginPath();
    context.moveTo(padding, y);
    context.lineTo(width - padding, y);
    context.stroke();
  }
  context.fillStyle = "#5c676f";
  context.font = "12px Georgia";
  years.forEach((year, index) => {
    const x = padding + (chartWidth / Math.max(years.length - 1, 1)) * index;
    context.fillText(String(year), x - 12, height - 18);
  });
  [0, 0.5, 1].forEach((ratio) => {
    const value = maxValue * (1 - ratio);
    const y = padding + chartHeight * ratio;
    context.fillText(formatAxisMoney(value, currencySymbol), 8, y + 4);
  });
  drawSeries(context, revenueSeries, maxValue, padding, chartWidth, chartHeight, "#c2612d");
  drawSeries(context, incomeSeries, maxValue, padding, chartWidth, chartHeight, "#2f6b57");
  context.fillStyle = "#c2612d";
  context.fillRect(width - 190, 24, 14, 14);
  context.fillStyle = "#182126";
  context.fillText(state.language === "zh" ? "收入" : "Revenue", width - 168, 35);
  context.fillStyle = "#2f6b57";
  context.fillRect(width - 98, 24, 14, 14);
  context.fillStyle = "#182126";
  context.fillText(state.language === "zh" ? "净利润" : "Net income", width - 76, 35);
}

function drawSeries(context, series, maxValue, padding, chartWidth, chartHeight, color) {
  context.strokeStyle = color;
  context.lineWidth = 3;
  context.beginPath();
  series.forEach((value, index) => {
    const x = padding + (chartWidth / Math.max(series.length - 1, 1)) * index;
    const y = padding + chartHeight - (value / maxValue) * chartHeight;
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });
  context.stroke();
  series.forEach((value, index) => {
    const x = padding + (chartWidth / Math.max(series.length - 1, 1)) * index;
    const y = padding + chartHeight - (value / maxValue) * chartHeight;
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, 4.5, 0, Math.PI * 2);
    context.fill();
  });
}

function buildMemo(company, latest, strengths, risks, reportSummary, peers, subjectCompany, currencySymbol) {
  const compareOnlyPeers = peers.filter((peer) => peer.company.toLowerCase() !== subjectCompany.toLowerCase());
  const medianEvRevenue = compareOnlyPeers.length ? median(compareOnlyPeers.map((peer) => peer.evRevenue)).toFixed(2) : "n/a";
  const subject = peers.find((peer) => peer.company.toLowerCase() === subjectCompany.toLowerCase()) || peers[0];
  const subjectMultiple = subject ? `${subject.evRevenue.toFixed(2)}x` : "n/a";
  if (state.language === "zh") {
    return [
      `公司：${company}`, `分析期间：FY${latest.year}`, "", t().memoExecutive,
      `${company} 最新一期收入为 ${formatMoney(latest.revenue, currencySymbol)}，净利润为 ${formatMoney(latest.netIncome, currencySymbol)}，净利率 ${formatPercent(latest.netMargin)}，自由现金流 ${formatMoney(latest.freeCashFlow, currencySymbol)}。`,
      "", t().memoStrengths, ...strengths.map((item) => `- ${item}`), "", t().memoRisks, ...risks.map((item) => `- ${item}`), "", t().memoQualitative,
      `- ${reportSummary.tone}`, ...reportSummary.signals.map((item) => `- ${item}`), ...reportSummary.watchItems.map((item) => `- ${item}`), "", t().memoValuation,
      `- 当前主体 ${subjectCompany} 的 EV/Revenue 约为 ${subjectMultiple}，所选可比公司中位数约为 ${medianEvRevenue}x。`, "", t().memoPreliminary, t().memoPreliminaryText
    ].join("\n");
  }
  return [
    `Company: ${company}`, `Period reviewed: FY${latest.year}`, "", t().memoExecutive,
    `${company} reported revenue of ${formatMoney(latest.revenue, currencySymbol)}, net income of ${formatMoney(latest.netIncome, currencySymbol)}, a net margin of ${formatPercent(latest.netMargin)}, and free cash flow of ${formatMoney(latest.freeCashFlow, currencySymbol)} in the latest period.`,
    "", t().memoStrengths, ...strengths.map((item) => `- ${item}`), "", t().memoRisks, ...risks.map((item) => `- ${item}`), "", t().memoQualitative,
    `- ${reportSummary.tone}`, ...reportSummary.signals.map((item) => `- ${item}`), ...reportSummary.watchItems.map((item) => `- ${item}`), "", t().memoValuation,
    `- ${subjectCompany} currently screens at ${subjectMultiple} EV / Revenue versus a selected-peer median of ${medianEvRevenue}x.`, "", t().memoPreliminary, t().memoPreliminaryText
  ].join("\n");
}

function formatMoney(value, currencySymbol, compact = false) {
  const abs = Math.abs(value);
  if (!Number.isFinite(value)) return "n/a";
  if (!compact && abs < 1000) return `${currencySymbol}${value.toFixed(1)}`;
  let displayValue = value;
  let suffix = "";
  if (compact || abs >= 1000000000) {
    displayValue = value / 1000000000;
    suffix = "B";
  } else if (abs >= 1000000) {
    displayValue = value / 1000000;
    suffix = "M";
  }
  return `${currencySymbol}${displayValue.toFixed(1)}${suffix}`;
}

function formatAxisMoney(value, currencySymbol) {
  if (value >= 1000000000) return `${currencySymbol}${(value / 1000000000).toFixed(1)}B`;
  return `${currencySymbol}${(value / 1000000).toFixed(0)}M`;
}

function formatPercent(value) { return `${(value * 100).toFixed(1)}%`; }

function formatDelta(value, basisPoints = false) {
  if (value === null || Number.isNaN(value)) return { text: t().noPriorComparison, tone: "neutral" };
  if (basisPoints) {
    const bps = value * 10000;
    const tone = bps > 0 ? "positive" : bps < 0 ? "negative" : "neutral";
    const prefix = bps > 0 ? "+" : "";
    return { text: state.language === "zh" ? `${prefix}${bps.toFixed(0)} bps，较上期` : `${prefix}${bps.toFixed(0)} bps vs. prior year`, tone };
  }
  const tone = value > 0 ? "positive" : value < 0 ? "negative" : "neutral";
  const prefix = value > 0 ? "+" : "";
  return { text: state.language === "zh" ? `${prefix}${formatPercent(value)}，较上期` : `${prefix}${formatPercent(value)} vs. prior year`, tone };
}

function safeRatio(numerator, denominator) { return denominator ? numerator / denominator : 0; }

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const midpoint = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[midpoint - 1] + sorted[midpoint]) / 2 : sorted[midpoint];
}

renderApp();
