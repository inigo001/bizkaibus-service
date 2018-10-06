import { PetitionBase } from './_PetitionBase';
import { ROUTES } from '@data/routes';
import { Line, RouteTime, Horario } from '@data/models';

type PetitionResponse = {
    HT_TEXTOI: string,
    HT_TEXTOV: string,
    HT_TEXTOIC: string,
    HT_TEXTOVC: string,
    HT_TEXTOIE: string,
    HT_TEXTOVE: string,
    HT_TEXTOII: string,
    HT_TEXTOVI: string,
    CB_CTEMP: string,
    CB_REFUE: string,
    CB_MODI: string,
    TE_TEXTO: string
};

export class GetHorario extends PetitionBase {

    public petition(line: string | Line, date?: Date) {

        let dateString = '';
        if (date) {
            dateString = Intl.DateTimeFormat('es').format(date);
        }

        const data = {
            sCLINEA: this.formatLineString(line),
            sFECHAHORARIO: dateString,
        };

        return this.sendRequest(ROUTES.getHorario, data)
            .then(response => this.parseXml(response.string['_']))
            .then(response => this.processData(response.Consulta.Registro));
    }

    private processData(registros: any) {

        let horario: Horario;

        for (const res of registros) {
            const response: PetitionResponse = res['$'];

            horario = {
                ida: this.formatTimetable(response.HT_TEXTOIC),
                vuelta: this.formatTimetable(response.HT_TEXTOVC)
            };
        }

        return horario;
    }

    private formatTimetable(idaText: string): RouteTime[] {

        const textArray: string[] = idaText.split('{vbNewLine}{vbNewLine}');

        const routeTypes: RouteTime[] = [];
        let routeType: RouteTime = {
            salida: '',
            notas: [],
            horarios: []
        };

        for (const text of textArray) {

            if (text.includes('SALIDAS DE')) {

                if (routeType.salida) {
                    routeTypes.push(routeType);

                    routeType = {
                        salida: '',
                        notas: [],
                        horarios: []
                    };
                }
                routeType.salida = text
                    .replace('SALIDAS DESDE', '')
                    .replace('SALIDAS DE', '')
                    .replace(':', '').trim();

            } else if (text.startsWith('NOTA') || text.startsWith('Nota')) {
                routeType.notas.push(text.replace('NOTA:', '').replace('nota:', '').trim());
            } else {
                routeType.horarios.push(text.replace(/{vbNewLine}/g, '. ').trim());
            }

        }

        if (routeType.salida) {
            routeTypes.push(routeType);
        }

        return routeTypes;
    }

}
