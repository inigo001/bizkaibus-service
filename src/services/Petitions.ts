import {
    EstoyEnVoyA,
    GetHorario,
    GetVehiculos,
    Pdf
} from './petitions/index';

export class Petitions {
    public getHorario: GetHorario;
    public estoyEnVoyA: EstoyEnVoyA;
    public getVehiculos: GetVehiculos;
    public pdf: Pdf;

    constructor() {
        this.getHorario = new GetHorario();
        this.estoyEnVoyA = new EstoyEnVoyA();
        this.getVehiculos = new GetVehiculos();
        this.pdf = new Pdf();
    }

}
