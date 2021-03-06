const config = {
  version: '1.0.0',
  api_version_prefix: '/api/v1',
  port: 3000,
  cors_urls: '*',
  DB_HOST: 'db',
  DB_NAME: 'PRODUCTMANAGER',
  DB_USER: 'users_service',
  DB_PASSWORD: '123',
  DB_DIALECT: 'mysql',
  messageBus: 'amqp://guest:guest@localhost:15672',
  logs: {
    folder: './logs',
    cron: './logs/cron.log',
    controller: './logs/controller.log',
  },
  sendgrid: {
    api_key: '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',
  },
  emails: {
    fromName: 'Xyz forum',
    defaultFrom: 'sugathsathkorala@gmail.com',
  },
  jwt: {
    jwt_common_secret: 'ULYOHJE7MYWPHMHPVDFQAL9RRZ7BA4BN6F24RRQNHTNG8I08PY8F339FQ43R42UA',
    jwt_auth_secret: 'AA48973B1A76A4710DD3D49F14F2CFEFC85C779F04F6CE79B7980B06178A9D5E',
    jwt_expire: '1h',
  },
};

config.startedMessage = `${config.name} is running on port ${config.port}/`;

module.exports = config;
