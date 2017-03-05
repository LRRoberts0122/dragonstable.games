/**
 * Inventory.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    card_id: {
      type: 'string',
      required: true,
      unique: true
    },
    foil_quantity: {
      type: 'integer'
    },
    normal_quantity: {
      type: 'integer'
    },
    toJSON: function() {
      var obj = this.toObject();
      return obj;
    }
  }
};
