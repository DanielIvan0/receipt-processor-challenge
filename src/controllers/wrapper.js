/**
 * 
 * @param {Function} controller
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