import { PetitionBase } from './_PetitionBase';
import { ROUTES } from '../../data/routes';
import { Line, VehiclePosition } from 'data/models';

type PetitionResponse = {
    vehiculo: string[],
    linea: string[],
    sublinea: string[],
    coche: string[],
    serv_bus: string[],
    conductor: string[],
    serv_cond: string[],
    estado: string[],
    estadoLocReal: string[],
    xcoord: string[],
    ycoord: string[]
};

export class GetVehiculos extends PetitionBase {

    public petition(line: string | Line, date?: Date) {

        const data = {
            strLinea: this.formatLineString(line),
        };

        return this.sendRequest(ROUTES.getVehiculos, data)
            .then(response => this.parseXml(response.string['_']))
            .then(response => this.processData(response));
    }

    private processData(response: any) {

        const vehiculos: PetitionResponse[] = response.Consulta.InfoVehiculo;

        const vehiclePositions: VehiclePosition[] = [];

        for (const vehiculo of vehiculos) {

            const vehiclePosition: VehiclePosition = {
                vehicle: vehiculo.vehiculo[0],
                xCoord: parseFloat(vehiculo.xcoord[0]),
                yCoord: parseFloat(vehiculo.ycoord[0]),
                line: vehiculo.linea[0],
                subLine: vehiculo.sublinea[0],
                busServer: vehiculo.serv_bus[0]
            };

            vehiclePositions.push(vehiclePosition);
        }

        return vehiclePositions;

    }

}
