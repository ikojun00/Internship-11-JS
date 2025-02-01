class Book {
  constructor(title, price, genre) {
    this.title = title;
    this.price = price;
    this.genre = genre;
  }
}

function analyzeBooks() {
  const books = [];

  while (true) {
    const title = prompt("Unesite naslov knjige:");
    if (title === "") {
      alert("Naslov knjige je obavezan!");
      continue;
    }
    if (title === null) break;

    const price = parseFloat(prompt("Unesite cijenu knjige:"));
    if (price === null) break;
    if (isNaN(price) || price <= 0) {
      alert("Cijena mora biti pozitivan broj!");
      continue;
    }

    const genre = prompt("Unesite žanr knjige:");
    if (genre === "") {
      alert("Žanr knjige je obavezan!");
      continue;
    }
    if (genre === null) break;

    books.push(new Book(title, price, genre));

    let continueInput = confirm("Želite li unijeti još jednu knjigu?");
    if (!continueInput) break;
  }

  if (books.length === 0) {
    alert("Nema unesenih knjiga za analizu!");
    return;
  }

  const averagePrice = calculateAveragePrice(books);
  console.log(`Prosječna cijena knjiga: ${averagePrice.toFixed(2)} €`);

  const maxDeviationBook = findMaxDeviationBook(books, averagePrice);
  console.log("\nKnjiga koja najviše odstupa od prosječne cijene:");
  console.log(`Naslov: ${maxDeviationBook.title}`);
  console.log(`Cijena: ${maxDeviationBook.price} €`);
  console.log(
    `Odstupanje: ${Math.abs(maxDeviationBook.price - averagePrice).toFixed(
      2
    )} €`
  );

  const sortedBooks = sortBooksByDeviation(books, averagePrice);
  console.log("\nKnjige sortirane prema odstupanju od prosjeka:");
  sortedBooks.forEach((book) => {
    const deviation = calculateDeviation(book.price, averagePrice);
    console.log(
      `${book.title} - Odstupanje: ${deviation.toFixed(2)} € (Cijena: ${
        book.price
      } €)`
    );
  });
}

function calculateDeviation(price, averagePrice) {
  return Math.abs(price - averagePrice);
}

function calculateAveragePrice(books) {
  const sum = books.reduce((acc, book) => acc + book.price, 0);
  return sum / books.length;
}

function findMaxDeviationBook(books, averagePrice) {
  let maxBook = books[0];
  let maxDeviation = calculateDeviation(maxBook.price, averagePrice);

  for (const currentBook of books) {
    const currentDeviation = calculateDeviation(
      currentBook.price,
      averagePrice
    );
    if (currentDeviation > maxDeviation) {
      maxBook = currentBook;
      maxDeviation = currentDeviation;
    }
  }
  return maxBook;
}

function sortBooksByDeviation(books, averagePrice) {
  return [...books].sort((a, b) => {
    const deviationA = calculateDeviation(a.price, averagePrice);
    const deviationB = calculateDeviation(b.price, averagePrice);
    return deviationB - deviationA;
  });
}

analyzeBooks();
