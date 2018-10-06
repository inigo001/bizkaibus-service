const expect = require('chai').expect;
const BizkaibusService = require('../dist/BizkaibusService');
const TOWNS = require('../dist/data/towns').TOWNS;

describe('Petitions', function () {

  const BBService = new BizkaibusService();
  let error;

  describe('GetParadasTown', () => {
    const randomTown = getRandomElement(TOWNS).name;

    it(`Return an array for town: ${randomTown}`, done => {

      BBService.getParadasTown(randomTown)
        .then(result => expect(result).to.be.an('array').length.is.at.least(1))
        .catch(err => error = err)
        .finally(() => {
          if (error) {
            return done(new Error(error));
          } else {
            return done();
          }
        });
    });
  });

  describe('GetFromTo', () => {
    const randomTown1 = getRandomElement(TOWNS).name;
    const randomTown2 = getRandomElement(TOWNS).name;
    let error;

    it(`Return an array from ${randomTown1} to ${randomTown2}`, done => {

      BBService.getFromTo(randomTown1, randomTown2)
        .then(result => expect(result).to.be.an('array'))
        .catch(err => error = err)
        .finally(() => {
          if (error) {
            return done(new Error(error));
          } else {
            return done();
          }
        });

    });
  });

  describe('GetHorario', () => {

    let error;

    it(`Return Horario for line 3911`, done => {

      BBService.getHorario('3911')
        .then(result => expect(result).to.be.an('object'))
        .catch(err => error = err)
        .finally(() => {
          if (error) {
            return done(new Error(error));
          } else {
            return done();
          }
        });
    });

    it(`Return Horario for line A3632`, done => {

      BBService.getHorario('A3632')
        .then(result => expect(result).to.be.an('object'))
        .catch(err => error = err)
        .finally(() => {
          if (error) {
            return done(new Error(error));
          } else {
            return done();
          }
        });
    });  });

  describe('GetInfoLineas', () => {

    let error;

    it(`Return Info for line 3911`, done => {

      BBService.getLineInfo('3911')
        .then(result => expect(result).to.be.an('object'))
        .catch(err => error = err)
        .finally(() => {
          if (error) {
            return done(new Error(error));
          } else {
            return done();
          }
        });
    });

    it(`Return Info for line A3632`, done => {

      BBService.getLineInfo('3632')
        .then(result => expect(result).to.be.an('object'))
        .catch(err => error = err)
        .finally(() => {
          if (error) {
            return done(new Error(error));
          } else {
            return done();
          }
        });
    });
  });

});


function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}