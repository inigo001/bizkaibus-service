import * as request from 'request-promise-native';
import { Response } from 'request';
import { parseString } from 'xml2js';
import { Line } from '@data/models';
import { ERROR } from '@data/errors';

export abstract class PetitionBase {

    protected timeout: number = 20000;

    protected sendRequest(route: string, data: object) {

        return request.get({
            url: route,
            qs: data,
            resolveWithFullResponse: true,
            qsStringifyOptions: { encode: false },
            timeout: this.timeout,
        })
            .then((response: Response) => {
                if (response.statusCode === 200) {
                    if (response.headers['content-type'] === 'text/xml; charset=utf-8') {
                        return this.processXml(response.body);
                    } else {
                        try {
                            const jsonResponse = JSON.parse(response.body);
                            return Promise.resolve(jsonResponse);
                        } catch (error) {
                            return Promise.reject(ERROR[3]);
                        }
                    }
                } else {
                    return Promise.reject(`${ERROR[1]} - ${response.url}`);
                }
            });
    }

    protected parseXml(xml: string): Promise<any> {

        return new Promise((resolve, reject) => {
            parseString(xml, (error, result) => {
                if (error) {
                    reject(ERROR[2]);
                } else {
                    resolve(result);
                }
            });

        });
    }

    protected padZeroes(changeNumber) {
        const zeroString = '0000';
        const paddedNum = zeroString.substring(changeNumber.length, 3) + changeNumber;

        return paddedNum;
    }

    protected formatLineString(line: string | Line) {

        let formattedLine: string = '';

        if (typeof line === 'string' && !line.startsWith('A')) {
            formattedLine = `A${line}`;
        } else if (typeof line === 'object') {
            formattedLine = line.code;
        }

        return formattedLine;
    }

    private processXml(xml: string): Promise<any> {
        const data = (xml).replace(/([0-9]®)+/, '');

        return this.parseXml(data)
            .then(result => result)
            .catch(error => Promise.reject(error));
    }

}
