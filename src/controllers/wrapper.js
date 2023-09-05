/**
 * Interacts with the model and serves the response to the client.
 * @namespace Controllers
 */

/**
 * Wraps the controller callback and returns the controller function for the Express router.
 * This helps to standardize the response.
 * @memberof Controllers
 * @param {Function} controller Controller function. Example: getReceiptPoints
 * @returns {Function} Express Route
 */
const wrapper = controller => async (req, res, next) => {
	try {
		const data = await controller(req);

		res.status(200);
		res.json(data);
	} catch (error) {
		next(error);
	}
};

module.exports = wrapper;