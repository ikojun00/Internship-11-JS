function analyzeIndustryData() {
  const employees = [];

  while (true) {
    const firstName = prompt("Unesite ime zaposlenika:");
    if (firstName === "") {
      alert("Unos imena zaposlenika je obavezno!");
      continue;
    }
    if (firstName === null) break;

    const lastName = prompt("Unesite prezime zaposlenika:");
    if (lastName === "") {
      alert("Unos imena zaposlenika je obavezno!");
      continue;
    }
    if (lastName === null) break;

    const industry = prompt("Unesite industriju u kojoj radi:");
    if (industry === "") {
      alert("Unos imena zaposlenika je obavezno!");
      continue;
    }
    if (industry === null) break;

    const salary = parseFloat(prompt("Unesi plaću zaposlenika:"));
    if (salary === null) break;
    if (isNaN(salary) || salary <= 0) {
      alert("Plaća mora biti pozitivan broj!");
      continue;
    }

    employees.push({ firstName, lastName, industry, salary });

    let continueInput = confirm("Želite li unijeti još jednog zaposlenika?");
    if (!continueInput) break;
  }

  if (employees.length === 0) {
    alert("Nema unesenih zaposlenika!");
    return;
  }

  const industryStats = {};

  employees.forEach((emp) => {
    if (!industryStats[emp.industry]) {
      industryStats[emp.industry] = {
        totalSalary: 0,
        employeeCount: 0,
        averageSalary: 0,
      };
    }
    industryStats[emp.industry].totalSalary += emp.salary;
    industryStats[emp.industry].employeeCount += 1;
  });

  const filteredStats = Object.entries(industryStats)
    .filter(([_, stats]) => stats.employeeCount >= 2)
    .map(([industry, stats]) => ({
      industry,
      averageSalary: stats.totalSalary / stats.employeeCount,
      employeeCount: stats.employeeCount,
    }))
    .sort((a, b) => b.averageSalary - a.averageSalary);

  console.log("Industrije s najmanje dva zaposlenika");
  console.log("-".repeat(50));

  filteredStats.forEach((stat) => {
    console.log(`Industrija: ${stat.industry}`);
    console.log(`Prosječna plaća: $${stat.averageSalary.toFixed(2)}`);
    console.log(`Broj zaposlenika: ${stat.employeeCount}`);
    console.log("-".repeat(50));
  });
}

analyzeIndustryData();
