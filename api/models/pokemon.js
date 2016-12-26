
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema.
const pokemonSchema = new Schema({
  name: String,
  url: String,
  type: String,
  imageId: Number,
  weight: Number,
  height:Number,
  ability:String,
  stats: {
      hP:Number,
      attack:Number,
      defense:Number,
      speed:Number,
      specialAttack:Number,
      specialDefense:Number,
  },
  created_at: Date,
  updated_at: Date
},{
    timestamp:true
}

);

// Create a model using schema.
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

// Make this available to our Node applications.
module.exports = Pokemon;