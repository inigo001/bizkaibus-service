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
            .then(response => response.string)
            .then(response => this.processData(response.Consulta.Registro));
    }

    private processData(registro: PetitionResponse) {

        const vehicle: Vehicle = {
            code: parseInt(registro.FL_NUMSAE, 10),
            clase: registro.FL_CLASE,
            tipo: parseInt(registro.FL_TIPO, 10),
            plazas: {
                total: parseInt(registro.FL_NPLTOT, 10),
                sentado: parseInt(registro.FL_NPLSEN, 10),
                pie: parseInt(registro.FL_NPLPIE, 10),
                reservadas: parseInt(registro.FL_NPLASR.replace(/\D/g, ''), 10)
            },
            sueloBajo: (registro.FL_SUELO === 'SB'),
            rampa: (registro.FL_RAMPLA === 'RA')
        };

        return vehicle;
    }

}
