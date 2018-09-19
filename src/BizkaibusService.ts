import { Towns } from './services/Towns';
import { Line, Town, Route, Parada, PasoTime, Horario, VehiclePosition } from 'data/models';

import {
    EstoyEnVoyA,
    GetHorario,
    GetVehiculos,
    Pdf,
    ItinerariosLinea,
    GetParadasTown,
    GetPasoParada,
    GetInfoLineas
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
    public getInfoLineas: GetInfoLineas;

    /**
     * Crea una instancia de BizkaibusService
     * @constructor
     * @memberof BizkaibusService
     */
    constructor() {
        this.towns = new Towns();

        this.horario = new GetHorario();
        this.estoyEnVoyA = new EstoyEnVoyA();
        this.vehiculos = new GetVehiculos();
        this.pdf = new Pdf();
        this.paradasTown = new GetParadasTown();
        this.pasoParada = new GetPasoParada();
        this.itinerariosLinea = new ItinerariosLinea(this.towns);
        this.getInfoLineas = new GetInfoLineas();
    }

    /**
     * @returns
     * @memberof BizkaibusService
     */
    public async updateTowns() {
        return this.towns.updateTowns();
    }

    /**
     * @param {string} originTown
     * @param {string} destinationTown
     * @returns {Promise<Line[]>}
     * @memberof BizkaibusService
     */
    public async getFromTo(originTown: string, destinationTown: string): Promise<Line[]> {

        const origin: Town = this.towns.getTownByName(originTown);
        const destination: Town = this.towns.getTownByName(destinationTown);

        if (!origin && !destination) {
            return Promise.reject('NO_TOWN');
        } else {
            return this.estoyEnVoyA.petition(origin, destination);
        }
    }

    /**
     * @param {(string | Line)} line
     * @param {Date} [date]
     * @returns {Promise<Horario>}
     * @memberof BizkaibusService
     */
    public async getHorario(line: string | Line, date?: Date): Promise<Horario> {
        return this.horario.petition(line, date);
    }

    /**
     * @method getPdf
     * @param {(string | Line)} line
     * @param {('I' | 'V')} [direction]
     * @returns
     * @memberof BizkaibusService
     */
    public async getPdf(line: string | Line, direction?: 'I' | 'V') {
        return this.pdf.petition(line, direction);
    }

    /**
     * Obtiene un listado de paradas a partir de una línea y una ruta determinadas
     * @param {Line} linea
     * @param {Route} route
     * @returns {Promise<Parada[]>}
     * @memberof BizkaibusService
     */
    public async getItinerario(linea: Line, route: Route): Promise<Parada[]> {
        return this.itinerariosLinea.petition(linea, route);
    }

    /**
     * Obtiene un listado de paradas del pueblo seleccionado
     * @param {string} town
     * @returns {Promise<Parada[]>}
     * @memberof BizkaibusService
     */
    public async getParadasTown(town: string): Promise<Parada[]> {
        const searchTown: Town = this.towns.getTownByName(town);

        if (!searchTown) {
            return Promise.reject('NO_TOWN');
        } else {
            return this.paradasTown.petition(searchTown);
        }
    }

    /**
     * @param {Parada} parada
     * @returns {Promise<PasoTime[]>}
     * @memberof BizkaibusService
     */
    public async getPasoParada(parada: Parada): Promise<PasoTime[]> {
        return this.pasoParada.petition(parada);
    }

    /**
     * @param {string} line
     * @returns {Promise<Line>}
     * @memberof BizkaibusService
     */
    public async getLineInfo(line: string): Promise<Line> {
        return this.getInfoLineas.petition(line);
    }

    /**
     * @param {(string | Line)} line
     * @returns {Promise<VehiclePosition[]>}
     * @memberof BizkaibusService
     */
    public async getVehicles(line: string | Line): Promise<VehiclePosition[]> {
        return this.vehiculos.petition(line);
    }

}
