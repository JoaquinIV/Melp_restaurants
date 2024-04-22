const sequelize = require('../connections/db.js')
const Restaurante = require('../models/restaurante.model.js');
const fs = require('node:fs/promises');
const path = require('node:path');
const csv_parse = require('csv-parse/sync');
const { v4: uuidv4 } = require('uuid');

const cargaMasivaRestaurantes = async function() {

    const filasEliminadas = await Restaurante.destroy({
        where: {},
        truncate: true
      });

    if(filasEliminadas > 0) {
        console.log(`Se han eliminado ${filasEliminadas} registros.`);
    }

    const path_restaurantes = path.join("src", "seed", "restaurantes.csv");
    const content = await fs.readFile(path_restaurantes, { encoding: "utf8" });
    const rows = csv_parse.parse(content);

    //Eliminamos las cabeceras
    rows.shift();

    //Esperamos a que se carguen todos los valores
    await Promise.all( rows.map(row => Restaurante.build({
        id : row[0],
        rating : parseInt(row[1]),
        name : row[2],
        site : row[3],
        email : row[4],
        phone : row[5],
        street : row[6],
        city : row[7],
        state : row[8],
        lat : parseFloat(row[9]),
        lng : parseFloat(row[10]),
    }).save()));

    //Se devuelvel los records del csv
    return true;
}

const crearRestaurante = async function(body) {
    
    const newRestaurante = Restaurante.build({
        ...body,
        id: uuidv4()
    });

    await newRestaurante.save();

    return newRestaurante.toJSON();
}

const actualizarRestaurante = async function(id, body) {
    
    let restaurante = await Restaurante.findByPk(id);

    restaurante.set({
        ...restaurante,
        ...body,
        id: restaurante.id
    });

    await restaurante.save();

    return restaurante.toJSON();
}

const buscarUnRestaurante = async function(id) {
    
    const restaurante = await Restaurante.findByPk(id);
    
    return restaurante == null ? null : restaurante.toJSON();

}

const obtenerTodosRestaurante = async function() {
    
    let restaurantes = await Restaurante.findAll();

    restaurantes = restaurantes.map( restaurante => restaurante.toJSON() );
    
    return restaurantes;

}

const eliminarRestaurante = async function(id) {
    
    const restaurante = await Restaurante.findByPk(id);

    await restaurante.destroy();

}

const obtenerEstadisticas = async function(lat, lng, radius) {
    const result = await sequelize.query(
        `SELECT
            COUNT(*) AS "count",
            AVG(r.rating) AS "avg",
            STDDEV_POP(r.rating) AS "std"
        FROM
            restaurants r
        WHERE
            ST_DWithin(
                ST_MakePoint(r.lng, r.lat)::geography,
                ST_MakePoint(${lng}, ${lat})::geography,
                ${radius}
            );`,
        { type: sequelize.QueryTypes.SELECT }
    );

    return {
        count: result[0].count != null ? parseInt(result[0].count) : 0,
        avg: result[0].avg != null ? parseFloat(result[0].avg) : 0,
        std: result[0].std != null ? parseFloat(result[0].std) : 0,
    };
}

module.exports  = {
    cargaMasivaRestaurantes,
    crearRestaurante,
    buscarUnRestaurante,
    obtenerTodosRestaurante,
    actualizarRestaurante,
    eliminarRestaurante,
    obtenerEstadisticas
}