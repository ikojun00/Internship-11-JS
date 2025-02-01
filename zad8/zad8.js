let equipment = [];

const form = document.getElementById("equipmentForm");
const equipmentList = document.getElementById("equipmentList");
const statusRatio = document.getElementById("statusRatio");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const status = document.getElementById("status").value;

  equipment.push({ name, price, status });

  form.reset();
  updateDisplay();
});

function updateDisplay() {
  equipment.sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === "available" ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

  equipmentList.innerHTML = "";

  equipment.forEach((item) => {
    const div = document.createElement("div");
    div.className = "equipment-item";
    div.style.color = item.status === "available" ? "green" : "red";
    div.textContent = `${item.name} - ${item.price.toFixed(2)}€`;
    equipmentList.appendChild(div);
  });

  updateStatusRatio();
}

function updateStatusRatio() {
  const available = equipment.filter(
    (item) => item.status === "available"
  ).length;
  const unavailable = equipment.filter(
    (item) => item.status === "unavailable"
  ).length;
  const total = equipment.length;

  if (total > 0) {
    statusRatio.innerHTML = `
            <h3>Omjer dostupne i nedostupne opreme</h3>
            <p>Dostupno: ${available} (${((available / total) * 100).toFixed(
      1
    )}%)</p>
            <p>Nedostupno: ${unavailable} (${(
      (unavailable / total) *
      100
    ).toFixed(1)}%)</p>
            <p>Ukupna količina opreme: ${total}</p>
        `;
  } else {
    statusRatio.innerHTML = "<p>Nema unesene opreme!</p>";
  }
}

updateDisplay();
