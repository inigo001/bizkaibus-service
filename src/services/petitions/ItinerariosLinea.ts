import { PetitionBase } from './_PetitionBase';
import { ROUTES } from '@data/routes';
import { Line, Route, Parada, Town, Street } from '@data/models';
import { Towns } from '@services/Towns';

type PetitionResponse = {
    IR_PROVIN: string,
    IR_MUNICI: string,
    DescripcionMunicipio: string,
    IR_PARADA: string,
    PR_DENOMI: string,
    PR_CCALLE: string,
    PR_PORTAL: string,
    MZ_CGZONA: string,
    PR_CODRED: string,
    PR_TIMARQ: string,
    PR_ACVADO: string,
    PR_ACFBOR: string,
    PR_ACFACE: string,
    PR_ACBALT: string,
    PR_ACTREL: string,
    PR_ACBRAI: string,
    PR_ACASIE: string,
    PR_ACAALT: string,
    PR_ACREPO: string,
    PR_ACAISQ: string,
    PR_ACLATE: string,
    PR_ACFRON: string,
    PR_ACESPA: string,
    PR_ACTRANS: string,
    PR_ACBAND: string,
    PR_ACSONO: string,
    VP_CODRED: string,
    HttpImagenAccesibilidad: string,
    TipoVia: string,
    DescripcionCalle: string
};

export class ItinerariosLinea extends PetitionBase {

    private towns: Towns;

    constructor(towns) {
        super();
        this.towns = towns;
    }

    public petition(line: string | Line, route: string | Route, direction: 'V' | 'I' = 'I') {

        const data = {
            strCODLINEA: this.formatLineString(line),
            strNUMRUTA: (typeof route === 'string') ? route : route.number,
            strSENTIDO: (typeof route === 'string') ? direction : route.direction,
        };

        return this.sendRequest(ROUTES.itinerariosLinea, data)
            .then(response => this.parseXml(response.string['_']))
            .then(response => this.processData(response));
    }

    private processData(response: any): Parada[] {
        const stops = response.Consulta.Registro;
        const paradas: Parada[] = [];

        for (const stop of stops) {

            const baseStop: PetitionResponse = stop['$'];

            const stopTown: Town = this.towns.getTownByProvinceAndCode(baseStop.IR_PROVIN, baseStop.IR_MUNICI);
            const stopStreet: Street = {
                id: baseStop.PR_CCALLE,
                name: baseStop.DescripcionCalle
            };

            const parada: Parada = {
                id: baseStop.IR_PARADA,
                code: baseStop.PR_CODRED,
                town: stopTown,
                street: stopStreet,
                denomination: baseStop.PR_DENOMI,
                zone: parseInt(baseStop.MZ_CGZONA, 10)
            };

            paradas.push(parada);
        }

        return paradas;
    }

}
