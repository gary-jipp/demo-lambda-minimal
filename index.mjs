export const handler = async (event, context) => {

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Lambda!',
      input: event
    }),
  };

  return response;
};
