import { PetitionBase } from './_PetitionBase';
import { Parada, PasoTime } from '@data/models';
import { ROUTES } from '@data/routes';

type PetitionResponse = {
    linea: string[],
    ruta: string[],
    e1: Array<{
        destino: string[],
        metros: string[],
        minutos: string[]
    }>,
    e2: Array<{
        destino: string[],
        metros: string[],
        minutos: string[]
    }>,
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

    private processData(response) {

        const pasosParada: PetitionResponse[] = response.GetPasoParadaResult.PasoParada;

        const pasosTime: PasoTime[] = [];

        for (const pasoParada of pasosParada) {

            const time1 = this.processTime(pasoParada.e1);
            const time2 = (pasoParada.e2.length > 0) ? this.processTime(pasoParada.e2) : undefined;

            const pasoTime: PasoTime = {
                lineCode: pasoParada.linea[0],
                route: pasoParada.ruta[0],
                times: [time1, time2]
            };

            pasosTime.push(pasoTime);
        }

        return pasosTime;

    }

    private processTime(pasoParadaE) {
        return {
            destination: pasoParadaE[0].destino[0],
            meters: parseInt(pasoParadaE[0].metros[0], 10),
            minutes: parseInt(pasoParadaE[0].minutos[0], 10)
        };
    }

}
