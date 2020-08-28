const express = require('express')
const router = express.Router()
const pool = require('../database')

//-------------ROUTES-------------------
router.get('/', function (req, res, next) {
    res.json({
        message: 'Hola'
    })
});



//----------------API---------------------------

router.get('/api/getUsers', async (req, res, next) => {
    let all = await pool.query('Select * from usuarios')
    res.json(all.rows)
})

router.get('/api/obtenerPuestos', async (req, res, next) => {
    let all = await pool.query(`select pu.id as idPuesto, pu.nombre, pu.idSector as idSector, pe.nombre || ' ' || pe.apaterno  || ' ' || pe.amaterno as "dueno",'true' as estado
                                from puesto pu inner join contrato co
                                    on(pu.id = co.id_puesto )
                                    join persona pe
                                    on(co.id_persona= pe.id)
                                    where pe.dueno='V'`)
    res.json(all.rows)
})
router.get('/api/obtenerSectores', async (req, res, next) => {
    let all = await pool.query(`select * from sector`)
    res.json(all.rows)
})
router.get('/api/obtenerPuesto/:id', async (req, res, next) => {
    let all = await pool.query(`select * from puesto where id=${req.params.id}`)
    res.json(all.rows)
})

router.get('/api/obtenerPersonas/:puesto', async (req, res, next) => {
    let all = await pool.query(`select pe.id,pe.nombre || ' ' || pe.apaterno || ' ' || pe.amaterno as nombre, pe.telefono, pe.dueno, pe.encargado
                                from persona pe inner join contrato c
                                on(pe.id = c.id_persona)
                                join puesto pu
                                on(c.id_puesto = pu.id)
                                where pu.id = ${req.params.puesto}`)
    res.json(all.rows)
})

router.get('/api/obtenerVendedor/:puesto', async (req, res, next) => {
    let all = await pool.query(`select pe.id, pe.nombre || ' ' || pe.apaterno || ' ' || pe.amaterno as nombre, pe.telefono, 'Vendedor' as cargo
                                from persona pe inner join contrato c
                                on(pe.id = c.id_persona)
                                join puesto pu
                                on(c.id_puesto = pu.id)
                                join vendedor v
                                on (v.id_persona = pe.id)
                                where pu.id = ${req.params.puesto}`)
    res.json(all.rows)
})


module.exports = router