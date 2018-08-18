const baseRoute = 'http://apli.bizkaia.net/APPS/DANOK/TQWS/TQ.ASMX/';
const dataRoute = 'http://apli.bizkaia.net/APPS/DANOK/TQ/DATOS_PARADAS/';

export const ROUTES = {
    getTowns: baseRoute + 'gfReturn_Consultar_FamiliasCentros',

    estoyEnVoyA: baseRoute + 'gfConsulta_EstoyenVoya',
    getHorario: baseRoute + 'GetHorario',
    getVehiculos: baseRoute + 'GetVehiculos',
    lineasMunicipio: baseRoute + 'gfReturn_LineasMunicipio',

    pdf: dataRoute + 'ITINERARIOS/'
};
