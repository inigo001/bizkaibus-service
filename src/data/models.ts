
export type Town = {
    name: string,
    province: string,
    code: string,
    otherNames?: string[],
    isHospital?: boolean
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
    xCoord: string,
    yCoord: string,
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
    xCoord?: number,
    yCoord?: number
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
