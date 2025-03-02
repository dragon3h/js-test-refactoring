import { data } from './data.js';

const parseData = (data) => {
  return data?.split('\n');
};

const createInitialTable = (lines) => {
  const table = [];

  for (const line of lines) {
    const cells = line.split(',');
    table.push([cells[0].trim(), cells[1].trim(), cells[2].trim(), cells[3].trim(), cells[4].trim()]);
  }

  return table;
};

const getMaxDensity = (table) => {
  let maxDensity = 0;

  for (const row of table) {
    const density = parseInt(row[3]);
    if (density > maxDensity) maxDensity = density;
  }

  return maxDensity;
};

const addDensityPercentageCell = (table, maxDensity) => {
  const tableWithPercentages = [...table];

  for (const row of tableWithPercentages) {
    let a = Math.round((row[3] * 100) / maxDensity);
    if (isNaN(a)) {
      a = 'DensityPercentage';
    }

    row.push(a.toString());
  }

  return tableWithPercentages;
};

const compareDensities = (table) => {
  return table.sort((r1, r2) => r2[5] - r1[5]);
};

const printTable = (table) => {
  for (const row of table) {
    let s = row[0].padEnd(18);
    s += row[1].padStart(10);
    s += row[2].padStart(8);
    s += row[3].padStart(8);
    s += row[4].padStart(18);
    s += row[5].padStart(18);
    console.log(s);
  }
};

const generateCityDataReport = (data) => {
  const lines = parseData(data);
  const table = createInitialTable(lines);
  const max = getMaxDensity(table);
  const tableWithPercentages = addDensityPercentageCell(table, max);
  const sortedTable = compareDensities(tableWithPercentages);
  printTable(sortedTable);
};

if (data) {
  generateCityDataReport(data);
}
