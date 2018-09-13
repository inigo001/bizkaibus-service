const chai = require('chai');
const expect = chai.expect;

const BizkaibusService = require('../dist/BizkaibusService').default;
const TOWNS = require('../dist/data/towns').TOWNS;

describe('Petitions', function () {

  const BBService = new BizkaibusService();

  describe('getParadasTown', function () {

    const MAX_TRIES = 5;
    let tries = 0;

    while (tries < MAX_TRIES) {

      const randomTown = getRandomTown();

      it('should return an array in all petitions', done => {
        BBService.getParadasTown(randomTown).then((result) => {

            console.group(randomTown)
            console.log(result);
            console.groupEnd();

            expect(result).to.be.an('array').length.is.at.least(1);
          })
          .finally(done);
      });

      tries++;
    }


  });
});


function getRandomTown() {
  return TOWNS[Math.floor(Math.random() * TOWNS.length)].name;
}