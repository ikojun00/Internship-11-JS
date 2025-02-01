function analyzeSquares() {
  let N = prompt("Unesi N:");

  if (N === null) return;
  N = parseInt(N);

  if (isNaN(N) || N <= 0) {
    alert("N mora biti pozitivan broj!");
    return;
  }

  const squares = Array.from({ length: N }, (_, i) => Math.pow(i + 1, 2));
  const sum = squares.reduce((acc, curr) => acc + curr, 0);
  const average = sum / N;
  const sortedSquares = [...squares].sort((a, b) => a - b);

  const midIndex = N / 2;
  const median =
    N % 2 === 0
      ? (sortedSquares[midIndex - 1] + sortedSquares[midIndex]) / 2
      : sortedSquares[Math.floor(midIndex)];

  console.log(`Prvih ${N} kvadrata prirodnih brojeva`);
  console.log(squares.join(", "));
  console.log(`Ukupan zbroj: ${sum}`);
  console.log(`Prosječna vrijednost: ${average.toFixed(2)}`);
  console.log(`Medijan: ${median}`);
}

analyzeSquares();
