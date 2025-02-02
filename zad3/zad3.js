function analyzeSectorSalaries() {
  const employees = [];
  let totalSalary = 0;

  while (true) {
    const firstName = prompt("Unesite ime zaposlenika:");
    if (firstName === "") {
      alert("Unos imena zaposlenika je obavezno!");
      continue;
    }
    if (firstName === null) break;

    const lastName = prompt("Unesite prezime zaposlenika:");
    if (lastName === "") {
      alert("Unos prezimena zaposlenika je obavezno!");
      continue;
    }
    if (lastName === null) break;

    const sector = prompt("Unos sektora:");
    if (lastName === "") {
      alert("Unos sektora je obavezno!");
      continue;
    }
    if (sector === null) break;

    const salary = parseFloat(prompt("Unesi plaću zaposlenika:"));
    if (salary === null) break;
    if (isNaN(salary) || salary <= 0) {
      alert("Plaća mora biti pozitivan broj!");
      continue;
    }

    employees.push({ firstName, lastName, sector, salary });
    totalSalary += salary;

    let continueInput = confirm("Želite li unijeti još jednog zaposlenika?");
    if (!continueInput) break;
  }

  if (employees.length === 0) {
    alert("Nema unesenih zaposlenika!");
    return;
  }

  const sectorStats = {};

  employees.forEach((emp) => {
    if (!sectorStats[emp.sector]) {
      sectorStats[emp.sector] = {
        totalSalary: 0,
        employees: [],
      };
    }
    sectorStats[emp.sector].totalSalary += emp.salary;
    sectorStats[emp.sector].employees.push(emp);
  });

  const sortedSectors = Object.entries(sectorStats)
    .map(([sector, stats]) => ({
      sector,
      totalSectorSalary: stats.totalSalary,
      sectorContributionPercentage: (stats.totalSalary / totalSalary) * 100,
      employees: stats.employees,
    }))
    .sort(
      (a, b) => b.sectorContributionPercentage - a.sectorContributionPercentage
    );

  console.log("Analiza plaća po sektorima");
  console.log("-".repeat(50));

  sortedSectors.forEach((sectorData) => {
    console.log(`Sektor: ${sectorData.sector}`);
    console.log(
      `Postotak doprinosa u ukupnoj plaći: ${sectorData.sectorContributionPercentage.toFixed(
        2
      )}%`
    );

    console.log("\nPostotak doprinosa zaposlenika u ukupnoj plaći sektora:");
    sectorData.employees.forEach((emp) => {
      const employeeContributionPercentage =
        (emp.salary / sectorData.totalSectorSalary) * 100;
      console.log(
        `- ${emp.lastName}, ${emp.firstName}: ${emp.salary.toFixed(
          2
        )}€ (${employeeContributionPercentage.toFixed(2)}% sektora)`
      );
    });
    console.log("-".repeat(50));
  });
}

analyzeSectorSalaries();
