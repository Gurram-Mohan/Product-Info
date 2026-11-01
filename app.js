/**
 * NutriScan – Food Nutrition Analyzer
 * Main application logic
 *
 * Formula: Nutrient quantity = (Nutrient value per 100 g × Selected grams) / 100
 */

/* ─── State ─────────────────────────────────────────────────────────────────── */
let currentProduct = null;
let currentGrams   = 100;
let donutChart     = null;       // SVG donut chart instance

/* ─── Helpers ───────────────────────────────────────────────────────────────── */
const calc = (per100, grams) => (per100 * grams) / 100;

const fmt = (val, decimals = 1) => {
  if (val === null || val === undefined) return null;
  const n = Number(val);
  if (n === 0) return '0';
  if (n < 0.01) return '<0.01';
  return n % 1 === 0 ? n.toString() : n.toFixed(decimals);
};

const driPct = (value, driKey) => {
  if (value === null || !driKey || !DAILY_REFERENCE[driKey]) return null;
  return Math.round((value / DAILY_REFERENCE[driKey].value) * 100);
};

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

/* ─── DOM References ─────────────────────────────────────────────────────────── */
const $  = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ─── Search / Autocomplete ──────────────────────────────────────────────────── */
const searchInput    = $('searchInput');
const autocompleteEl = $('autocompleteList');
const searchError    = $('searchError');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  searchError.classList.remove('show');
  if (!q) { autocompleteEl.classList.remove('show'); return; }

  const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q));
  if (matches.length === 0) {
    autocompleteEl.classList.remove('show');
    return;
  }
  renderAutocomplete(matches);
  autocompleteEl.classList.add('show');
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') { performSearch(searchInput.value.trim()); }
  if (e.key === 'Escape') { autocompleteEl.classList.remove('show'); }
});

document.addEventListener('click', e => {
  if (!e.target.closest('.search-wrapper')) {
    autocompleteEl.classList.remove('show');
  }
});

$('searchBtn').addEventListener('click', () => performSearch(searchInput.value.trim()));

function renderAutocomplete(products) {
  autocompleteEl.innerHTML = products.map(p => `
    <div class="autocomplete-item" tabindex="0" data-id="${p.id}" onclick="selectProductById('${p.id}')">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <div>
        <div class="autocomplete-item-name">${p.name}</div>
        <div class="autocomplete-item-cat">${p.category}</div>
      </div>
    </div>
  `).join('');
}

function performSearch(query) {
  autocompleteEl.classList.remove('show');
  if (!query) return;

  const match = PRODUCTS.find(p =>
    p.name.toLowerCase() === query.toLowerCase() ||
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  if (match) {
    selectProductById(match.id);
    searchError.classList.remove('show');
  } else {
    searchError.textContent = 'Product not available. Please select one of the supported food products.';
    searchError.classList.add('show');
  }
}

/* ─── Product Cards ──────────────────────────────────────────────────────────── */
function renderProductCards() {
  const grid = $('productsGrid');
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="product-card" id="card-${p.id}" onclick="selectProductById('${p.id}')" tabindex="0"
         role="button" aria-label="Analyse ${p.name}">
      <div class="product-card-badge">${p.category.split('/')[0].trim()}</div>
      <img class="product-card-img" src="${p.image}" alt="${p.name}" loading="lazy">
      <div class="product-card-body">
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-desc">${p.description}</div>
      </div>
    </div>
  `).join('');

  // Keyboard accessibility
  $$('.product-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
  });
}

/* ─── Select Product ─────────────────────────────────────────────────────────── */
function selectProductById(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  currentProduct = product;
  currentGrams   = 100;
  searchInput.value = product.name;
  autocompleteEl.classList.remove('show');
  searchError.classList.remove('show');

  // Update active card styling
  $$('.product-card').forEach(c => c.classList.remove('active'));
  const activeCard = $(`card-${id}`);
  if (activeCard) {
    activeCard.classList.add('active');
    activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  renderResults();

  // Scroll to results
  setTimeout(() => {
    $('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

/* ─── Quantity Controls ──────────────────────────────────────────────────────── */
function setupQuantityControls() {
  const presets = [50, 100, 150, 200];

  $('qtyBtns').innerHTML = presets.map(g => `
    <button class="qty-preset-btn${g === 100 ? ' active' : ''}" 
            data-grams="${g}" id="qtyBtn${g}"
            onclick="setGrams(${g})">${g} g</button>
  `).join('');

  $('customQtyInput').addEventListener('input', e => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val > 0 && val <= 10000) {
      // Remove active from all presets
      $$('.qty-preset-btn').forEach(b => b.classList.remove('active'));
      currentGrams = val;
      updateResults();
    }
  });

  $('customQtyInput').addEventListener('change', e => {
    const val = parseFloat(e.target.value);
    if (isNaN(val) || val <= 0) {
      e.target.value = currentGrams;
    } else if (val > 10000) {
      e.target.value = 10000;
      currentGrams = 10000;
      updateResults();
    }
  });
}

function setGrams(g) {
  currentGrams = g;
  $$('.qty-preset-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.qty-preset-btn[data-grams="${g}"]`);
  if (btn) btn.classList.add('active');
  $('customQtyInput').value = '';
  updateResults();
}

