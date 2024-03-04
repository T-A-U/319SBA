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

import express from 'express';
import mongoose from "mongoose";
import mongodb from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Replace the uri string with your connection string.
const mongoURI = process.env.MONGO_URI
await mongoose.connect(mongoURI);

const app = express()

let PORT = 3000 
//Create a schema, move to separate file eventually - code from mongoose documentation
const gamesSchema = new mongoose.Schema({
    name: String  
  });
const GamesModel = mongoose.model('Game', gamesSchema, "GTAgames");


app.get('/',async (req,res) =>{
    // res.send('hello, World')
    const games = await GamesModel.find({});
    console.log("All games,",games);
    res.send(games)
})

app.post('/games', async (req,res)=> {
    const game = new GamesModel({ name: 'KingdomHearts' });
    console.log(game.name); // '1080 Avalanche'
    await game.save();
})

app.delete('games/:_id', async (req,res)=> {
    //does not work yet
    const game = await GamesModel.findByIdAndDelete(_id) 
})

app.listen(PORT, ()=>{
    console.log(`server is listening on: ${PORT}`)
})