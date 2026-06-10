const DATA_URL =
  "https://codejay22.github.io/ml-essentials/data/archive/verses-history.json";

let verses = [];

// FETCH DATA
fetch(DATA_URL + "?v=" + new Date().getTime())
  .then(res => res.json())
  .then(data => {
    verses = data.reverse(); // newest first
    render(verses);
  });

// RENDER FUNCTION
function render(data) {
  const container = document.getElementById("results");

  if (!data.length) {
    container.innerHTML = "No results found.";
    return;
  }

  container.innerHTML = data
    .map(v => `
      <div class="card">
        <div class="reference">${v.reference}</div>
        <div>${v.text}</div>
        <div class="date">${v.date}</div>
      </div>
    `)
    .join("");
}

// SEARCH (REAL-TIME)
document.getElementById("searchBox").addEventListener("input", e => {
  const query = e.target.value.toLowerCase();

  const filtered = verses.filter(v =>
    v.text.toLowerCase().includes(query) ||
    v.reference.toLowerCase().includes(query)
  );

  render(filtered);
});

// LAST 7 DAYS FILTER
function last7Days() {
  const today = new Date();

  return verses.filter(v => {
    const vDate = new Date(v.date);
    const diff = (today - vDate) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  });
}