/* ─── Main Render ────────────────────────────────────────────────────────────── */
function renderResults() {
  if (!currentProduct) return;

  // Show section
  const resultsEl = $('results');
  resultsEl.style.display = 'block';
  requestAnimationFrame(() => resultsEl.classList.add('show'));

  renderProductHeader();
  setupQuantityControls();
  updateResults();
}

function updateResults() {
  if (!currentProduct) return;
  const g = currentGrams;
  const n = currentProduct.nutrients;

  updateQtyDisplay(g);
  renderEnergyBanner(n, g);
  renderMacroCards(n, g);
  renderDonutChart(n, g);
  renderVitamins(n, g);
  renderMinerals(n, g);
  renderNutritionTable(n, g);
}

/* ─── Product Header ─────────────────────────────────────────────────────────── */
function renderProductHeader() {
  const p = currentProduct;
  $('productHeaderImg').src = p.image;
  $('productHeaderImg').alt = p.name;
  $('productHeaderCategory').textContent = p.category;
  $('productHeaderName').textContent = p.name;
  $('productHeaderDesc').textContent = p.description;
  $('productNote').textContent = p.note;
}

/* ─── Quantity Display ───────────────────────────────────────────────────────── */
function updateQtyDisplay(g) {
  $('qtySelectedDisplay').innerHTML = `Analysing: <strong>${g} g</strong> of ${currentProduct.name}`;
  $('customQtyInput').placeholder = g;
}

/* ─── Energy Banner ──────────────────────────────────────────────────────────── */
function renderEnergyBanner(n, g) {
  const energyPer100 = n.energy.value;
  const energyTotal  = calc(energyPer100, g);

  // Calorie distribution
  const carbCal  = calc(n.carbohydrate.value, g) * 4;
  const protCal  = calc(n.protein.value, g) * 4;
  const fatCal   = calc(n.totalFat.value, g) * 9;
  const totalMacCal = carbCal + protCal + fatCal;

  const carbPct = totalMacCal > 0 ? Math.round((carbCal / totalMacCal) * 100) : 0;
  const protPct = totalMacCal > 0 ? Math.round((protCal / totalMacCal) * 100) : 0;
  const fatPct  = totalMacCal > 0 ? Math.round((fatCal  / totalMacCal) * 100) : 0;

  const energyDriPct = Math.round((energyTotal / DAILY_REFERENCE.energy.value) * 100);

  $('energyValue').textContent = Math.round(energyTotal);
  $('energyDriPct').textContent = `${energyDriPct}% of 2000 kcal daily reference (FSSAI/Codex)`;
  $('carbPct').textContent  = `${carbPct}%`;
  $('protPct').textContent  = `${protPct}%`;
  $('fatPct').textContent   = `${fatPct}%`;
}

/* ─── Macro Cards ────────────────────────────────────────────────────────────── */
const MACRO_CARD_CONFIG = [
  { key: 'carbohydrate',  icon: '🌾', label: 'Total Carbs',    accent: '#f97316', decimals: 1 },
  { key: 'protein',       icon: '💪', label: 'Protein',        accent: '#3b82f6', decimals: 1 },
  { key: 'totalFat',      icon: '🫒', label: 'Total Fat',      accent: '#eab308', decimals: 1 },
  { key: 'fibre',         icon: '🌿', label: 'Dietary Fibre',  accent: '#22c55e', decimals: 1 },
  { key: 'totalSugars',   icon: '🍬', label: 'Total Sugars',   accent: '#ec4899', decimals: 1 },
  { key: 'sodium',        icon: '🧂', label: 'Sodium',         accent: '#8b5cf6', decimals: 0 },
  { key: 'saturatedFat',  icon: '🧈', label: 'Saturated Fat',  accent: '#f59e0b', decimals: 1, sub: true },
  { key: 'mufa',          icon: '🫙', label: 'Mono-unsat. Fat',accent: '#06b6d4', decimals: 1, sub: true },
  { key: 'pufa',          icon: '🐟', label: 'Poly-unsat. Fat',accent: '#10b981', decimals: 1, sub: true },
  { key: 'cholesterol',   icon: '🫀', label: 'Cholesterol',    accent: '#ef4444', decimals: 0 },
  { key: 'addedSugars',   icon: '🍭', label: 'Added Sugars',   accent: '#f43f5e', decimals: 1, sub: true },
];

