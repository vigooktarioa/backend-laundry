const { request, response } = require('express')
const express = require('express') // buat library express

const app = express() 

// Accept request body tipe json
app.use(express.json())


const models = require("../models/index")
const member = models.member
const {auth} = require("./login")

// Middleware Auth
// app.use(auth)

// get all member
app.get('/', async (request, response) => {
    let dataMember = await member.findAll()

    return response.json(dataMember)
})

app.get("/:id_member", async (req, res) => {
    member
      .findOne({ where: { id_member: req.params.id_member } })
      .then((member) => {
        res.json(member);
      })
      .catch((error) => {
        res.json({ message: error.message });
      });
  });

// add new member
app.post('/', (request, response) => {
    let newMember = {
        nama: request.body.nama,
        alamat: request.body.alamat,
        jenis_kelamin: request.body.jenis_kelamin,
        telepon: request.body.telepon
    }

    member.create(newMember) // create berisi objek
    .then(result => {
        response.json({
            message: 'Data berhasil ditambahkan'
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
})

// update data
app.put("/:id_member", (request, response) => {
    // tampung data yang akan diubah,object data
    let data = {
        nama: request.body.nama,
        alamat: request.body.alamat,
        jenis_kelamin: request.body.jenis_kelamin,
        telepon: request.body.telepon
    }

    let parameter = {
        id_member: request.params.id_member
    }

    // proses update
    member.update(data, {where: parameter})
    .then(result => {
       return response.json({
            message: `Data berhasil diubah`,
            data: result
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
})

// Delete data
app.delete('/:id_member', (request, response) => {
    // tampung data yang akan dihapus
    let parameter = {
        id_member : request.params.id_member
    }
   
    member.destroy({where: parameter})
    .then (result => {
        return response.json({
            message: 'data berhasil dihapus'
        })
        .catch(error => {
            return response.json({
                message : error.message
            })
        })
    })
})

module.exports = app