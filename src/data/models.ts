export enum TownType {
    Outside = 1,
    Hospital = 2,
    Other = 13,
    Common = 99
}

export type Town = {
    name: string,
    province: string,
    code: string,
    otherNames?: string[],
    townType: TownType
};

export type Route = {
    direction: 'I' | 'V' | string,
    zone: string,
    rate: string,
    type: string,
    number: string,
    incidents: { es: string, eu: string },
    name: string,
    order: string | number,
    montesHierro: string
};

export type Line = {
    code: string,
    name: string,
    routes: Route[]
};

export type RouteTime = {
    salida: string,
    notas: string[],
    horarios: string[]
};

export type Horario = {
    ida: RouteTime[],
    vuelta: RouteTime[]
};

export type VehiclePosition = {
    position: Position,
    line: string,
    subLine: string,
    vehicle: string,
    busServer: string
};

export type Street = {
    id: string,
    name: string
};

export type Parada = {
    id: string,
    code: string,
    town: Town,
    denomination: string,
    street?: Street
    zone?: number,
    position?: Position
};

export type PasoTime = {
    lineCode: string,
    route: string,
    times: Array<{
        destination: string,
        meters: number,
        minutes: number
    }>
};

export type Position = {
    lat: number,
    lon: number
};

export type Vehicle = {
    code: number,
    clase: string,
    tipo: number,
    plazas: {
        total: number,
        sentado: number,
        pie: number,
        reservadas: number
    },
    sueloBajo: boolean,
    rampa: boolean
};
