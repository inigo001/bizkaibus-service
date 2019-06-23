const expect = require('chai').expect;
const BizkaibusService = require('../dist/BizkaibusService');
const TOWNS = require('../dist/data/towns').TOWNS;

describe('Single Petitions', () => {

  const BBService = new BizkaibusService();

  describe('GetParadasTown', () => {
    const randomTown = getRandomElement(TOWNS).name;

    it(`Return an array for town: ${randomTown}`, async () => {
      const result = await BBService.getParadasTown(randomTown);
      expect(result).to.be.an('array').length.is.at.least(1);
    });
  });

  describe('GetFromTo', () => {
    const randomTown1 = getRandomElement(TOWNS).name;
    const randomTown2 = getRandomElement(TOWNS).name;

    it(`Return an array from ${randomTown1} to ${randomTown2}`, async () => {
      const result = await BBService.getFromTo(randomTown1, randomTown2);
      expect(result).to.be.an('array');
    });
  });

  describe('GetHorario', () => {

    it(`Return Horario for line 3911`, async () => {
      const result = await BBService.getHorario('3911');
      expect(result).to.be.an('object');
    });

    it(`Return Horario for line A3632`, async () => {
      const result = await BBService.getHorario('A3632');
      expect(result).to.be.an('object');
    });
  });

  describe('GetInfoLineas', () => {

    it(`Return Info for line 3911`, async () => {
      const result = await BBService.getLineInfo('3911');
      expect(result).to.be.an('object');
    });

    it(`Return Info for line A3632`, async () => {
      const result = await BBService.getLineInfo('3632');
      expect(result).to.be.an('object');
    });

  });

  describe('GetVehiculos', () => {

    it(`Return Vehicles for line 3911`, async () => {
      const result = await BBService.getVehicles('3911');
      expect(result).to.be.an('array')
    });

    it(`Return Vehicles for line A3632`, async () => {
      const result = await BBService.getVehicles('3632');
      expect(result).to.be.an('array')
    });
  });

});


function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}