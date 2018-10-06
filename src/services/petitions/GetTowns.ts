import { Town } from '@data/models';
import { PetitionBase } from './_PetitionBase';
import { ROUTES } from '@data/routes';

type PetitionResponse = {
    CodigoGrupo: string
    CodigoElemento: string
    DescripcionElemento: string
    label: string
    CodigoProvincia?: string
    CodigoMunicipio?: string
};

export class GetTowns extends PetitionBase {

    public petition(): Promise<Town[]> {
        const data = {
            strIdioma: 'es',
        };

        return this.sendRequest(ROUTES.getTowns, data)
            .then(response => this.parseXml(response.string['_']))
            .then(response => this.processData(response.Consulta.Registro));
    }

    private processData(registros: any[]) {

        const towns = [];

        for (const list of registros) {

            for (const listPart of list['Registro']) {

                const registryTown: PetitionResponse = listPart['$'];

                const newTown: Town = {
                    name: registryTown.label.replace(/\((.*?)\)/, '').trim(),
                    province: (registryTown.CodigoProvincia) ? registryTown.CodigoProvincia : '48',
                    code: (registryTown.CodigoMunicipio)
                        ? registryTown.CodigoMunicipio : this.padZeroes(registryTown.CodigoElemento),
                    townType: parseInt(registryTown.CodigoGrupo, 10),
                };

                towns.push(newTown);
            }

        }

        return towns;
    }

}
