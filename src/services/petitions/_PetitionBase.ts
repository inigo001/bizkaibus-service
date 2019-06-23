import { parse, validate } from 'fast-xml-parser';

import Axios, { AxiosResponse } from 'axios';

import { Line } from '@data/models';
import { ERROR } from '@data/errors';

export abstract class PetitionBase {

    private USER_AGENT =
        'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)' +
        'AppleWebKit/602.1.50 (KHTML, like Gecko)' +
        'CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1';

    protected timeout: number = 20000;

    public updateTimeout(timeout: number): void {
        if (timeout) {
            this.timeout = timeout;
        }
    }

    protected sendRequest(route: string, data: object): Promise<any> {

        return this.internalPetition(route, data)
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    if (response.headers['content-type'] === 'text/xml; charset=utf-8') {
                        return this.processXml(this.cleanTextXML(response.data));
                    } else {
                        try {
                            return Promise.resolve(response.data);
                        } catch (error) {
                            return Promise.reject(ERROR[3]);
                        }
                    }
                } else {
                    return Promise.reject(`${ERROR[1]}`);
                }
            });
    }

    private internalPetition(route, data) {

        return Axios({
            method: 'get',
            url: route,
            params: data,
            timeout: this.timeout,
            headers: {
                'User-Agent': this.USER_AGENT
            }
        });

    }

    protected parseXml(xml: string): Promise<any> {

        return new Promise((resolve, reject) => {
            // Sin estas opciones, en caso de ser
            // un listado vacío daría error

            const IS_VALID = validate(xml);

            if (IS_VALID === true) {
                resolve(parse(xml, { ignoreAttributes: false, attributeNamePrefix: '', }));
            } else {
                reject(ERROR[2]);
            }
        });
    }

    protected padZeroes(changeNumber: string): string {
        const zeroString = '0000';
        const paddedNum = zeroString.substring(changeNumber.length, 3) + changeNumber;

        return paddedNum;
    }

    protected formatLineString(line: string | Line): string {

        let formattedLine: string = '';

        if (typeof line === 'string' && !line.startsWith('A')) {
            formattedLine = `A${line}`;
        } else if (typeof line === 'object') {
            formattedLine = line.code;
        } else {
            formattedLine = line;
        }

        return formattedLine;
    }

    protected utmToLatLong(xCoord: number, yCoord: number) {
        return this.utm2LL(xCoord, yCoord, 30);
    }

    // PRIVADAS

    private processXml(xml: string): Promise<any> {
        const data = (xml).replace(/([0-9]®)+/, '');

        return this.parseXml(data)
            .then(result => result)
            .catch(error => Promise.reject(error));
    }

    /**
     * @license Apache-2.0
     * {@link https://gist.github.com/attilaolah/6cf22de8949d45a6cc06286536050e42}
     * @private
     * @param {number} easting
     * @param {number} northing
     * @param {number} utmZone
     * @returns {number}
     * @memberof PetitionBase
     */
    private utm2LL(easting: number, northing: number, utmZone: number): number[] {
        const DatumEqRad: number[] = [
            6378137.0, 6378137.0, 6378137.0, 6378135.0, 6378160.0, 6378245.0, 6378206.4,
            6378388.0, 6378388.0, 6378249.1, 6378206.4, 6377563.4, 6377397.2, 6377276.3
        ];
        const DatumFlat: number[] = [
            298.2572236, 298.2572236, 298.2572215, 298.2597208, 298.2497323,
            298.2997381, 294.9786982, 296.9993621, 296.9993621, 293.4660167,
            294.9786982, 299.3247788, 299.1527052, 300.8021499
        ];

        // Constantes
        const Item = 0;
        const a = DatumEqRad[Item];
        const f = 1 / DatumFlat[Item];
        const drad = Math.PI / 180;
        const k0 = 0.9996;
        const b = a * (1 - f);
        const e = Math.sqrt(1 - (b / a) * (b / a));
        const esq = (1 - (b / a) * (b / a));
        const e0sq = e * e / (1 - e * e);

        // Calculos
        const zcm = 3 + 6 * (utmZone - 1) - 180;
        const e1 = (1 - Math.sqrt(1 - e * e)) / (1 + Math.sqrt(1 - e * e));
        const M0 = 0;
        const M = M0 + northing / k0;
        const mu = M / (a * (1 - esq * (1 / 4 + esq * (3 / 64 + 5 * esq / 256))));

        let phi1 =
            mu + e1 * (3 / 2 - 27 * e1 * e1 / 32) * Math.sin(2 * mu) +
            e1 * e1 * (21 / 16 - 55 * e1 * e1 / 32) * Math.sin(4 * mu);
        phi1 = phi1 + e1 * e1 * e1 * (Math.sin(6 * mu) * 151 / 96 + e1 * Math.sin(8 * mu) * 1097 / 512);

        const C1 = e0sq * Math.pow(Math.cos(phi1), 2);
        const T1 = Math.pow(Math.tan(phi1), 2);
        const N1 = a / Math.sqrt(1 - Math.pow(e * Math.sin(phi1), 2));
        const R1 = N1 * (1 - e * e) / (1 - Math.pow(e * Math.sin(phi1), 2));
        const D = (easting - 500000) / (N1 * k0);

        let phi = (D * D) * (1 / 2 - D * D * (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * e0sq) / 24);
        phi = phi + Math.pow(D, 6) * (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * e0sq - 3 * C1 * C1) / 720;
        phi = phi1 - (N1 * Math.tan(phi1) / R1) * phi;

        const lon =
            D * (1 + D * D * ((-1 - 2 * T1 - C1) / 6 + D * D *
                (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * e0sq + 24 * T1 * T1) / 120))
            / Math.cos(phi1);

        return [(phi / drad), (zcm + lon / drad)];
    }

    /**
     * {@link https://stackoverflow.com/questions/1248849/converting-sanitised-html-back-to-displayable-html}
     * @private
     * @param {string} text
     * @returns {string}
     * @memberof PetitionBase
     */
    private cleanTextXML(text: string): string {

        let ret = text.replace(/&gt;/g, '>');
        ret = ret.replace(/&lt;/g, '<');
        ret = ret.replace(/&quot;/g, '"');
        ret = ret.replace(/&apos;/g, "'");
        ret = ret.replace(/&amp;/g, '&');

        return ret;
    }

}
