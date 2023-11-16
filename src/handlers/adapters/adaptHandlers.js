module.exports = (handler) => {
  return async (event) => {
    try {
      const httpRequest = {
        body: event.body && JSON.parse(event.body),
        headers: event.headers,
        params: event.pathParameters,
        query: event.queryStringParameters,
      };

      const result = await handler.handle(httpRequest);
      if (result.statusCode >= 400) {
        return {
          statusCode: result.statusCode,
          body: JSON.stringify({ error: result.body.message }),
        };
      }
      return {
        statusCode: result.statusCode,
        body: JSON.stringify(result.body),
      };
    } catch (error) {
      console.log(error);
      return { statusCode: 500, body: 'An error occurred' };
    }
  };
};
