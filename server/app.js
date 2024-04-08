const express = require ('express')
// const router = require('./router/index');
const controller = require ('./controllers/controller')
const app = express()
const port = 3000
// const cors = require ('cors')

// app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.post('/book', controller.addBook)
app.post('/student', controller.addStudent)
app.post('/addBook', controller.addStock)
app.post('/transaction', controller.createTransaction)
app.get('/history', controller.viewHistory)
// app.use(router);


app.listen(port, () => console.log(`Pinjam dulu ${port}`))

module.exports = app