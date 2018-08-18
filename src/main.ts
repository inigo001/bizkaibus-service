import {
    BizkaibusService
} from './BizkaibusService';

export { BizkaibusService } from './BizkaibusService';

import * as util from 'util';

const desde: string = process.argv[2];
const hasta: string = process.argv[3];

const BBService = new BizkaibusService();

// BBService.getHorario('3631')
//     .then(res => console.log(res));

// BBService.getPdf('3631')
//     .then((res) => console.log(res));
// BBService.getTowns()
    // .then(res => BBService.getVehiculos('A3911'))
    // .then(res => console.log(res))
    // .catch(error => console.log(error));
// .then(res => getTownsSuccess(res))
// .then(() => BBService.getEstoyEnVoyA(Towns.getTownByName(desde), Towns.getTownByName(hasta)))
// .then(response => BBService.getHorario(response[0], new Date()))
// .then(response => console.log(response.ida, response.vuelta));
