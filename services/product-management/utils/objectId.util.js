import Joi from '@hapi/joi';
import joiObjectId from 'joi-objectid';

export default () => {
  Joi.objectId = joiObjectId(Joi);
};
