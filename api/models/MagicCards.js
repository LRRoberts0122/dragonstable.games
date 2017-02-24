/**
 * MagicCards.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  
  attributes: {
    id:           String,
    name:         String,
    names:        Array,
    colors:       Array,
    type:         String,
    supertypes:   Array,
    types:        Array,
    subtypes:     Array,
    rarity:       String,
    text:         String,
    flavor:       String,
    number:       String,
    power:        String,
    toughness:    String,
    loyalty:      Number,
    multiverseid: Number,
    printings:    Array,
    legalities:   Array,
    source:       String,
  }
};
