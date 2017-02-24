/**
 * CartController
 *
 * @description :: Server-side logic for managing Carts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	saveCart: function(req, res, next) {

		var params = req.params.all();

		if (!customer) {
			console.log("Guest usesr. Save cart to cache.");
		}

		Cart.create(params, function(err, cart) {
			if (err) return next(err);
			res.status(201);
			res.json(cart);
		});
	},

	updateCart: function(req, res, next) {

		var criteria = {};

		criteria = _.merge({}, req.params.all(), req.body);

		var customer = req.param('customer_id');

		if (!customer) {
			console.log("Not logged in. Save cart to cache.");
		}

		Cart.update(customer, criteria, function(err, cart) {
			if(cart.length === 0) return res.notFound();
			if (err) return next(err);
			res.json(cart);
		});
	},

	findCartByUser: function(req, res, next) {

		var customer = req.param('customer_id');

		Cart.find({customer_id: customer_id}, function(err, cart) {
			if(cart.length === 0) return res.notFound();
			if (err) return next(err);
			res.json(cart);
		});
	},

	deleteCart: function(req, res, next) {
		var customer = req.param('customer_id');

		if (!customer) {
			return res.badRequest('Invalid customer id. Please relog and try again.');
		}

		Cart.findOne(customer).done(function(err, cart) {
			if (err) return res.serverError(err);

			if (!result) return res.notFound();

			Cart.destroy(customer, function (err) {
				if (err) return next(err);
				return res.json(result);
			});
		});
	}
};
