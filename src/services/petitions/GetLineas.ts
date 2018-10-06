import { PetitionBase } from './_PetitionBase';
import { ROUTES } from '@data/routes';
import { Line, Route } from '@data/models';

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
            .then(response => this.parseXml(response.string['_']))
            .then(response => this.processData(response.Consulta.Registro));
    }

    private processData(registros: any[]) {

        const lines: Line[] = [];

        for (const registro of registros) {
            const cleanRegistro: PetitionResponse = registro['$'];

            const line: Line = {
                code: cleanRegistro.IR_CLINEA,
                name: cleanRegistro.RL_DENOMI,
                routes: []
            };

            lines.push(line);
        }

        return lines;
    }

}
