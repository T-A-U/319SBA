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
    name: {type:String, index:true} 
  });
  const GamesModel = mongoose.model('Game', gamesSchema, "GTAgames");
  //const gamesValidator = GamesModel.validateSync()
//   GamesModel.createIndex( { name : -1 }, function(err, result) {
//     console.log(result);
//     callback(result);
//  })
  const consolesSchema = new mongoose.Schema({
    name: {type:String, index:true} 
  });
  const ConsolesModel = mongoose.model('Console', consolesSchema, "Consoles");
//   ConsolesModel.createIndex( { name : -1 }, function(err, result) {
//     console.log(result);
//     callback(result);
//  })
  const animeSchema = new mongoose.Schema({
    name: {type:String, index:true} 
  });
const AnimeModel = mongoose.model('Anime', animeSchema, "AnimeShows");
// AnimeModel.createIndex( { name : -1 }, function(err, result) {
//     console.log(result);
//     callback(result);
//  })

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
   let error = game.validateSync()
    console.log(game.name); // 'GTA'
    await game.save();
    res.send(game.name)
})

//Creates a single game in the database
app.post('/anime', async (req,res)=> {
    const anime = new AnimeModel({ name: 'Solo Leveling' });
    console.log(anime.name); // 'GTA'
    await anime.save();
    res.send(anime.name)
})

//Creates a single game in the database
app.post('/consoles', async (req,res)=> {
    const consoles = new ConsolesModel({ name: 'Play Station' });
    console.log(consoles.name); // 'GTA'
    await consoles.save();
    res.send(consoles.name)
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