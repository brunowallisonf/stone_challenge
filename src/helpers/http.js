exports.ok = function (body) {
  return { statusCode: 200, body };
};
exports.created = function (body) {
  return { statusCode: 201, body };
};
exports.notFound = function (error) {
  return { statusCode: 404, body: error };
};
exports.forbidden = function (error) {
  return { statusCode: 403, body: error };
};
