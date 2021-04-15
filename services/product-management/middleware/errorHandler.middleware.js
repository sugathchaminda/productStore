import log from 'utils/logger.util';
import ErrorResponse from 'utils/errorResponse.util';
import { DUPLICATE_FIELD_VALUE, RESOURCE_NOT_FOUND } from 'constants/messages.constant';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  /** Mongoose bad ObjectId */
  if (err.name === 'CastError') {
    error = new ErrorResponse(RESOURCE_NOT_FOUND, 404);
  }

  /** Mongoose duplicate key */
  if (err.code === 11000) {
    error = new ErrorResponse(DUPLICATE_FIELD_VALUE, 400);
  }

  /** Celebrate input error handling */
  if (error.details) {
    const errorBody = error.details.get('body'); // 'details' is a Map()
    const { details: [errorDetails] } = errorBody;

    error.message = errorDetails.message;
    error.statusCode = 400;
  }

  const statusCode = error.statusCode || 500;
  error = error.message || 'Server Error';

  log.error(`${statusCode}: ${error}`.red.bold);

  res.status(statusCode).json({ success: false, error });
  next();
};

export default errorHandler;
