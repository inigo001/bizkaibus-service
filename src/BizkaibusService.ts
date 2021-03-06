import { Towns } from './services/Towns';
import {
    Line,
    Town,
    Route,
    Parada,
    PasoTime,
    Horario,
    VehiclePosition,
    Vehicle
} from './data/models';

import {
    EstoyEnVoyA,
    GetHorario,
    GetVehiculos,
    Pdf,
    ItinerariosLinea,
    GetParadasTown,
    GetPasoParada,
    GetInfoLineas,
    GetLineas,
    GetBusInfo
} from './services/petitions/index';

import { PetitionBase } from './services/petitions/_PetitionBase';

type Services = {
    horario: GetHorario,
    estoyEnVoyA: EstoyEnVoyA,
    vehiculos: GetVehiculos,
    pdf: Pdf,
    itinerariosLinea: ItinerariosLinea,
    paradasTown: GetParadasTown,
    pasoParada: GetPasoParada,
    getInfoLineas: GetInfoLineas
    getLineas: GetLineas,
    getBusInfo: GetBusInfo
};

type Options = {
    timeout?: number
};

class BizkaibusService {

    private towns: Towns;
    private services: Services;

    /**
     * Creates an instance of BizkaibusService.
     * @param {Options} [options]
     * @memberof BizkaibusService
     */
    constructor(options?: Options) {
        this.towns = new Towns();

        this.services = {
            horario: new GetHorario(),
            estoyEnVoyA: new EstoyEnVoyA(),
            vehiculos: new GetVehiculos(),
            pdf: new Pdf(),
            paradasTown: new GetParadasTown(),
            pasoParada: new GetPasoParada(),
            itinerariosLinea: new ItinerariosLinea(this.towns),
            getInfoLineas: new GetInfoLineas(),
            getLineas: new GetLineas(),
            getBusInfo: new GetBusInfo(),
        };

        if (options) {
            this.changeTimeout(options.timeout);
        }
    }

    public async changeTimeout(timeout: number) {
        for (const key in this.services) {
            if (this.services[key]) {
                (this.services[key] as PetitionBase).updateTimeout(timeout);
            }
        }
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
            return this.services.estoyEnVoyA.petition(origin, destination);
        }
    }

    /**
     * @param {(string | Line)} line
     * @param {Date} [date]
     * @returns {Promise<Horario>}
     * @memberof BizkaibusService
     */
    public async getHorario(line: string | Line, date?: Date): Promise<Horario> {
        return this.services.horario.petition(line, date);
    }

    /**
     * @method getPdf
     * @param {(string | Line)} line
     * @param {('I' | 'V')} [direction]
     * @returns
     * @memberof BizkaibusService
     */
    public async getPdf(line: string | Line, direction?: 'I' | 'V') {
        return this.services.pdf.petition(line, direction);
    }

    /**
     * Obtiene un listado de paradas a partir de una línea y una ruta determinadas
     * @param {Line} linea
     * @param {Route} route
     * @returns {Promise<Parada[]>}
     * @memberof BizkaibusService
     */
    public async getItinerario(linea: Line, route: Route): Promise<Parada[]> {
        return this.services.itinerariosLinea.petition(linea, route);
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
            return this.services.paradasTown.petition(searchTown);
        }
    }

    /**
     * @param {Parada} parada
     * @returns {Promise<PasoTime[]>}
     * @memberof BizkaibusService
     */
    public async getPasoParada(parada: Parada): Promise<PasoTime[]> {
        return this.services.pasoParada.petition(parada);
    }

    /**
     * @param {string} line
     * @returns {Promise<Line>}
     * @memberof BizkaibusService
     */
    public async getLineInfo(line: string): Promise<Line> {
        return this.services.getInfoLineas.petition(line);
    }

    /**
     * @param {(string | Line)} line
     * @returns {Promise<VehiclePosition[]>}
     * @memberof BizkaibusService
     */
    public async getVehicles(line: string | Line): Promise<VehiclePosition[]> {
        return this.services.vehiculos.petition(line);
    }

    /**
     * @returns {Promise<Line[]>}
     * @memberof BizkaibusService
     */
    public async getLines(): Promise<Line[]> {
        return this.services.getLineas.petition();
    }

    /**
     * @param {VehiclePosition} vehiclePosition
     * @returns {Promise<Vehicle>}
     * @memberof BizkaibusService
     */
    public async getBusInfo(vehiclePosition: VehiclePosition): Promise<Vehicle> {
        return this.services.getBusInfo.petition(vehiclePosition);
    }

    /**
     * Devuelve el listado de pueblos guardado en el servicio
     * En caso de necesitar actualizarlos llamar al método updateTowns
     * @returns {Promise<Town[]>}
     * @memberof BizkaibusService
     */
    public async getTowns(): Promise<Town[]> {
        return this.towns.getTowns();
    }

    /**
     * @returns
     * @memberof BizkaibusService
     */
    public async updateTowns() {
        return this.towns.updateTowns();
    }

}

export = BizkaibusService;
