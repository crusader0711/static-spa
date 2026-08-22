/* ============================================================
   CUSTOM VIEWS — extension point for bespoke interactive pages.
   Register functions on window.CUSTOM; reference them by name
   from a { type: "custom", render: "fnName" } page in data.js.

   Each function receives (el, ctx):
     el   the <main> element to render into
     ctx  { lsGet, lsSet, esc, daysUntil }  shared helpers
   ============================================================ */

window.CUSTOM = {

  /* Example custom page: a unit converter + countdown.
     Replace or delete for your project. */
  toolsPage(el, ctx) {
    el.innerHTML = `
      <div class="section-label">Tools</div>

      <div class="tool">
        <h3>Example Calculator</h3>
        <label for="calc-in">INPUT VALUE</label>
        <input type="number" id="calc-in" step="any" inputmode="decimal" placeholder="e.g. 42">
        <div class="result" id="calc-out">—</div>
      </div>

      <div class="tool">
        <h3>Countdown</h3>
        <label for="cd-date">TARGET DATE</label>
        <input type="date" id="cd-date">
        <div class="result" id="cd-out">—</div>
      </div>`;

    const inp = document.getElementById("calc-in");
    inp.addEventListener("input", () => {
      const v = parseFloat(inp.value);
      document.getElementById("calc-out").textContent =
        isNaN(v) ? "—" : `×2 = ${(v * 2).toLocaleString()}`;
    });

    const dd = document.getElementById("cd-date");
    const saved = ctx.lsGet("cd-date");
    if (saved) { dd.value = saved; show(); }
    dd.addEventListener("change", () => { ctx.lsSet("cd-date", dd.value); show(); });
    function show() {
      if (!dd.value) return;
      const d = ctx.daysUntil(dd.value);
      document.getElementById("cd-out").textContent =
        d < 0 ? "DATE PASSED" : d === 0 ? "TODAY" : `${d} DAY${d === 1 ? "" : "S"} REMAINING`;
    }
  },

};
