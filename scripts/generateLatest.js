const fs = require("fs");
const axios = require("axios");

const URL =
  "https://raw.githubusercontent.com/codejay22/daily-verses/refs/heads/main/verses-2026.json";

async function generateLatest() {
  try {
    const res = await axios.get(URL);
    const verses = res.data.verses;

    // Filter valid verses (avoid month-only objects)
    const valid = verses.filter(v => v.date && v.text);

    // Sort by latest date
    valid.sort((a, b) => new Date(b.date) - new Date(a.date));

    const latest = valid[0];

    const output = {
      date: latest.date,
      reference: latest.ref || "Unknown",
      text: latest.text
    };

    fs.writeFileSync(
      "./data/raw/latest.json",
      JSON.stringify(output, null, 2)
    );

    console.log("✅ latest.json updated");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

generateLatest();
