/* eslint-disable no-undef */
import config from '../../config/config';

describe('config', () => {
  test('should load default values', () => {
    expect(config.port).not.toBeNull();
    expect(config).toMatchSnapshot();
  });
});
