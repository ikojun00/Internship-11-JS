function filterCities() {
  const cityInput = document.getElementById("cityInput").value;
  const cities = cityInput
    .split("\n")
    .map((city) => city.trim())
    .filter((city) => city.length > 0);

  return cities
    .filter((city) => city.length > 5)
    .sort((a, b) => a.localeCompare(b));
}

function processCities() {
  const filteredCities = filterCities();

  const filteredCitiesDiv = document.getElementById("filteredCities");
  filteredCities.length > 0
    ? (filteredCitiesDiv.textContent = filteredCities.join(", "))
    : (filteredCitiesDiv.textContent =
        "Nema gradova s nazivom duljim od 5 slova.");
}

function saveToFile() {
  const filteredCities = filterCities();

  if (filteredCities.length === 0) {
    alert("Nema gradova s nazivom duljim od 5 slova!");
    return;
  }

  const csvContent = filteredCities.join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "filtered_cities.csv";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
