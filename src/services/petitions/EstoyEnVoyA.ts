import { PetitionBase } from './_PetitionBase';
import { ROUTES } from '@data/routes';
import { Line, Town, Route } from '@data/models';

type PetitionResponse = {
    LN_CLINEA: string,
    LN_DENOMI: string,
    IR_SENTDO: string,
    CT_PARZON: string,
    CT_CLTRFA: string,
    IR_TIPORU: string,
    IR_NMRORU: string,
    LN_INCCAS: string,
    LN_INCEUS: string,
    RL_DENOMI: string,
    ORDEN: string,
    VVMONTESHIERRO: string
};

export class EstoyEnVoyA extends PetitionBase {

    public petition(originTown: Town, destinationTown: Town) {
        const data = {
            intACTIVAS: '0',
            strCODCENTROORIGEN: '',
            strDESCCENTROORIGEN: '',
            strCODPROVINCIAORIGEN: originTown.province,
            strCODMUNICIPIOORIGEN: originTown.code,
            strDESCMUNICIPIOORIGEN: originTown.name.toUpperCase(),
            strCODCENTRODESTINO: '',
            strDESCCENTRODESTINO: '',
            strCODPROVINCIADESTINO: destinationTown.province,
            strCODMUNICIPIODESTINO: destinationTown.code,
            strDESCMUNICIPIODESTINO: destinationTown.name.toUpperCase(),
        };

        return this.sendRequest(ROUTES.estoyEnVoyA, data)
            .then(response => this.parseXml(response.string['_']))
            .then(response => this.processData(response.Consulta.Registro));
    }

    private processData(registros: any[]) {
        if (!registros) {
            return [];
        }

        const lines: Line[] = [];

        for (const registro of registros) {
            const cleanRegistro: PetitionResponse = registro['$'];
            const line: Line = lines.find(linename => linename.code === cleanRegistro.LN_CLINEA);

            const route: Route = {
                direction: cleanRegistro.IR_SENTDO,
                zone: cleanRegistro.CT_PARZON,
                rate: cleanRegistro.CT_CLTRFA,
                type: cleanRegistro.IR_TIPORU,
                number: cleanRegistro.IR_NMRORU,
                incidents: {
                    es: cleanRegistro.LN_INCCAS,
                    eu: cleanRegistro.LN_INCEUS
                },
                name: cleanRegistro.RL_DENOMI,
                order: cleanRegistro.ORDEN,
                montesHierro: cleanRegistro.VVMONTESHIERRO,
            };

            if (line) {
                line.routes.push(route);
            } else {
                const newLine: Line = {
                    code: cleanRegistro.LN_CLINEA,
                    name: cleanRegistro.LN_DENOMI,
                    routes: [route]
                };

                lines.push(newLine);
            }
        }

        return lines;
    }

}
