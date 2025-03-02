/**
 * Express API "Not found" handler.
 */
function notFound(req, res, next) {
  console.log("**in not found**")
  next({ status: 404, message: `Path not found: ${req.originalUrl}` });
}

module.exports = notFound;
