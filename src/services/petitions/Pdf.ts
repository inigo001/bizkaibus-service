import Axios, { AxiosResponse } from 'axios';

import { PetitionBase } from './_PetitionBase';
import { Line } from '@data/models';
import { ROUTES } from '@data/routes';

export class Pdf extends PetitionBase {

    public petition(line: string | Line, direction: 'I' | 'V' = 'I') {

        const lineString: string = `${this.formatLineString(line)}${direction.toLowerCase()}.pdf`;

        return Axios({
            method: 'get',
            url: ROUTES.pdf + lineString,
            timeout: this.timeout,
        }).then((response: AxiosResponse) => this.processData(response));
    }

    private processData(response: AxiosResponse) {
        if (response.status === 200 && response.headers['content-type'] === 'application/pdf') {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject('ERROR');
        }
    }

}