function renderMacroCards(n, g) {
  const container = $('macroCards');
  container.innerHTML = MACRO_CARD_CONFIG.map(cfg => {
    const nutrient = n[cfg.key];
    if (!nutrient) return '';

    const isAvail = nutrient.value !== null;
    const calced  = isAvail ? calc(nutrient.value, g) : null;
    const per100  = nutrient.value;
    const dKey    = nutrient.dri;
    const pct     = dKey ? driPct(calced, dKey) : null;

    const valueHtml = isAvail
      ? `<div class="card-value">${fmt(calced, cfg.decimals)}<span> ${nutrient.unit}</span></div>
         <div class="card-per100">${per100} ${nutrient.unit} per 100 g${pct ? ` · ${pct}% DRI` : ''}</div>`
      : `<div class="card-unavail">Data unavailable</div>`;

    return `
      <div class="nutrient-card${cfg.sub ? ' fat-sub' : ''}" style="--card-accent:${cfg.accent}">
        <div class="card-icon">${cfg.icon}</div>
        <div class="card-label">${cfg.label}</div>
        ${valueHtml}
      </div>`;
  }).join('');
}

/* ─── Donut Chart (pure SVG) ─────────────────────────────────────────────────── */
function renderDonutChart(n, g) {
  const carbCal = calc(n.carbohydrate.value, g) * 4;
  const protCal = calc(n.protein.value, g) * 4;
  const fatCal  = calc(n.totalFat.value, g) * 9;
  const total   = carbCal + protCal + fatCal || 1;

  const carbPct = (carbCal / total) * 100;
  const protPct = (protCal / total) * 100;
  const fatPct  = (fatCal  / total) * 100;

  const colors = ['#f97316', '#3b82f6', '#eab308'];
  const pcts   = [carbPct, protPct, fatPct];
  const labels = ['Carbs', 'Protein', 'Fat'];
  const vals   = [
    fmt(calc(n.carbohydrate.value, g), 1),
    fmt(calc(n.protein.value, g), 1),
    fmt(calc(n.totalFat.value, g), 1)
  ];
  const units  = [n.carbohydrate.unit, n.protein.unit, n.totalFat.unit];

  // Build SVG arcs
  const R = 70, cx = 90, cy = 90, strokeW = 22;
  const circumference = 2 * Math.PI * R;

  let svgArcs = '';
  let cumulative = -0.25 * circumference; // start at top

  pcts.forEach((pct, i) => {
    const dash   = (pct / 100) * circumference;
    const gap    = circumference - dash;
    svgArcs += `
      <circle cx="${cx}" cy="${cy}" r="${R}"
        fill="none" stroke="${colors[i]}" stroke-width="${strokeW}"
        stroke-dasharray="${dash} ${gap}"
        stroke-dashoffset="${-cumulative}"
        stroke-linecap="butt"
        style="transition: stroke-dasharray 0.6s cubic-bezier(0.4,0,0.2,1)"/>`;
    cumulative += dash;
  });

  const svgHtml = `
    <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#f3f4f6" stroke-width="${strokeW}"/>
      ${svgArcs}
    </svg>`;

  $('macroDonutChart').innerHTML = svgHtml;
  $('donutCenterVal').textContent = `${Math.round((carbCal + protCal + fatCal))} kcal`;

  // Legend
  const legendHtml = pcts.map((pct, i) => `
    <div class="legend-item">
      <div class="legend-dot" style="background:${colors[i]}"></div>
      <div class="legend-info">
        <div class="legend-label">${labels[i]}</div>
        <div class="legend-val">${vals[i]} ${units[i]}</div>
      </div>
      <div class="legend-bar-wrap">
        <div class="legend-bar">
          <div class="legend-bar-fill" style="width:${Math.round(pct)}%; background:${colors[i]}"></div>
        </div>
      </div>
      <div class="legend-pct">${Math.round(pct)}%</div>
    </div>
  `).join('');
  $('chartLegend').innerHTML = legendHtml;
}

