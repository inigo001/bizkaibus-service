import {
    BizkaibusService
} from './BizkaibusService';

export { BizkaibusService } from './BizkaibusService';

import { TOWNS } from './data/towns';

const desde: string = process.argv[2];
const hasta: string = process.argv[3];

const BBService = new BizkaibusService();

// BBService.getFromTo('Basauri', 'Bilbao')
//     .then((lines) => BBService.getItinerario(lines[0], lines[0].routes[0]))
//     .then(paradas => console.log(paradas));

BBService.getParadasTown('Alonsotegi').then((response) => console.log(response));
