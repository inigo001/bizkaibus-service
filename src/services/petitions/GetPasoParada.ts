import { PetitionBase } from './_PetitionBase';
import { Parada, PasoTime } from '@data/models';
import { ROUTES } from '@data/routes';

type PetitionResponse = {
    linea: string,
    ruta: string,
    e1: {
        destino: string,
        metros: number,
        minutos: number
    },
    e2: {
        destino: string,
        metros: number,
        minutos: number
    },
};

export class GetPasoParada extends PetitionBase {

    public petition(parada: Parada) {

        const paradaString = `${parada.town.province}${parada.town.code}${parada.id}`;

        const data = {
            strLinea: '*',
            strParada: paradaString
        };

        return this.sendRequest(ROUTES.getPasoParada, data)
            .then(response => response.string)
            .then(response => this.processData(response));

    }

    private processData(response: { GetPasoParadaResult: any }): PasoTime[] {

        const pasosParada: PetitionResponse[] = this.dataToArray(response.GetPasoParadaResult.PasoParada);

        const pasosTime: PasoTime[] = [];

        for (const pasoParada of pasosParada) {

            const times = [this.processTime(pasoParada.e1), this.processTime(pasoParada.e2)].filter(e => e);

            if (times.length > 0) {
                const pasoTime: PasoTime = {
                    lineCode: pasoParada.linea,
                    route: pasoParada.ruta,
                    times
                };

                pasosTime.push(pasoTime);
            }
        }

        return pasosTime;

    }

    private processTime(pasoParadaE: { destino: any; metros: any; minutos: any; }) {

        let timeInfo: { destination: any; meters: any; minutes: any; };

        if (pasoParadaE.destino !== '') {
            timeInfo = {
                destination: pasoParadaE.destino,
                meters: pasoParadaE.metros,
                minutes: pasoParadaE.minutos
            };
        }

        return timeInfo;
    }

}
