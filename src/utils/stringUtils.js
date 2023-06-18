import moment from 'moment';

import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import matches from 'validator/lib/matches';
import isPostalCode from 'validator/lib/isPostalCode';

const validateEmail = isEmail;

const validatePhone = isMobilePhone;

const validateAddress = str => matches(str, /^[a-zA-Z0-9 ,.]*$/);

const validatePostalCode = str => isPostalCode(str, 'any');

const validateWords = str => matches(str, /^[a-zA-Z0-9 ]*$/);

const validateNames = str => matches(str, /^[a-zA-Z ]*$/);

const validateDate = (str, format) => moment(str, format).isValid();

function validateLink(link) {
  // eslint-disable-next-line
  const re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return re.test(String(link));
}

function formatWithCommas(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export {
  validateAddress,
  validateEmail,
  validatePhone,
  validatePostalCode,
  validateWords,
  formatWithCommas,
  validateLink,
  validateDate,
  validateNames,
};
