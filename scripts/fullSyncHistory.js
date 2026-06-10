const fs = require("fs");
const axios = require("axios");

const URL =
  "https://raw.githubusercontent.com/codejay22/daily-verses/refs/heads/main/verses-2026.json";

async function fullSync() {
  try {
    const res = await axios.get(URL);
    const verses = res.data.verses;

    // Keep only valid verse entries
    const clean = verses
      .filter(v => v.date && v.text)
      .map(v => ({
        date: v.date,
        reference: v.ref || "Unknown",
        text: v.text.trim()
      }));

    // Sort by date (oldest → newest)
    clean.sort((a, b) => new Date(a.date) - new Date(b.date));

    fs.writeFileSync(
      "./data/archive/verses-history.json",
      JSON.stringify(clean, null, 2)
    );

    console.log(`✅ FULL SYNC COMPLETE: ${clean.length} verses`);
  } catch (err) {
    console.error("❌ Error syncing:", err.message);
  }
}

fullSync();
