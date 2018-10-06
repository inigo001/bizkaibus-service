const baseRoute = 'http://apli.bizkaia.net/APPS/DANOK/TQWS/TQ.ASMX/';
const dataRoute = 'http://apli.bizkaia.net/APPS/DANOK/TQ/DATOS_PARADAS/';
const transportRoute = 'http://arcgis.bizkaia.net/arcgis/rest/services/TRANSPORTESURBANISMO/';

export const ROUTES = {
    getTowns: baseRoute + 'gfReturn_Consultar_FamiliasCentros',
    getLineas: baseRoute + 'gfReturn_Consultar_TBBB_Itinerario',

    estoyEnVoyA: baseRoute + 'gfConsulta_EstoyenVoya',
    getHorario: baseRoute + 'GetHorario',
    getVehiculos: baseRoute + 'GetVehiculos',
    lineasMunicipio: baseRoute + 'gfReturn_LineasMunicipio',
    lineasWeb: baseRoute + 'gfReturn_LineasLineaWEB',
    itinerariosLinea: baseRoute + 'gfReturn_Buscar_ItinerariosLinea',
    getPasoParada: baseRoute + 'GetPasoParada',
    getPasoParadaMobile: baseRoute + 'GetPasoParadaMobile',
    getBusInfo: baseRoute + 'gfReturn_InformacionBus',

    pdf: dataRoute + 'ITINERARIOS/',

    getParadasTown: transportRoute + 'TQ_Bizkaibus_Mobile/MapServer/0/query'
};