/* ─── Vitamins ───────────────────────────────────────────────────────────────── */
const VITAMIN_CONFIG = [
  { key: 'vitaminA',   icon: '🟠', label: 'Vitamin A' },
  { key: 'vitaminC',   icon: '🍋', label: 'Vitamin C' },
  { key: 'vitaminD',   icon: '☀️',  label: 'Vitamin D' },
  { key: 'vitaminE',   icon: '🌰', label: 'Vitamin E' },
  { key: 'vitaminK',   icon: '🥦', label: 'Vitamin K' },
  { key: 'thiamine',   icon: '🌱', label: 'Vitamin B1 / Thiamine' },
  { key: 'riboflavin', icon: '💛', label: 'Vitamin B2 / Riboflavin' },
  { key: 'niacin',     icon: '🫘', label: 'Vitamin B3 / Niacin' },
  { key: 'vitaminB6',  icon: '🌿', label: 'Vitamin B6' },
  { key: 'folate',     icon: '🍃', label: 'Vitamin B9 / Folate' },
  { key: 'vitaminB12', icon: '🔵', label: 'Vitamin B12' },
];

function renderVitamins(n, g) {
  $('vitaminsGrid').innerHTML = VITAMIN_CONFIG.map(cfg => {
    const nutrient = n[cfg.key];
    if (!nutrient) return '';
    const isAvail = nutrient.value !== null;
    const calced  = isAvail ? calc(nutrient.value, g) : null;
    const pct     = nutrient.dri ? driPct(calced, nutrient.dri) : null;
    return buildMicroItem(cfg, nutrient, calced, pct, isAvail);
  }).join('');
}

/* ─── Minerals ───────────────────────────────────────────────────────────────── */
const MINERAL_CONFIG = [
  { key: 'calcium',    icon: '🦴', label: 'Calcium' },
  { key: 'iron',       icon: '🩸', label: 'Iron' },
  { key: 'magnesium',  icon: '⚡', label: 'Magnesium' },
  { key: 'phosphorus', icon: '💎', label: 'Phosphorus' },
  { key: 'potassium',  icon: '🍌', label: 'Potassium' },
  { key: 'zinc',       icon: '🔩', label: 'Zinc' },
  { key: 'copper',     icon: '🪙', label: 'Copper' },
  { key: 'manganese',  icon: '🟤', label: 'Manganese' },
  { key: 'selenium',   icon: '✨', label: 'Selenium' },
];

function renderMinerals(n, g) {
  $('mineralsGrid').innerHTML = MINERAL_CONFIG.map(cfg => {
    const nutrient = n[cfg.key];
    if (!nutrient) return '';
    const isAvail = nutrient.value !== null;
    const calced  = isAvail ? calc(nutrient.value, g) : null;
    const pct     = nutrient.dri ? driPct(calced, nutrient.dri) : null;
    return buildMicroItem(cfg, nutrient, calced, pct, isAvail);
  }).join('');
}

function buildMicroItem(cfg, nutrient, calced, pct, isAvail) {
  const barClass = pct >= 100 ? 'very-high' : pct >= 75 ? 'high' : '';
  const barWidth = pct !== null ? clamp(pct, 0, 100) : 0;

  const valueHtml = isAvail
    ? `<div class="micro-values">
         <span class="micro-amount">${fmt(calced, 2)} ${nutrient.unit}</span>
       </div>
       ${pct !== null ? `
       <div class="micro-dri-wrap">
         <div class="micro-dri-bar"><div class="micro-dri-fill ${barClass}" style="width:${barWidth}%"></div></div>
         <div class="micro-dri-pct">${pct}% of daily reference (ICMR-NIN RDA)</div>
       </div>` : ''}`
    : `<div class="micro-unavail">Data unavailable</div>`;

  return `
    <div class="micro-item${isAvail ? '' : ' unavailable'}">
      <div class="micro-icon">${cfg.icon}</div>
      <div class="micro-info">
        <div class="micro-label">${cfg.label}</div>
        ${valueHtml}
      </div>
    </div>`;
}

