import { PetitionBase } from './_PetitionBase';
import { ROUTES } from '@data/routes';
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
        const whereQuery = `PROVINCIA=${town.province} AND MUNICIPIO=${town.code}`;

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
            outFields: 'PROVINCIA, MUNICIPIO, PARADA, PR_CODRED, DENOMINACION',
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
                position: { lat: feature.geometry.y, lon: feature.geometry.x }
            };

            paradas.push(parada);
        }

        return paradas;
    }

}
