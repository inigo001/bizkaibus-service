import {
    EstoyEnVoyA,
    GetHorario,
    GetVehiculos,
    Pdf,
    ItinerariosLinea,
    GetParadasTown
} from './petitions/index';

export class Petitions {
    public getHorario: GetHorario;
    public estoyEnVoyA: EstoyEnVoyA;
    public getVehiculos: GetVehiculos;
    public pdf: Pdf;
    public itinerariosLinea: ItinerariosLinea;
    public getParadasTown: GetParadasTown;

    constructor(towns) {

        this.getHorario = new GetHorario();
        this.estoyEnVoyA = new EstoyEnVoyA();
        this.getVehiculos = new GetVehiculos();
        this.pdf = new Pdf();
        this.getParadasTown = new GetParadasTown();

        this.itinerariosLinea = new ItinerariosLinea(towns);
    }

}
