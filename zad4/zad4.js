function analyzePlants() {
  const plants = [];

  while (true) {
    const name = prompt("Unesi ime biljke:");
    if (name === "") {
      alert("Unos imena biljke je obavezno!");
      continue;
    }
    if (name === null) break;

    const color = prompt("Unesi boju biljke:");
    if (color === "") {
      alert("Unos boje biljke je obavezno!");
      continue;
    }
    if (color === null) break;

    const calories = parseFloat(prompt("Unesi kalorije:"));
    if (calories === null) break;
    if (isNaN(calories) || calories <= 0) {
      alert("Broj kalorija mora biti pozitivan broj!");
      continue;
    }

    plants.push({ name, color, calories });

    let continueInput = confirm("Želite li unijeti još jednu biljku?");
    if (!continueInput) break;
  }

  if (plants.length === 0) {
    alert("Nema unesenih biljki!");
    return;
  }

  const colorStats = {};

  plants.forEach((plant) => {
    if (!colorStats[plant.color]) {
      colorStats[plant.color] = {
        plants: [],
        totalCalories: 0,
      };
    }
    colorStats[plant.color].plants.push(plant);
    colorStats[plant.color].totalCalories += plant.calories;
  });

  const sortedColors = Object.entries(colorStats)
    .map(([color, stats]) => ({
      color,
      plants: stats.plants,
      totalCalories: stats.totalCalories,
    }))
    .sort((a, b) => a.color.localeCompare(b.color));

  console.log("Analiza biljki prema bojama");
  console.log("-".repeat(50));

  sortedColors.forEach((colorData) => {
    console.log(`Boja: ${colorData.color}`);
    console.log(`Ukupan broj kalorija: ${colorData.totalCalories}`);
    console.log("Biljke:");
    colorData.plants.forEach((plant) => {
      console.log(`- ${plant.name}: ${plant.calories} kalorije`);
    });
  });

  const topColors = [...sortedColors]
    .sort((a, b) => b.totalCalories - a.totalCalories)
    .slice(0, 3);

  console.log("\nTri boje s najvećim kalorijskim doprinosom:");
  console.log("-".repeat(50));
  topColors.forEach((colorData, index) => {
    console.log(
      `${index + 1}. ${colorData.color}: ${colorData.totalCalories} kalorije`
    );
  });
}

analyzePlants();
