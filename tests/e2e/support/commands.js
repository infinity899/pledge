// Create custom Cypress commands and overwrite existing ones.
// https://on.cypress.io/custom-commands

import { getStore } from './utils';

const login = ({ email: username = 'test1@gmail.com', password = 'password1' } = {}) => {
  // Manually log the user in
  cy.location('pathname')
    .then((pathname) => {
      if(pathname === 'blank') {
        cy.visit('/');
      }
    })
    .then(() => getStore())
    .then(store => store.dispatch('AUTH_REQUEST', { username, password }));
};

const setAgreement = (flag = true) => {
  if(flag) {
    localStorage.setItem('agreementHidden', 'true');
  } else {
    localStorage.removeItem('agreementHidden');
  }
};

/**
 * Cache local storage, referenced from:
 * https://github.com/cypress-io/cypress/issues/461#issuecomment-392070888
 */
const LOCAL_STORAGE_MEMORY = {};

const saveLocalStorage = () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
};

const restoreLocalStorage = () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
};

Cypress.Commands.add('login', login);
Cypress.Commands.add('setAgreement', setAgreement);
Cypress.Commands.add('saveLocalStorage', saveLocalStorage);
Cypress.Commands.add('restoreLocalStorage', restoreLocalStorage);
