function solveWaterJugRiddle(x, y, z) {
  let jugX = 0;
  let jugY = 0;
  const jugXCapacity = x;
  const jugYCapacity = y;
  const steps = [];

  while (jugX !== z && jugY !== z) {
    // Fill jugX if it's empty
    if (jugX === 0) {
      jugX = jugXCapacity;
      steps.push({ jugX, jugY });
    }

    // Pour jugX into jugY until jugY is full or jugX is empty
    while (jugY < jugYCapacity && jugX > 0) {
      const amountToPour = Math.min(jugX, jugYCapacity - jugY);
      jugX -= amountToPour;
      jugY += amountToPour;
      steps.push({ jugX, jugY });
    }

    // Empty jugY if it's full
    if (jugY === jugYCapacity) {
      jugY = 0;
      steps.push({ jugX, jugY });
    }
  }

  return steps;
}

function displaySolution(steps, x, y) {
  const solutionDiv = document.getElementById('solution');
  solutionDiv.innerHTML = '';

  if (steps.length === 0) {
    solutionDiv.textContent = 'No Solution';
    return;
  }

  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  const jugXHeader = document.createElement('th');
  const jugYHeader = document.createElement('th');

  jugXHeader.textContent = 'X-gallon jug';
  jugYHeader.textContent = 'Y-gallon jug';

  headerRow.appendChild(jugXHeader);
  headerRow.appendChild(jugYHeader);
  table.appendChild(headerRow);

  for (const step of steps) {
    const row = document.createElement('tr');
    const jugXCell = document.createElement('td');
    const jugYCell = document.createElement('td');

    jugXCell.textContent = step.jugX;
    jugYCell.textContent = step.jugY;

    row.appendChild(jugXCell);
    row.appendChild(jugYCell);
    table.appendChild(row);
  }

  solutionDiv.appendChild(table);
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('inputForm');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    let x = parseInt(document.getElementById('x').value);
    let y = parseInt(document.getElementById('y').value);
    const z = parseInt(document.getElementById('z').value);
    

    if (y > x) {
      // Swap the values of x and y
      const temp = x;
      x = y;
      y = temp;
    }

    const steps = solveWaterJugRiddle(x, y, z);
    displaySolution(steps, x, y);
  });
});