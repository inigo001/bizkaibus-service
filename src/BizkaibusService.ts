import { Towns } from './services/Towns';
import { Line, Town, Route, Parada, PasoTime, Horario } from 'data/models';

import {
    EstoyEnVoyA,
    GetHorario,
    GetVehiculos,
    Pdf,
    ItinerariosLinea,
    GetParadasTown,
    GetPasoParada
} from './services/petitions/index';

export default class BizkaibusService {

    private towns: Towns;

    public horario: GetHorario;
    public estoyEnVoyA: EstoyEnVoyA;
    public vehiculos: GetVehiculos;
    public pdf: Pdf;
    public itinerariosLinea: ItinerariosLinea;
    public paradasTown: GetParadasTown;
    public pasoParada: GetPasoParada;

    constructor() {
        this.towns = new Towns();

        this.horario = new GetHorario();
        this.estoyEnVoyA = new EstoyEnVoyA();
        this.vehiculos = new GetVehiculos();
        this.pdf = new Pdf();
        this.paradasTown = new GetParadasTown();
        this.pasoParada = new GetPasoParada();
        this.itinerariosLinea = new ItinerariosLinea(this.towns);
    }

    public async updateTowns() {
        return this.towns.updateTowns();
    }

    public async getFromTo(originTown: string, destinationTown: string): Promise<Line[]> {

        const origin: Town = this.towns.getTownByName(originTown);
        const destination: Town = this.towns.getTownByName(destinationTown);

        if (!origin && !destination) {
            return Promise.reject('NO_TOWN');
        } else {
            return this.estoyEnVoyA.petition(origin, destination);
        }
    }

    public async getHorario(line: string | Line, date?: Date): Promise<Horario> {
        return this.horario.petition(line, date);
    }

    public async getPdf(line: string | Line, direction?: 'I' | 'V') {
        return this.pdf.petition(line, direction);
    }

    public async getItinerario(linea: Line, route: Route): Promise<Parada[]> {
        return this.itinerariosLinea.petition(linea, route);
    }

    public async getParadasTown(town: string): Promise<Parada[]> {
        const searchTown: Town = this.towns.getTownByName(town);

        if (!searchTown) {
            return Promise.reject('NO_TOWN');
        } else {
            return this.paradasTown.petition(searchTown);
        }
    }

    public async getPasoParada(parada: Parada): Promise<PasoTime[]> {
        return this.pasoParada.petition(parada);
    }

}
