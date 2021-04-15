import log from 'utils/logger.util';
import amqpLib from 'amqplib/callback_api';

const exchangeName = 'user.added';

module.exports = {
  send: async (user) => {
    try {
      if (!user) {
        throw new Error('Sould send a valid user to message queue');
      }

      amqpLib.connect('amqp://rabbitmq', (err, connection) => {
        // eslint-disable-next-line no-unused-expressions
        if (err) process.exit;

        connection.createChannel((error, channel) => {
          if (error) {
            process.exit();
          } else {
            channel.assertQueue('user.added', { durable: false });
            channel.sendToQueue('user.added', Buffer.from(JSON.stringify(user)));
          }
        });
      });
    } catch (err) {
      log.error(`Error Sending user information ${exchangeName}: ${err}`);
    }
  },
};
