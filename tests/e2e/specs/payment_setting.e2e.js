import { i18n } from '../support/utils';

describe('Payment Settings Tests', () => {

  const inputFieldLabels = i18n.t('settings.payment.labels');

  before(() => {
    cy.setAgreement();
    cy.login({ email: 'test3@gmail.com', password: 'password3' });
    cy.visit('/settings/payment');

    // Check if it's settings page and payment tab is active
    cy.contains('h1', i18n.t('settings.title'));
    cy.contains('a.router-link-active', i18n.t('settings.tabs')[3].label);
  });

  // Prevent clearing localstorage between tests.
  // https://github.com/cypress-io/cypress/issues/461#issuecomment-392070888
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('When the user has no credit cards saved, display a message representing the empty state.', () => {
    cy.contains('h3', i18n.t('settings.payment.title'));
    // TODO: Check if "no credit cards" message exists. (Not implemented yet)
  });

  it('When the user clicks "Add Card", open a modal with an empty form.', () => {
    // Click add card button.
    cy.contains('div', i18n.t('settings.payment.buttons.add_card')).click();

    // Check payment modal is opened.
    cy.contains('div.modal-header', i18n.t('settings.payment.create_payment_title'));
  });

  it('When the user presses "Add Card" in the modal with empty inputs, display an error message.', () => {
    // Make sure empty inputs.
    cy.get('#card-number input').clear();
    cy.get('.expiration input').clear();
    cy.get('.security-code input').clear();

    // Click add card button in modal.
    cy.contains('div.payment-method-modal div', i18n.t('settings.payment.buttons.add_card')).click();

    // Show error messages.
    cy.contains('div.error', i18n.t('settings.payment.invalid_error_message', { label: inputFieldLabels.card_number }));
    cy.contains('div.error', i18n.t('settings.payment.invalid_error_message', { label: inputFieldLabels.expiration }));
    cy.contains('div.error', i18n.t('settings.payment.invalid_error_message', { label: inputFieldLabels.security_code }));
  });

  it('When the user enters an invalid card number, display an error message.', () => {
    // Enter invalid card number.
    cy.get('#card-number input').clear().type('1234 1234 1234 123');

    // Click add card button.
    cy.contains('div.payment-method-modal div', i18n.t('settings.payment.buttons.add_card')).click();

    // Show invalid card number message after entering a CC# that's too short
    cy.contains('div.error', i18n.t('settings.payment.invalid_error_message', { label: inputFieldLabels.card_number }));
  });

  it('When the user enters an expiration date that is in the past, display an error message.', () => {
    // Enter expired date.
    cy.get('.expiration input').clear().type('01/19');

    // Click add card button.
    cy.contains('div.payment-method-modal div', i18n.t('settings.payment.buttons.add_card')).click();

    // Show invalid card number message.
    cy.contains('div.error', i18n.t('settings.payment.invalid_error_message', { label: inputFieldLabels.expiration }));
  });

  it('When the user enters card information without a billing address, display an error message.', () => {
    // TODO: Not implemented feature
  });

  it('When the user successfully submits a card, display it in the list view.', () => {
    // Enter valid card information.
    const validCard = {
      number: '1234 5678 1234 5678',
      name: 'Test Card',
      expiration: '01/25',
      cvv: '123',
      zipcode: '123456',
    };
    cy.get('#card-number input').clear().type(validCard.number);
    cy.get('#name input').clear().type(validCard.name);
    cy.get('.expiration input').clear().type(validCard.expiration);
    cy.get('.security-code input').clear().type(validCard.cvv);
    cy.get('.zip input').clear().type(validCard.zipcode);

    // Click add card button.
    cy.contains('div.payment-method-modal div', i18n.t('settings.payment.buttons.add_card')).click();

    // Modal should be disappeared.
    cy.get('div.payment-method-modal').should('not.exist');

    // New card should be listed.
    cy.contains('div.payments-list h4', i18n.t('settings.payment.card_name', { code: '5678' }));
  });

  it('When a previously saved card is expired, display an error status in the list.', () => {
    // TODO: Not implemented feature
  });
});
