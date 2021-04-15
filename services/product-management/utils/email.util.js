import sendgrid from '@sendgrid/mail';
import config from 'config';

sendgrid.setApiKey(config.sendgrid.api_key);

module.exports = {
  send: async (recipients, templateId, templateData, attachments = []) => {
    const { emails: { fromName, defaultFrom } } = config;
    const message = {
      ...recipients,
      from: {
        name: fromName,
        email: defaultFrom,
      },
      templateId,
      dynamic_template_data: templateData,
      attachments,
    };

    return new Promise((resolve) => {
      sendgrid.send(message, (err) => {
        if (err) {
          resolve({
            status: false,
            msg: err.message,
          });
        } else {
          resolve({
            status: true,
            msg: 'Email successfully sent',
          });
        }
      });
    });
  },
};
