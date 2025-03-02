const data = `city,population,area,density,country
  Shanghai,24256800,6340,3826,China
  Delhi,16787941,1484,11313,India
  Lagos,16060303,1171,13712,Nigeria
  Istanbul,14160467,5461,2593,Turkey
  Tokyo,13513734,2191,6168,Japan
  Sao Paulo,12038175,1521,7914,Brazil
  Mexico City,8874724,1486,5974,Mexico
  London,8673713,1572,5431,United Kingdom
  New York City,8537673,784,10892,United States
  Bangkok,8280925,1569,5279,Thailand`;

const parseData = (data) => {
  const lines = data.split('\n');
  lines.pop();

  return lines;
};

const createInitialTable = (lines) => {
  const table = [];
  let first = true;

  for (const line of lines) {
    if (first) {
      first = false;
    } else {
      const cells = line.split(',');
      table.push([cells[0], cells[1], cells[2], cells[3], cells[4]]);
    }
  }

  return table;
};

const getMaxDensity = (table) => {
  let max = 0;

  for (const row of table) {
    const d = parseInt(row[3]);
    if (d > max) max = d;
  }

  return max;
};

const addDensityPercentageCell = (table, max) => {
  const tableWithPercentages = [...table];

  for (const row of tableWithPercentages) {
    const a = Math.round((row[3] * 100) / max);
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
    s += row[5].padStart(6);
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
