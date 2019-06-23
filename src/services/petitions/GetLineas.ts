import { PetitionBase } from './_PetitionBase';
import { ROUTES } from '@data/routes';
import { Line } from '@data/models';

type PetitionResponse = {
    IR_CLINEA: string,
    RL_DENOMI: string,
    LN_NIFDNI: string,
    EM_RZSOCR: string,
    LN_INCCAS: string,
    LN_INCEUS: string,
    VVMONTESHIERRO: string
};

export class GetLineas extends PetitionBase {

    public petition() {

        const data = {
            intTipoConsulta: 5,
            strCodigoLinea: '',
            strNumeroRuta: '',
            strSentido: ''
        };

        return this.sendRequest(ROUTES.getLineas, data)
            .then(response => response.string)
            .then(response => this.processData(response.Consulta.Registro));
    }

    private processData(registros: PetitionResponse[]) {

        const lines: Line[] = [];

        for (const registro of registros) {

            const line: Line = {
                code: registro.IR_CLINEA,
                name: registro.RL_DENOMI,
                routes: []
            };

            lines.push(line);
        }

        return lines;
    }

}
