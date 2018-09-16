import { PetitionBase } from './_PetitionBase';
import { ROUTES } from '../../data/routes';
import { Parada, Town } from 'data/models';

type PetitionResponse = {
    displayFieldName: string,
    fieldAliases: {
        PROVINCIA: string,
        MUNICIPIO: string,
        PARADA: string,
        PR_CODRED: string,
        DENOMINACION: string
    },
    geometryType: string,
    spatialReference: {
        wkid: number
    },
    fields: Array<{
        name: string,
        type: string,
        alias: string,
        length: number
    }>,
    features: Array<{
        attributes: {
            PROVINCIA: string,
            MUNICIPIO: string,
            PARADA: string,
            PR_CODRED: string,
            DENOMINACION: string
        },
        geometry: {
            x: number,
            y: number
        },
    }>
};

export class GetParadasTown extends PetitionBase {

    public petition(town: Town) {
        const whereQuery = `PROVINCIA+%3D${town.province}+%20AND+%20MUNICIPIO+%3D${town.code}`;

        const data = {
            text: '',
            geometry: '',
            geometryType: 'esriGeometryEnvelope',
            inSR: '',
            spatialRel: 'esriSpatialRelIntersects',
            relationParam: '',
            objectIds: '',
            where: whereQuery,
            time: '',
            returnCountOnly: false,
            returnIdsOnly: false,
            returnGeometry: true,
            maxAllowableOffset: '',
            outSR: '4326',
            outFields: 'PROVINCIA%2C++MUNICIPIO%2C+PARADA%2C++PR_CODRED%2C++DENOMINACION',
            f: 'pjson'
        };

        return this.sendRequest(ROUTES.getParadasTown, data)
            .then(response => this.processData(response, town));
    }

    private processData(response: any, town: Town) {
        const data: PetitionResponse = response;

        const paradas: Parada[] = [];

        for (const feature of data.features) {

            const parada: Parada = {
                id: feature.attributes.PARADA,
                code: feature.attributes.PR_CODRED,
                town,
                denomination: feature.attributes.DENOMINACION,
                xCoord: feature.geometry.x,
                yCoord: feature.geometry.y,
            };

            paradas.push(parada);
        }

        return paradas;
    }

}
