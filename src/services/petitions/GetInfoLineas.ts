import { PetitionBase } from './_PetitionBase';
import { ROUTES } from '@data/routes';
import { Line, Route } from '@data/models';

type PetitionResponse = {
    LN_CLINEA: string,
    LN_DENOMI: string,
    IR_SENTDO: string,
    CT_PARZON: string,
    IR_TIPORU: string,
    IR_NMRORU: string,
    RL_CATEGO: string,
    LN_INCCAS: string,
    LN_INCEUS: string,
};

export class GetInfoLineas extends PetitionBase {

    public petition(lineName: string) {

        const lineString = this.formatLineString(lineName);

        const data = {
            strCODLINEA: lineString,
            strDESCLINEA: ''
        };

        return this.sendRequest(ROUTES.lineasWeb, data)
            .then(response => response.string)
            .then(response => this.processData(response.Consulta.Registro));
    }

    private processData(registros: PetitionResponse[]) {

        const lines: Line[] = [];

        for (const registro of registros) {

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
                name: registro.LN_DENOMI,
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

        return lines[0];
    }

}
