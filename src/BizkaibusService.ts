import { Petitions } from './services/Petitions';
import { Towns } from './services/Towns';
import { Line } from 'data/models';

export class BizkaibusService {

    private petitions: Petitions;
    private towns: Towns;

    constructor() {
        this.petitions = new Petitions();
        this.towns = new Towns();
    }

    public getTowns() {
        return this.towns.getTowns();
    }

    public async updateTowns() {
        return this.towns.updateTowns();
    }

    public getHorario(line: string | Line, date?: Date) {
        return this.petitions.getHorario.petition(line, date);
    }

    public getPdf(line: string | Line, direction?: 'I' | 'V') {
        return this.petitions.pdf.petition(line, direction);
    }

}
