import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { traerPersonajes, traerGeneros } from '../../redux/actions/index.js'
import Cards from '../Cards/index.js'
import Pagination from '../Paginacion/index.js'
import NavBar from '../NavBar/index.js'
import { Grid } from '@mui/material'

const Inicio = () => {
    const dispatch = useDispatch()
    const personajes = useSelector(state => state.personajes)

    useEffect(() => {
        !personajes.results?.length && dispatch(traerPersonajes())
        dispatch(traerGeneros())
    }, [])
    return (
        <>
            <NavBar />
            <Grid container sx={{ marginTop: '80px' }}>
                <Grid item xs={12}>
                    <Cards />
                </Grid>
                <Grid item xs={12}>
                    <Pagination />
                </Grid>
            </Grid>
        </>
    )
}

export default Inicio;
