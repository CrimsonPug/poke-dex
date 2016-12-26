const express = require('express');
const axios = require('axios');
const request = require('request');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
 
app.use(bodyParser.json());

app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
 next();
});

mongoose.connect('mongodb://localhost/data/db/');

// Tell Mongoose to use ES6 Promises for its promises
mongoose.Promise = global.Promise;
// Log to console any errors or a successful connection.
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log("Connected to db at /data/db/")
});

const Pokemon = require('./models/pokemon');

app.get('/',(req,res)=>{
    let url = 'http://pokeapi.co/api/v2/pokemon?limit=151';
    request (url, (error, response, body)=>{
        if (!error && response.statusCode === 200){
            var pokeList = JSON.parse(body);
            var pokeData = [];
            for (let i = 0; i < pokeList.results.length ; i++){
                let newPoke = {
                    url: pokeList.results[i].url,
                    name: pokeList.results[i].name,
                    imageId : i + 1
                };
                let newObject = Pokemon(newPoke);
                newObject.save()
                    .then(savedPokemon => {
                        console.log('Pokemon Saved');
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json({err})
                    })
                pokeData.push(newPoke)
            }
            res.send(pokeData);
        }
    });
});

app.get('/pokemon',(req,res)=>{
    Pokemon.find({})
		.then(objectsArray => {
			res.json(objectsArray);
		})
		.catch(err => {
			console.log(err);
			res.status(400)
				.json({err});
		})
})

app.listen(8080, () => {
	console.log('Server Started on http://localhost:8080');
	console.log('Press CTRL + C to stop server');
});