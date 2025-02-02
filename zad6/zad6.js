function analyzeEquipment() {
  const equipment = [];
  let totalValue = 0;
  let unavailableValue = 0;

  while (true) {
    const name = prompt("Unesi naziv opreme:");
    if (name === "") {
      alert("Unos imena biljke je obavezno!");
      continue;
    }
    if (name === null) break;

    const price = parseFloat(prompt("Unesi cijenu oprema:"));
    if (price === null) break;
    if (isNaN(price) || price < 0) {
      alert("Cijena mora biti pozitivan broj!");
      continue;
    }

    const status = prompt(
      "Unesi status (dostupno ili nedostupno):"
    ).toLowerCase();
    if (status === null) break;
    if (status !== "dostupno" && status !== "nedostupno") {
      alert("Status mora biti dostupno ili nedostupno.");
      continue;
    }

    equipment.push({ name, price, status });
    totalValue += price;
    if (status === "nedostupno") {
      unavailableValue += price;
    }

    let continueInput = confirm("Želite li unijeti još jedan predmet?");
    if (!continueInput) break;
  }

  if (equipment.length === 0) {
    alert("Nema unesene opreme!");
    return;
  }

  console.log("Indeksi nedostupne opreme:");
  equipment.forEach((item, index) => {
    if (item.status === "nedostupno") {
      console.log(`Indeks ${index}: ${item.name}`);
    }
  });

  const availableEquipment = equipment
    .filter((item) => item.status === "dostupno")
    .sort((a, b) => {
      if (a.price !== b.price) {
        return a.price - b.price;
      }
      return a.name.localeCompare(b.name);
    });

  console.log("Popis dostupne opreme:");
  availableEquipment.forEach((item) => {
    console.log(`${item.name}: ${item.price.toFixed(2)}€`);
  });

  const unavailablePercentage = (unavailableValue / totalValue) * 100;
  console.log(
    `Postotak ukupne vrijednosti koju čini nedostupna oprema: ${unavailablePercentage.toFixed(
      2
    )}%`
  );

  const priceRanges = {
    Jeftina: { min: 0, max: totalValue * 0.33, items: [] },
    Srednja: { min: totalValue * 0.33, max: totalValue * 0.66, items: [] },
    Skupa: { min: totalValue * 0.66, max: Infinity, items: [] },
  };

  availableEquipment.forEach((item) => {
    for (const [range, data] of Object.entries(priceRanges)) {
      if (item.price > data.min && item.price <= data.max) {
        data.items.push(item);
        break;
      }
    }
  });

  console.log("Dostupna oprema prema cjenovnim rangovima");
  Object.entries(priceRanges).forEach(([range, data]) => {
    console.log(
      `${range} (${data.min.toFixed(2)} - ${
        data.max === Infinity ? "iznad" : data.max.toFixed(2)
      }):`
    );
    if (data.items.length > 0) {
      data.items.forEach((item) => {
        console.log(`- ${item.name}: ${item.price.toFixed(2)}€`);
      });
    } else {
      console.log("Nema opreme u cjenovnom rangu.");
    }
  });
}

analyzeEquipment();
