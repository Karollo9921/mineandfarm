import validateUsersData from "../utilities/validateUsersData";

describe('Testing function which validate User registation data', () => {

  test('Login is too short', () => {
    const result = validateUsersData('a', 'password');
    expect(result).toBe('Your login is too short');
  });

});