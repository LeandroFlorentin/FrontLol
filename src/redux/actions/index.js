import axios from 'axios'
export const PERSONAJES = 'PERSONAJES';
export const PERSONAJE = 'PERSONAJE';
export const CLEAR = 'CLEAR';
export const GENEROS = 'GENEROS';
export const SEARCH = 'SEARCH';
export const FILTROS = 'FILTROS';
export const PAGINA = 'PAGINA'
export const FAVORITOS = 'FAVORITOS'
export const MODO = 'MODO'

export const traerPersonajes = (pag, search, Tank, Mage, Assassin, Fighter, Marksman, Support) => async (dispatch) => {
    await dispatch({ type: PAGINA, payload: pag })
    const objPJ = await axios.get(`https://db-lol.onrender.com/peleadores?pag=${pag || "undefined"}&search=${search || "undefined"}&Tank=${Tank || "undefined"}&Mage=${Mage || "undefined"}&Assassin=${Assassin || "undefined"}&Fighter=${Fighter || "undefined"}&Marksman=${Marksman || "undefined"}&Support=${Support || "undefined"}`);
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
    const generos = await axios.get('https://db-lol.onrender.com/generos')
    const arrayNuevo = generos.data.map(ele => ele.genero)
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