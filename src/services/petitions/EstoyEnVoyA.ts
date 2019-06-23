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
            .then(response => response.string)
            .then(response => this.processData(response.Consulta));
    }

    private processData(res: any) {
        if (!res) {
            return [];
        }

        const lines: Line[] = [];

        const builtRegistros: PetitionResponse[] = this.dataToArray(res.Registro);

        for (const registro of builtRegistros) {
            const line: Line = lines.find(linename => linename.code === registro.LN_CLINEA);

            const route: Route = {
                direction: registro.IR_SENTDO,
                zone: registro.CT_PARZON,
                type: registro.IR_TIPORU,
                number: registro.IR_NMRORU,
                incidents: {
                    es: registro.LN_INCCAS,
                    eu: registro.LN_INCEUS
                },
                name: registro.RL_DENOMI,
            };

            if (line) {
                line.routes.push(route);
            } else {
                const newLine: Line = {
                    code: registro.LN_CLINEA,
                    name: registro.LN_DENOMI,
                    routes: [route]
                };

                lines.push(newLine);
            }
        }

        return lines;
    }

}
