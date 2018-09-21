import * as request from 'request-promise-native';
import { Response } from 'request';

import { PetitionBase } from './_PetitionBase';
import { Line } from '@data/models';
import { ROUTES } from '@data/routes';

export class Pdf extends PetitionBase {

    public petition(line: string | Line, direction: 'I' | 'V' = 'I') {

        const lineString: string = `${this.formatLineString(line)}${direction.toLowerCase()}.pdf`;

        return request.get({
            url: ROUTES.pdf + lineString,
            resolveWithFullResponse: true,
            timeout: this.TIMEOUT,
        }).then((response: Response) => this.processData(response));
    }

    private processData(response: Response) {
        if (response.statusCode === 200 && response.headers['content-type'] === 'application/pdf') {
            return Promise.resolve(response.body);
        } else {
            return Promise.reject('ERROR');
        }
    }

}
