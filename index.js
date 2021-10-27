const express = require('express')

const hostname = '127.0.0.1'

const port = 5000

const app = express()

const resource = 'estudiante'

const route = `/${resource}`

const estudiantes = [
    {
        nombre: "Jose",
        apellido: "Vazquez",
        dni: 90909090,
        edad: 30
    },
    {
        nombre: 'Natalia',
        apellido: 'Ovalle',
        dni: 30763672,
        edad: 37
    }
]
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post(route, (req, res) => {
    let estudiante = req.body
    const existe = estudiantes.find((est) => {
        return est.dni == estudiante.dni
    })
    if(!existe){ 
        estudiantes.push(estudiante)
        res.status(200)
        res.json(estudiante)
    } else {
        res.status(409)
        res.send()
        console.log(`Ya existe un estudiante con dni ${req.body.dni}`)
    }
    console.log(estudiantes)
})
app.get(route, (req, res) => {
    if(estudiantes.length > 0){
        res.json(estudiantes)
    } else {
        res.status(404)
        res.send()
        console.log('No se encontraron estudiantes.')
    }
})
app.get(`${route}/:dni`, (req, res) => {
    const existe = estudiantes.find(est => {
        return est.dni == req.params.dni
    })
    if(existe){
        res.json(existe)
    } else {
        res.status(409)
        res.send()
        console.log(`No se encontró ningún estudiante con dni ${req.params.dni}`)
    }
})
app.get(`${route}/edad/:rango`, (req, res) => {
    let min = parseInt(req.params.rango.split('-')[0])
    let max = parseInt(req.params.rango.split('-')[1])

    const respuesta = estudiantes.filter(est => {
        return est.edad >= min && est.edad <= max
    })
    if(respuesta.length > 0){
        res.json(respuesta)
    } else {
        res.status(409)
        res.send()
    }
})
app.delete(`${route}/:dni`, (req, res) => {
    const dni = req.params.dni
    const index = estudiantes.findIndex(est => {
        return est.dni == dni
    })
    if(index != undefined){
        estudiantes.splice(index, 1)
        res.json(estudiantes)
    } else {
        res.status(404)
        res.send()
        console.log(`No se encontro estudiante con dni ${req.params.dni}`)
    }
})
app.put(`${route}/:dni`, (req, res) => {
    const dni = req.params.dni
    const index = estudiantes.findIndex(est => {
        return est.dni == dni
    })
    if(index != undefined){
        estudiantes[index] = req.body
        res.json(req.body)
        console.log(req.body)
    } else {
        res.status(404)
        res.send()
        console.log(`No se encontro estudiante con dni ${req.params.dni}`)
    }
})
const server = app.listen(port)
server.on('listening', () => { 
    console.log(`Server corriendo en http://${hostname}:${port}${route}`
)})
server.on('error', error => {
    console.log(error.message)
})

