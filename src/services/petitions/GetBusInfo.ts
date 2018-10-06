import { PetitionBase } from './_PetitionBase';
import { ROUTES } from '@data/routes';
import { VehiclePosition, Vehicle } from '@data/models';

type PetitionResponse = {
    FL_NUMSAE: string,
    FL_MATRIC: string,
    FL_CLASE: string,
    LN_CLINEA: string,
    LN_DENOMI: string,
    FL_TIPO: string,
    FL_FEALBB: string,
    FL_NPLTOT: string,
    FL_NPLSEN: string,
    FL_NPLPIE: string,
    FL_SUELO: string,
    FL_RAMPLA: string,
    FL_NPLASR: string,
};

export class GetBusInfo extends PetitionBase {

    public petition(vehicleInfo: VehiclePosition | { line: string, vehicle: string }) {

        const data = {
            intTipoConsulta: '1',
            strCodigoLinea: vehicleInfo.line,
            strCodigoVehiculo: vehicleInfo.vehicle
        };

        return this.sendRequest(ROUTES.getBusInfo, data)
            .then(response => this.parseXml(response.string['_']))
            .then(response => this.processData(response.Consulta.Registro));
    }

    private processData(registros: any[]) {

        const data: PetitionResponse = registros[0]['$'];

        const vehicle: Vehicle = {
            code: parseInt(data.FL_NUMSAE, 10),
            clase: data.FL_CLASE,
            tipo: parseInt(data.FL_TIPO, 10),
            plazas: {
                total: parseInt(data.FL_NPLTOT, 10),
                sentado: parseInt(data.FL_NPLSEN, 10),
                pie: parseInt(data.FL_NPLPIE, 10),
                reservadas: parseInt(data.FL_NPLASR.replace(/\D/g, ''), 10)
            },
            sueloBajo: (data.FL_SUELO === 'SB'),
            rampa: (data.FL_RAMPLA === 'RA')
        };

        return vehicle;
    }

}
