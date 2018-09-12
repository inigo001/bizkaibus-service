import { Petitions } from './services/Petitions';
import { Towns } from './services/Towns';
import { Line, Town, Route } from 'data/models';

export class BizkaibusService {

    private petitions: Petitions;
    private towns: Towns;

    constructor() {
        this.towns = new Towns();
        this.petitions = new Petitions(this.towns);
    }

    public async updateTowns() {
        return this.towns.updateTowns();
    }

    public getFromTo(originTown: string, destinationTown: string): Promise<Line[]> {

        const origin: Town = this.towns.getTownByName(originTown);
        const destination: Town = this.towns.getTownByName(destinationTown);

        if (!origin && !destination) {
            return Promise.reject('NO_TOWN');
        } else {
            return this.petitions.estoyEnVoyA.petition(origin, destination);
        }
    }

    public getHorario(line: string | Line, date?: Date) {
        return this.petitions.getHorario.petition(line, date);
    }

    public getPdf(line: string | Line, direction?: 'I' | 'V') {
        return this.petitions.pdf.petition(line, direction);
    }

    public getItinerario(linea: Line, route: Route) {
        return this.petitions.itinerariosLinea.petition(linea, route);
    }

    public getParadasTown(town: string) {
        const searchTown: Town = this.towns.getTownByName(town);

        if (!searchTown) {
            return Promise.reject('NO_TOWN');
        } else {
            return this.petitions.getParadasTown.petition(searchTown);
        }
    }

}
