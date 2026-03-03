const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:joanne@knowitsooner.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const { subscription, title, body } = JSON.parse(event.body);
    await webpush.sendNotification(subscription, JSON.stringify({ title, body }));
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch(err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
