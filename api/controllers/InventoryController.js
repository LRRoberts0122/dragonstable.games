/**
 * InventoryController
 *
 * @description :: Server-side logic for managing Inventories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function(req, res, next) {

    var params = req.params.all();
    console.log(req.params.all());

    Inventory.create(params, function(err, card) {
      if (err) return next(err);
      res.status(201);
      res.json(card);
    });
  },

  update: function(req, res, next) {
    var params = req.params.all();

    Inventory.findOrCreate(params)
    .then(function(card) {
      console.log(card);
    });
  },

  getStock: function(req, res, next) {
    var id = req.param('id'); /* Card ID */
    console.log("RUNNING GETSTOCK!");

    var idShortCut = isShortcut(id);

    if (idShortCut === true) {
      return next();
    }

    if (id) {
      Inventory.findOne({card_id: id}, function(err, stock) {
        if (stock === undefined) return res.notFound();
        if (err) return next(err);
        console.log(stock.foil_quantity);
        console.log(stock.normal_quantity);
        // res.view('card.ejs', {
        //     title: 'Card'
        // });
        // res.view('/card/' + id, {stock: stock, layout: 'card'});
      });
    }

    function isShortcut(id) {
      if(id === 'find' || id === 'update' || id === 'create' || id === 'destroy') {
        return true;
      }
    }
  }
};
