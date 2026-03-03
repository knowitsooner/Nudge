exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const subscription = JSON.parse(event.body);
    console.log('New subscription:', JSON.stringify(subscription));
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch(err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
