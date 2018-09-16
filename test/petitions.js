const chai = require('chai');
const expect = chai.expect;

const BizkaibusService = require('../dist/BizkaibusService').default;
const TOWNS = require('../dist/data/towns').TOWNS;

describe('Petitions', function () {

  const BBService = new BizkaibusService();
  const paradas = [];

  describe('GetParadasTown', () => {
    const MAX_TRIES = 5;
    let tries = 0;

    while (tries < MAX_TRIES) {
      const randomTown = getRandomElement(TOWNS).name;

      it(`Return an array for town: ${randomTown}`, done => {

        BBService.getParadasTown(randomTown).then(result => {
          paradas.push(getRandomElement(result));

          expect(result).to.be.an('array').length.is.at.least(1);
        }).finally(done);

      });

      tries++;
    }
  });

});


function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}