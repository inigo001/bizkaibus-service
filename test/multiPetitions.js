const expect = require('chai').expect;
const BizkaibusService = require('../dist/BizkaibusService');
const TOWNS = require('../dist/data/towns').TOWNS;

describe('Multi Petitions', () => {

    const BBService = new BizkaibusService();

    const RERUNS = 10;

    describe('PasoParadas', async () => {

        let paradasTown = [];
        let randomTown;
        let paradaTown;

        beforeEach(async () => {
            do {
                randomTown = getRandomElement(TOWNS).name;
                paradasTown = await BBService.getParadasTown(randomTown);
            } while (paradasTown.length === 0)

            paradaTown = getRandomElement(paradasTown);
        });

        for (let i = 0; i < RERUNS; i++) {
            it(`Return an array for PasoParada`, async function () {

                const result = await BBService.getPasoParada(paradaTown);
                expect(result).to.be.an('array');

                if (result.length > 0) {
                    expect(result[0]).to.have.property('lineCode');
                    expect(result[0]).to.have.property('route');
                    expect(result[0]).to.have.property('times').to.be.an('array').length.is.at.least(1);
                }

                this.test.title = `Return an array for PasoParada in ${randomTown} - ${paradaTown.denomination}`;
            });
        }

    });

    describe('GetFromTo', () => {

        let randomTown1;
        let randomTown2;

        beforeEach(async () => {
            randomTown1 = getRandomElement(TOWNS).name;
            randomTown2 = getRandomElement(TOWNS).name;
        });

        for (let i = 0; i < RERUNS; i++) {
            it(`Return an array from Town to Town`, async function () {
                const result = await BBService.getFromTo(randomTown1, randomTown2);
                expect(result).to.be.an('array');

                this.test.title = `Return an array from ${randomTown1} to ${randomTown2}`;
            });

        }
    });



});


function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}