// Returns the Vuex store.
export const getStore = () => cy.window().its('pledgecampApp.$store'); // eslint-disable-line
export { default as i18n } from '../../../src/i18n';
