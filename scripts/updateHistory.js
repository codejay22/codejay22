const fs = require("fs");

const latestPath = "./data/raw/latest.json";
const historyPath = "./data/archive/verses-history.json";

function updateHistory() {
  const latest = JSON.parse(fs.readFileSync(latestPath));

  let history = [];

  if (fs.existsSync(historyPath)) {
    history = JSON.parse(fs.readFileSync(historyPath));
  }

  // Prevent duplicates
  const exists = history.find(v => v.date === latest.date);

  if (!exists) {
    history.push(latest);
    console.log("✅ New verse added");
  } else {
    console.log("ℹ️ Verse already exists");
  }

  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
}

updateHistory();

