// import express from 'express'

// const app = express()

// let PORT = 3000 


// app.get('/',(req,res) =>{
//     res.send('hello, World')
// })


// app.listen(PORT, ()=>{
//     console.log(`server is listening on: ${PORT}`)
// })

// Boiler plate for express application, will connect to database

import express from 'express'

const app = express()

let PORT = 3000 


app.get('/',(req,res) =>{
    res.send('hello, World')
})


app.listen(PORT, ()=>{
    console.log(`server is listening on: ${PORT}`)
})