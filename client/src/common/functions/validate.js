import {
  MIN_ID_LENGTH,
  MAX_ID_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  PureIdRegex,
  EmailRegex,
} from '..';

const typeGuard = (value, typeName = 'string') => {
  if (typeof value !== typeName)
    throw new Error(`value is not ${typeName} type: ${value}`);
};

function validate({ key, value }) {
  let len = value.length || 0;
  switch (key) {
    case 'id':
      typeGuard(value, 'string');
      if (len < MIN_ID_LENGTH)
        throw new Error(`Use 4 characters or more for your id`);
      if (len > MAX_ID_LENGTH)
        throw new Error(`Use 14 characters or fewer for your id`);
      if (PureIdRegex.test(value) === false)
        throw new Error(
          `Sorry, only letters (a-z, A-Z), numbers (0-9), and periods (.) and dash(-, _)are allowed.`
        );

      break;
    case 'password':
      typeGuard(value, 'string');
      if (len < MIN_PASSWORD_LENGTH)
        throw new Error(`Use 8 characters or more for your password`);
      if (len > MAX_PASSWORD_LENGTH)
        throw new Error(`Use 100 characters or fewer for your password`);

      break;
    case 'email':
      typeGuard(value, 'string');
      if (EmailRegex.test(value) === false)
        throw new Error(`Invalid e-mail format`);

      break;
    default:
      throw new Error(`Unexpected Validate Key: ${key}`);
  }
}

export default validate;
