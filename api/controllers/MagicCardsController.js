/**
 * MagicCardsController
 *
 * @description :: Server-side logic for managing Magiccards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// Create New Card
	create: function(req, res, next) {

		var params = req.params.all();

		MagicCards.create(params, function(err, card) {
			if (err) return next(err);
			res.status(201);
			res.json(card);
		});
	},

	findCardById: function(req, res, next) {
		var id = req.param('id');

		var idShortCut = isShortcut(id);

		if (idShortCut === true) {
			return next();
		}

		if (id) {
			MagicCards.findOne(id, function(err, card) {
				if (card === undefined) return res.notFound();
				if (err) return next(err);
				res.json(card);
			});
		}
	},

	searchCards: function(req, res, next) {
		var where = req.param('where');
		console.log(where);
	},

	// Get Card Data
	find: function(req, res, next) {
		var id = req.param('id');

		var idShortCut = isShortcut(id);

		if (idShortCut === true) {
			return next();
		}

		if (id) {
			MagicCards.findOne(id, function(err, card) {
				if (card === undefined) return res.notFound();
				if (err) return next(err);
				res.json(card);
			});
		} else {

			var where = req.param('where');
			console.log("WHERE:");
			console.log(where);

			MagicCards.find(where, function(err, cards) {
				console.log(err);
				console.log(cards);
				if (cards === undefined) return res.notFound();
				if (err) return next(err);
				console.log(cards);
				res.json(cards);
			});

			// if (_.isString(where)) {
			// 	where = JSON.parse(where);
			// 	console.log(where);
			//
			// 	if (where.name) {
			// 		where.name = {contains : where.name};
			// 	}
			//
			// 	if (where.text) {
			// 		where.text = {contains : where.text};
			// 	}
			//
			// 	if (where.flavor) {
			// 		where.flavor = {contains : where.flavor};
			// 	}
			//
			// 	if(where.cards) {
			// 		where.cards = {contains: where.cards};
			// 	}
			// }
			//
			// MagicCards.find(where, function(err, cards) {
			// 	if (cards === undefined) return res.notFound();
			// 	if (err) return next(err);
			// 	console.log(cards);
			// 	res.json(cards);
			// });
		}

		function isShortcut(id) {
			if (id === 'find' || id === 'update' || id === 'create' || id === 'destroy') {
				return true;
			}
		}
	}
};
