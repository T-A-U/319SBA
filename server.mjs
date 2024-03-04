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

//Gets all games and returns them in a list
app.get('/',async (req,res) =>{
    // res.send('hello, World')
    const games = await GamesModel.find({});
    console.log("All games,",games);
    res.send(games)
})

//Creates a single game in the database
app.post('/games', async (req,res)=> {
    const game = new GamesModel({ name: 'Grand Theft Auto: London 1969' });
    console.log(game.name); // 'GTA'
    await game.save();
})

//Updates a single game name
app.put("/:id", async (req,res)=> {
    const game = await GamesModel.findOneAndUpdate({_id: '65e53a9d94b31326c3ca8b1d'}, {name: 'Grand Theft Auto: Vice City '}) 
    res.send(game).status(200)
})



//Deletes a single game from the list
app.delete('/:id', async (req,res)=> {
    //does not work yet
    const game = await GamesModel.deleteOne({_id: '65e539dd5674cfe1e0a789bf'}) 
    res.send(game).status(200)
})

app.listen(PORT, ()=>{
    console.log(`server is listening on: ${PORT}`)
})