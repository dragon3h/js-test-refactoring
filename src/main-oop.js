import { data } from './data.js';

class City {
  name;
  population;
  area;
  density;
  country;
  densityPercentage;

  constructor(name, population, area, density, country) {
    this.name = name;
    this.population = population;
    this.area = area;
    this.density = density;
    this.country = country;
  }

  static parseData(data) {
    const lines = data.split('\n');

    return lines;
  }

  static createInitialTable(lines) {
    const table = [];

    for (const line of lines) {
      const cells = line.split(',');
      if (cells[3] === 'country') {
        cells[4] = 'DensityPercentage';
      }
      table.push(new City(cells[0].trim(), cells[1].trim(), cells[2].trim(), cells[3].trim(), cells[4].trim()));
    }

    return table;
  }

  static getMaxDensityDensity(table) {
    let maxDensity = 0;

    for (const row of table) {
      const density = parseInt(row.density);
      if (density > maxDensity) maxDensity = density;
    }

    return maxDensity;
  }

  static addDensityPercentageCell(table, maxDensity) {
    const tableWithPercentages = [...table];

    for (const row of tableWithPercentages) {
      const densityPercentage = Math.round((row.density * 100) / maxDensity);

      if (isNaN(densityPercentage)) {
        row.densityPercentage = 'DensityPercentage';
      } else {
        row.densityPercentage = densityPercentage.toString();
      }
    }

    return tableWithPercentages;
  }

  static compareDensities(table) {
    return table.sort((r1, r2) => r2.densityPercentage - r1.densityPercentage);
  }

  static printTable(table) {
    for (const row of table) {
      let s = row.name.padEnd(18);
      s += row.population.padStart(10);
      s += row.area.padStart(8);
      s += row.density.padStart(8);
      s += row.country.padStart(18);
      s += row.densityPercentage.padStart(18);
      console.log(s);
    }
  }

  static processCityData(data) {
    const lines = City.parseData(data);
    const table = City.createInitialTable(lines);
    const maxDensity = City.getMaxDensityDensity(table);
    const tableWithPercentages = City.addDensityPercentageCell(table, maxDensity);
    const sortedTable = City.compareDensities(tableWithPercentages);
    City.printTable(sortedTable);
  }
}

City.processCityData(data);
