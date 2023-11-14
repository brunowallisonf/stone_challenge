module.exports = (handler) => {
  return async (event) => {
    try {
      console.log(`event`, event);
      const httpRequest = {
        body: event.body && JSON.parse(event.body),
        headers: event.headers,
        params: event.pathParameters,
        query: event.queryStringParameters,
      };
      console.log(httpRequest);
      const result = await handler.handle(httpRequest);
      console.log(result);
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
