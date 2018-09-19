import { GetTowns } from './petitions/index';
import { Town } from '@data/models';
import { TOWNS } from '@data/towns';

export class Towns {

    private getTownsMethod: GetTowns;
    private townsList: Town[] = [];

    constructor() {
        this.townsList = TOWNS;
        this.getTownsMethod = new GetTowns();
    }

    public getTowns(): Town[] {
        return this.townsList;
    }

    public async updateTowns(): Promise<Town[]> {
        return this.getTownsMethod.petition()
            .then(towns => this.townsList = towns);
    }

    public getTownByName(name: string): Town {

        return this.townsList.find(town => {

            if (town.name.toLowerCase().includes(name.toLowerCase())) {
                return true;
            }

            if (town.otherNames) {
                for (const otherName of town.otherNames) {
                    if (otherName.includes(name)) {
                        return true;
                    }
                }
            }

            return false;
        });
    }

    public getTownByProvinceAndCode(province: string, code: string) {

        return this.townsList.find(town =>
            (town.province === province) && (town.code === code) && (!town.isHospital)
        );

    }

}
