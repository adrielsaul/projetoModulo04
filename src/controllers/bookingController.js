const BookingModel = require('../models/bookingModel')
const BookingDao = require('../dao/bookingDao')

const {bookingDB} = require('../infra/bd')

class BookingController {
    constructor(dbConn) {
        this.dbConn = dbConn
    }

    show = async (req, res) => {
        
        // try {

        //     let expShow = await this.dbConn.getBookingById(req.params.id)

        //     if(expShow.length == 0) {

        //         console.log("Reserva não existe.")
        //         res.status(500).send({mensagem: "Reserva não existe."})

        //     } else {

        //         console.log(BookShow,`\nRota GET "unica" feita com sucesso`)

        //         res.status(200).send({data: BookShow, menssagem: "Evento retornado com sucesso"})
                
        //     }
        // } catch (error) {

        //     console.log('Erro da requisição: ' + error)
        //     res.status(500).json(error)

        // }

        this.dbConn.forEach((book) => {
            if(book.id == req.params.id) {
                console.log(book,`\nRota GET "unica" feita com sucesso`)
                res.send(book)
            }
        })
    }

    index = async (req, res) => {

        // try {
            
        //     let expIndex = await this.dbConn.getAllBooking()

        //     res.status(200).send({data: expIndex, mensagem: "Reservas retornadas com sucesso"})

        // } catch (error) {
            
        //     console.log('Erro da requisição: ' + error)
        //     res.status(500).json(error)
        // }

        res.send(this.dbConn)
    }

    save = async (req, res) => {
        const {id_user, id_room, data_entrada, data_saida, user_event_id, user_experience_id, valor_total} = req.body;

        const booking = new BookingModel(id_user, id_room, data_entrada, data_saida, user_event_id, user_experience_id, valor_total)

        // try {
            
        //     await this.dbConn.saveBooking(booking)

        //     res.status(201).send({menssage: "Reserva salva com sucesso"})

        // } catch (error) {
            
        //     console.log('Erro da requisição: ' + error)

        //     res.status(500).json(error)

        // }

        this.dbConn.push(booking)
        res.send("Rota POST de reserva ativada: reserva adicionada ao banco de dados")
    }

    remove = async (req, res) => {

        // try {
            
        //     await this.dbConn.deleteBooking(req.params.id)

        //     res.status(200).send({ mensagem: "Reserva apagada com sucesso"})

        // } catch (error) {
            
        //     console.log('Erro da requisição: ' + error)
        //     res.status(500).json(error)

        // }
        
        const id = req.params.id
        this.dbConn = this.dbConn.filter((i) => {
            
            return i.id !== id;
        })
        res.send(`Menssagem: ${id} apagado com sucesso`)
    }

    update = async (req, res) => {
        const id = req.params.id;
        const content = req.body;
        
        // try {
            
        //     let bookUpIndex = await this.dbConn.getBookingById(id)[0]

        //     if(content.id_user == null){
        //         content.id_user = bookUpIndex.id_user
        //     }
        //     if(content.id_room == null) {
        //         content.id_room = bookUpIndex.id_room
        //     }
        //     if(content.data_entrada == null) {
        //         content.data_entrada = bookUpIndex.data_entrada
        //     }
        //     if(content.user_event_id == null) {
        //         content.user_event_id = bookUpIndex.user_event_id
        //     }
        //     if(content.data_saida == null) {
        //         content.data_saida = bookIndex.data_saida
        //     }
        //     if(content.user_experience_id == null) {
        //         content.user_experience_id = bookUpIndex.user_experience_id
        //     }
        //     if(content.valor_total == null) {
        //         content.valor_total = bookUpIndex.valor_total
        //     }
        //     await this.dbConn.updateBooking(id, content)

        //     res.status(200).send({ mensagem: "Reserva atualizada com sucesso"})

        // } catch (error) {
            
        //     res.status(500).json(error)

        // }

        // const id = req.params.id
        // const content = req.body

        let bookingObj = {
            id: id,
            id_user: content.id_user,
            id_room: content.id_room,
            data_entrada: content.data_entrada,
            data_saida: content.data_saida,
            user_event_id: content.user_event_id,
            user_experience_id: content.user_experience_id,
            valor_total: content.valor_total,
        }

        for (let i =0; i < this.dbConn.length; i++) {
            if(this.dbConn[i].id === id) {
                this.dbConn[i] = bookingeObj
            }
        }

        res.send(`Task: ${id} modificado com sucesso`)
    }
}

module.exports = new BookingController(bookingDB)