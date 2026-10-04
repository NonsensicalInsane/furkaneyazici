// Renders <PlotlyChart> placeholders. Plotly is large, so it — and each
// chart's JSON — is fetched only when a chart is about to scroll into view.
// Uses Plotly's "strict" bundle: the regular one relies on eval-style code
// that the site's Content-Security-Policy blocks.

const text = 'rgb(226, 232, 240)';
const grid = 'rgba(148, 163, 184, 0.2)';
const axis = { gridcolor: grid, zerolinecolor: grid, linecolor: grid, tickcolor: grid, automargin: true };

// Replaces the notebook's template, so figures match the site without any
// styling in Python. Colours set explicitly in a figure still win.
const SITE_TEMPLATE = {
  layout: {
    font: { family: "'Inter Variable', Inter, system-ui, sans-serif", color: text, size: 14 },
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
    // blue-500, violet-500, emerald-400, amber-400, pink-400, cyan-400, orange-400, lime-400
    colorway: ['#3b82f6', '#8b5cf6', '#34d399', '#fbbf24', '#f472b6', '#22d3ee', '#fb923c', '#a3e635'],
    xaxis: axis,
    yaxis: axis,
    scene: {
      xaxis: { ...axis, backgroundcolor: 'rgba(0, 0, 0, 0)' },
      yaxis: { ...axis, backgroundcolor: 'rgba(0, 0, 0, 0)' },
      zaxis: { ...axis, backgroundcolor: 'rgba(0, 0, 0, 0)' },
    },
    polar: { bgcolor: 'rgba(0, 0, 0, 0)', angularaxis: axis, radialaxis: axis },
    legend: { bgcolor: 'rgba(0, 0, 0, 0)' },
    hoverlabel: { bgcolor: '#0f172a', bordercolor: '#334155', font: { color: text } },
    margin: { t: 40, r: 20, b: 50, l: 60 },
  },
};

const CONFIG = {
  responsive: true,
  displaylogo: false,
  modeBarButtonsToRemove: ['sendDataToCloud', 'lasso2d', 'select2d'],
};

let plotly;
const loadPlotly = () => (plotly ??= import('plotly.js-strict-dist').then((m) => m.default ?? m));

async function render(el) {
  const status = el.querySelector('.plotly-chart-status');
  try {
    const [Plotly, figure] = await Promise.all([
      loadPlotly(),
      fetch(el.dataset.plotlySrc).then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.url}`);
        return res.json();
      }),
    ]);
    // The container sets the size; a fixed width from the notebook would overflow on phones
    const layout = { ...(figure.layout || {}) };
    delete layout.width;
    delete layout.height;
    el.replaceChildren();
    await Plotly.newPlot(el, figure.data || [], { ...layout, template: SITE_TEMPLATE, autosize: true }, CONFIG);
  } catch (error) {
    if (status) status.textContent = 'The interactive chart could not be loaded.';
    console.error('PlotlyChart:', error);
  }
}

export function initPlotlyCharts() {
  const charts = document.querySelectorAll('[data-plotly-src]');
  if (!charts.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        render(entry.target);
      });
    },
    { rootMargin: '300px 0px' }
  );
  charts.forEach((chart) => observer.observe(chart));
}
