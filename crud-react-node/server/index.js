const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
// const mysql = require('mysql2/promise');

// Instancia de express 
const app = express();

// Body Parser 
app.use(bodyParser.json());

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'comunicados'
});

// Inserta el comunicado 
app.post('/crear', (req, res) => {
    const { titulo, descripcion, puesto, marca, ciudad } = req.body;
    // console.log(titulo, descripcion, puesto, marca, ciudad);
    db.query("INSERT INTO comunicados_tabla(titulo, descripcion, puesto, marca, ciudad) VALUES (?,?,?,?,?)", [titulo, descripcion, puesto, marca, ciudad],
    (err, result) => {
        if(err){
            console.log(err)
        } else {
            res.send('Comunicado insertado con éxito')
        }
    }
    )
})

// Obtiene todos las ciudades 
// app.get('/ciudades', (req, res) => {
//     db.query("SELECT DISTINCT division, region, ciudad FROM atc_sucursal ORDER BY ciudad",
//     (err, result) => {
//         if(err){
//             console.log(err)
//         } else {
//             res.send(result)
//         }
//     }
//     )
// })

app.get('/comunicados', (req, res) => {
    db.query('SELECT * FROM comunicados_tabla',
    (err, result) => {
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    }
    )
})

app.get('/puestos', (req, res) => {
    db.query('SELECT DISTINCT puesto FROM atc_staff WHERE puesto NOT IN ("Administrativo", "Ejecutivo BO Tiendas") ORDER BY puesto',
    (err, result) => {
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    }
    )
})

app.get('/marcas', (req, res) => {
    db.query('SELECT DISTINCT marca FROM atc_sucursal ORDER BY marca',
    (err, result) => {
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    }
    )
})

app.get('/ciudades', (req, res) => {
    const marca = req.query.marca;
    // Si la marca es 'nacional', obtenemos todas las ciudades sin filtrar
    if (marca === 'nacional') {
      db.query("SELECT DISTINCT division, region, ciudad FROM atc_sucursal ORDER BY division", (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error al obtener datos de ciudades' });
        } else {
          res.json(result);
        }
      });
    } else {
      // Si se proporciona una marca específica, filtramos por esa marca
      db.query("SELECT DISTINCT division, region, ciudad FROM atc_sucursal WHERE marca = ? ORDER BY division", [marca], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error al obtener datos de ciudades para la marca especificada' });
        } else {
          res.json(result);
        }
      });
    }
  });
  


app.listen(4000, () => {
    console.log('Servidor corriendo en el puerto 4000')
})