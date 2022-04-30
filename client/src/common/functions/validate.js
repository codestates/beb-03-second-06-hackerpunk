import {
  MIN_ID_LENGTH,
  MAX_ID_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  PureIdRegex,
  EmailRegex,
} from "..";

const typeGuard = (value, typeName = "string") => {
  if (typeof value !== typeName)
    throw new Error(`value is not ${typeName} type: ${value}`);
};

function validate({ key, value }) {
  let len = value.length || 0;
  const newError = (msg = "") => {
    const error = { message: msg, value };
    return error;
  };
  switch (key) {
    case "id":
      typeGuard(value, "string");
      if (len < MIN_ID_LENGTH)
        throw newError(`Use 4 characters or more for your id`);
      if (len > MAX_ID_LENGTH)
        throw newError(`Use 14 characters or fewer for your id`);
      if (PureIdRegex.test(value) === false)
        throw newError(
          `Sorry, only letters (a-z, A-Z), numbers (0-9), and periods (.) and dash(-, _)are allowed.`
        );

      break;
    case "password":
      typeGuard(value, "string");
      if (len < MIN_PASSWORD_LENGTH)
        throw newError(`Use 8 characters or more for your password`);
      if (len > MAX_PASSWORD_LENGTH)
        throw newError(`Use 100 characters or fewer for your password`);

      break;
    case "email":
      typeGuard(value, "string");
      if (EmailRegex.test(value) === false)
        throw newError(`Invalid e-mail format`);

      break;
    default:
      throw newError(`Unexpected Validate Key: ${key}`);
  }
}

export default validate;