/* ─── Nutrition Table ────────────────────────────────────────────────────────── */
const TABLE_GROUPS = [
  {
    label: 'Macronutrients',
    rows: [
      { key: 'carbohydrate', label: 'Total Carbohydrates', indent: false },
      { key: 'totalSugars',  label: 'Total Sugars',        indent: true  },
      { key: 'addedSugars',  label: 'Added Sugars',        indent: true  },
      { key: 'fibre',        label: 'Dietary Fibre',       indent: true  },
      { key: 'protein',      label: 'Protein',             indent: false },
      { key: 'totalFat',     label: 'Total Fat',           indent: false },
      { key: 'saturatedFat', label: 'Saturated Fat',       indent: true  },
      { key: 'mufa',         label: 'Monounsaturated Fat', indent: true  },
      { key: 'pufa',         label: 'Polyunsaturated Fat', indent: true  },
      { key: 'transFat',     label: 'Trans Fat',           indent: true  },
      { key: 'cholesterol',  label: 'Cholesterol',         indent: false },
      { key: 'sodium',       label: 'Sodium',              indent: false },
    ]
  },
  {
    label: 'Vitamins',
    rows: [
      { key: 'vitaminA',   label: 'Vitamin A',             indent: false },
      { key: 'vitaminC',   label: 'Vitamin C',             indent: false },
      { key: 'vitaminD',   label: 'Vitamin D',             indent: false },
      { key: 'vitaminE',   label: 'Vitamin E',             indent: false },
      { key: 'vitaminK',   label: 'Vitamin K',             indent: false },
      { key: 'thiamine',   label: 'Vitamin B1 / Thiamine', indent: false },
      { key: 'riboflavin', label: 'Vitamin B2 / Riboflavin',indent: false },
      { key: 'niacin',     label: 'Vitamin B3 / Niacin',  indent: false },
      { key: 'vitaminB6',  label: 'Vitamin B6',            indent: false },
      { key: 'folate',     label: 'Vitamin B9 / Folate',   indent: false },
      { key: 'vitaminB12', label: 'Vitamin B12',           indent: false },
    ]
  },
  {
    label: 'Minerals',
    rows: [
      { key: 'calcium',    label: 'Calcium',     indent: false },
      { key: 'iron',       label: 'Iron',        indent: false },
      { key: 'magnesium',  label: 'Magnesium',   indent: false },
      { key: 'phosphorus', label: 'Phosphorus',  indent: false },
      { key: 'potassium',  label: 'Potassium',   indent: false },
      { key: 'zinc',       label: 'Zinc',        indent: false },
      { key: 'copper',     label: 'Copper',      indent: false },
      { key: 'manganese',  label: 'Manganese',   indent: false },
      { key: 'selenium',   label: 'Selenium',    indent: false },
    ]
  }
];

function renderNutritionTable(n, g) {
  let rows = `
    <thead>
      <tr>
        <th>Nutrient</th>
        <th>Per 100 g</th>
        <th>For ${g} g</th>
        <th>Unit</th>
        <th>% Daily Ref.</th>
      </tr>
    </thead>
    <tbody>`;

  TABLE_GROUPS.forEach(group => {
    rows += `<tr class="group-header"><td colspan="5">${group.label}</td></tr>`;
    group.rows.forEach(row => {
      const nutrient = n[row.key];
      if (!nutrient) return;

      const isAvail = nutrient.value !== null;
      const calced  = isAvail ? calc(nutrient.value, g) : null;
      const pct     = nutrient.dri ? driPct(calced, nutrient.dri) : null;

      const nameCell   = `<td class="nutrient-name${row.indent ? ' indent' : ''}">${row.label}</td>`;
      const per100Cell = isAvail ? `<td>${nutrient.value}</td>` : `<td class="unavail-cell">—</td>`;
      const calcedCell = isAvail ? `<td>${fmt(calced, 2)}</td>` : `<td class="unavail-cell">Data unavailable</td>`;
      const unitCell   = `<td>${nutrient.unit}</td>`;
      const pctCell    = pct !== null ? `<td>${pct}%</td>` : `<td class="unavail-cell">—</td>`;

      rows += `<tr>${nameCell}${per100Cell}${calcedCell}${unitCell}${pctCell}</tr>`;
    });
  });

  rows += '</tbody>';
  $('nutritionTable').innerHTML = rows;

  // Update table header with current grams
  const thForGrams = $('nutritionTable').querySelector('th:nth-child(3)');
  if (thForGrams) thForGrams.textContent = `For ${g} g`;
}

/* ─── Reset ──────────────────────────────────────────────────────────────────── */
function resetAnalysis() {
  currentProduct = null;
  currentGrams   = 100;
  searchInput.value = '';
  searchError.classList.remove('show');
  autocompleteEl.classList.remove('show');

  $$('.product-card').forEach(c => c.classList.remove('active'));

  const resultsEl = $('results');
  resultsEl.classList.remove('show');
  setTimeout(() => { resultsEl.style.display = 'none'; }, 300);

  // Scroll to top
  $('home').scrollIntoView({ behavior: 'smooth' });
}

/* ─── Scroll to products ─────────────────────────────────────────────────────── */
function scrollToProducts() {
  $('products').scrollIntoView({ behavior: 'smooth' });
}

/* ─── Init ───────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderProductCards();
});
