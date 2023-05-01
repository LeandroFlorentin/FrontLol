import axios from 'axios'
export const PERSONAJES = 'PERSONAJES';
export const PERSONAJE = 'PERSONAJE';
export const CLEAR = 'CLEAR';
export const GENEROS = 'GENEROS';
export const SEARCH = 'SEARCH';
export const FILTROS = 'FILTROS';
export const PAGINA = 'PAGINA';
export const FAVORITOS = 'FAVORITOS';
export const MODO = 'MODO';
export const LOAD = 'LOAD';

export const traerPersonajes = (pag = 1, search, Tank, Mage, Assassin, Fighter, Marksman, Support) => async (dispatch) => {
    dispatch(setLoading(true))
    await dispatch({ type: PAGINA, payload: pag })
    const objPJ = await axios.get(`http://ec2-18-228-232-214.sa-east-1.compute.amazonaws.com:3000?pag=${pag || "undefined"}&search=${search || "undefined"}&Tank=${Tank || "undefined"}&Mage=${Mage || "undefined"}&Assassin=${Assassin || "undefined"}&Fighter=${Fighter || "undefined"}&Marksman=${Marksman || "undefined"}&Support=${Support || "undefined"}`, { headers: { "Accept-Encoding": "gzip,deflate,compress" }, })
    dispatch(setLoading(false))
    console.log(objPJ)
    return dispatch({ type: PERSONAJES, payload: objPJ.data })
}

export const traerPersonaje = (id) => async dispatch => {
    const personaje = await axios.get(`https://ddragon.leagueoflegends.com/cdn/12.23.1/data/es_MX/champion/${id}.json`)
    return dispatch({ type: PERSONAJE, payload: personaje.data.data[id] })
}

export const clearPersonaje = () => dispatch => {
    return dispatch({ type: CLEAR, payload: {} })
}

export const traerGeneros = () => async dispatch => {
    const generos = await axios.get('http://ec2-18-228-232-214.sa-east-1.compute.amazonaws.com:3000/generos', { headers: { "Accept-Encoding": "gzip,deflate,compress" }, })
    const arrayNuevo = generos.data.map(ele => ele.genero)
    console.log(arrayNuevo)
    return dispatch({ type: 'GENEROS', payload: arrayNuevo })
}

export const buscador = (text, Fighter, Tank, Mage, Assassin, Marksman, Support) => async dispatch => {
    await dispatch({ type: SEARCH, payload: text })
    await dispatch(traerPersonajes(1, text, Fighter, Tank, Mage, Assassin, Marksman, Support))
}

export const filtrar = (filtro, tipo) => dispatch => {
    dispatch({ type: FILTROS, payload: { filtro, tipo } })
}

export const meterFavoritos = (arr) => dispatch => {
    if (arr === null) arr = []
    return dispatch({ type: FAVORITOS, payload: arr })
}

export const cambiarModo = (modo) => dispatch => {
    return dispatch({ type: MODO, payload: modo })
}

export const setLoading = (param) => dispatch => {
    return dispatch({ type: LOAD, payload: param })
}