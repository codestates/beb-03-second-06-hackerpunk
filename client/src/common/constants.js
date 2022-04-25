export const MIN_ID_LENGTH = 4;
export const MAX_ID_LENGTH = 14;
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 100;

export const PureIdRegex = /[-._a-zA-Z0-9]/g;
export const EmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;

export const WhitespaceRegex = /\s+/g;

export const removeWhitespace = (str) => str.replace(WhitespaceRegex, '');
