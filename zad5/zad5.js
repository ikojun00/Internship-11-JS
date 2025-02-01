function analyzeStudentResults() {
  const students = [];
  let maxScore = 0;

  while (true) {
    const firstName = prompt("Unesi ime studenta:");
    if (firstName === "") {
      alert("Unos imena studenta je obavezno!");
      continue;
    }
    if (firstName === null) break;

    const lastName = prompt("Unesi prezime studenta:");
    if (lastName === "") {
      alert("Unos imena prezimena je obavezno!");
      continue;
    }
    if (lastName === null) break;

    const score = parseFloat(prompt("Unesi broj bodova:"));
    if (isNaN(score) || score < 0) {
      alert("Broj bodova mora biti pozitivan broj!");
      continue;
    }

    maxScore = Math.max(maxScore, score);
    students.push({ firstName, lastName, score });

    let continueInput = confirm("Želite li unijeti još jednog studenta?");
    if (!continueInput) break;
  }

  if (students.length === 0) {
    alert("Nema unesenih studenata!");
    return;
  }

  const categories = {
    "Category 1 (0-25%)": {
      students: [],
      totalScore: 0,
      minScore: 0,
      maxScore: maxScore * 0.25,
    },
    "Category 2 (25-50%)": {
      students: [],
      totalScore: 0,
      minScore: maxScore * 0.25,
      maxScore: maxScore * 0.5,
    },
    "Category 3 (50-75%)": {
      students: [],
      totalScore: 0,
      minScore: maxScore * 0.5,
      maxScore: maxScore * 0.75,
    },
    "Category 4 (75-100%)": {
      students: [],
      totalScore: 0,
      minScore: maxScore * 0.75,
      maxScore: maxScore,
    },
  };

  students.forEach((student) => {
    for (const [category, data] of Object.entries(categories)) {
      if (student.score > data.minScore && student.score <= data.maxScore) {
        data.students.push(student);
        data.totalScore += student.score;
        break;
      }
    }
  });

  console.log("Grupiranje studenata po rezultatima testova");
  console.log("--------------------------");

  Object.entries(categories).forEach(([category, data]) => {
    if (data.students.length > 0) {
      console.log(`${category}`);
      console.log("Studenti:");

      data.students
        .sort((a, b) => a.lastName.localeCompare(b.lastName))
        .forEach((student) => {
          console.log(
            `- ${student.lastName}, ${student.firstName}: ${student.score}`
          );
        });

      const averageScore = data.totalScore / data.students.length;
      console.log(`Prosječan broj bodova: ${averageScore.toFixed(2)}`);
      console.log(`Broj studenata: ${data.students.length}`);
    } else {
      console.log(`Nema studenata u ${category}!`);
    }
  });
}

analyzeStudentResults();
