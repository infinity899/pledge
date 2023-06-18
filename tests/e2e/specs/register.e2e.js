import i18n from '../../../src/i18n';

describe('Registration Tests', () => {
  before(() => {
    cy.setAgreement();
    cy.visit('/');
    cy.contains('div', i18n.t('signup')).click();
  });

  // Prevents clearing of localstorage between each tests.
  // https://github.com/cypress-io/cypress/issues/461#issuecomment-392070888
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Signup link exists on the home page and show login form when clicked.', () => {
    // Ensure signup form.
    cy.contains(i18n.t('auth.signup'));

    // Check social buttons.
    cy.contains('div', i18n.t('auth.buttonText.facebook')); // TODO: Make facebook button to use button tag
    cy.contains('div', i18n.t('auth.buttonText.google'));// TODO: Make google button to use button tag

    // Check form inputs.
    cy.get('input[type="email"]').should('have.attr', 'placeholder', i18n.t('auth.placeholders.email'));
    cy.get('input[type="password"]').should('have.attr', 'placeholder', i18n.t('auth.placeholders.create_password'));

    // Check sign up buttons.
    cy.contains('button', i18n.t('signup'))
      .should('have.attr', 'type', 'submit')
      .and('be.disabled');

    // Check forgot password link.
    cy.contains('div', i18n.t('auth.disclaimer'));

    // TODO: Use a tag for 'Read more' link.
    cy.contains('span', i18n.t('auth.read'));
  });

  it('When the user enters the wrong email, it displays an error.', () => {
    // TODO: Manual test of default error message of browser.
    cy.get('div[name="email"] > input').should('have.attr', 'type', 'email');
  });

  it('When the user enters a password not meeting set requirements, it displays an error.', () => {
    // Start typing characters ('P').
    cy.get('input[type="password"]').type('P');

    // Show up a validation status elements.
    cy.get('div.validate')
      .should('contain', i18n.t('auth.checks.chars'))
      .and('contain', i18n.t('auth.checks.number'))
      .and('contain', i18n.t('auth.checks.case'));

    // Show three x icons.
    cy.get('div.validate img.close').should('have.lengthOf', 3);
    cy.get('div.validate img.check').should('have.lengthOf', 0);

    // Continue typing ('Pa').
    cy.get('input[type="password"]').type('a');

    // Show two x icons, one check icon.
    cy.get('div.validate img.close').should('have.lengthOf', 2);
    cy.get('div.validate img.check').should('have.lengthOf', 1);

    // Continue typing ('Password').
    cy.get('input[type="password"]').type('ssword');

    // Show one x icons, two check icon.
    cy.get('div.validate img.close').should('have.lengthOf', 1);
    cy.get('div.validate img.check').should('have.lengthOf', 2);

    // Continue type ('Password1').
    cy.get('input[type="password"]').type('1');

    // Show three check icons.
    cy.get('div.validate img.close').should('have.lengthOf', 0);
    cy.get('div.validate img.check').should('have.lengthOf', 3);
  });

  it('When the user enters any password string they can press the "eye" icon to display the string.', () => {
    cy.get('img.input-icon-eye').click();
    cy.get('div[name="password"] > input').should('have.attr', 'type', 'text');
  });

  it('When the user presses the "eye" again, the string is hidden.', () => {
    cy.get('img.input-icon-eye').click();
    cy.get('div[name="password"] > input').should('have.attr', 'type', 'password');
  });

  it('When the user enters valid inputs for both email and passwords, they can click the Sign Up button.', () => {
    // Clear inputs and type valid email and password.
    cy.get('input[type="email"]')
      .clear()
      .type('test1@gmail.com');

    cy.get('input[type="password"]')
      .clear()
      .type('Password1');

    // Sign up button should be clickable.
    cy.contains('button', i18n.t('signup'))
      .should('not.be.disabled');
  });

  it('When the user enters an email that already exists in the system (via email address), it displays an error.', () => {
    // Clear inputs and type existing email and password.
    cy.get('input[type="email"]')
      .clear()
      .type('test1@gmail.com');

    cy.get('input[type="password"]')
      .clear()
      .type('Password1');

    // Sign up button should be clickable.
    cy.contains('button', i18n.t('signup'))
      .should('not.be.disabled')
      .click();

    // Show up an error message and color should be red.
    cy.contains('div.error-message', i18n.t('auth.errors.REGISTRATION_FAILURE'))
      .should('have.css', 'color', 'rgb(236, 74, 41)');
  });

  it('When the user enters an email that already exists in the system (via OAuth), it displays an error.', () => {
    // TODO: How to test OAuth flow?
  });

  it('When the user successfully clicks "Sign Up", it leads them to a screen with one input for user name.', () => {
    // Clear inputs and type existing email and password.
    cy.get('input[type="email"]')
      .clear()
      .type('tester1@gmail.com');

    cy.get('input[type="password"]')
      .clear()
      .type('Password1');

    // Sign up button should be clickable.
    cy.contains('button', i18n.t('signup'))
      .should('not.be.disabled')
      .click();

    // If succeeded to signup, leads to name input screen.
    cy.contains('div', i18n.t('auth.what'), { timeout: 5000 });
  });

  it('When the user enters a name, it leads them to a screen with text "Please confirm your email address".', () => {
    // Enter full name.
    cy.get('div[name="name"] > input')
      .should('have.attr', 'placeholder', i18n.t('auth.placeholders.name'))
      .type('Frontend Tester1');

    // Click save button.
    cy.get('button[type="submit"]')
      .should('have.text', i18n.t('auth.buttonText.save'))
      .click();

    // Leads to email confirm screen.
    cy.contains('div', i18n.t('auth.confirm'), { timeout: 5000 });
    cy.contains('div', i18n.t('auth.check_inbox2'))
      .contains('a', i18n.t('auth.click_here'));
  });

  it('When the user follows the link from their email for confirming their email address, a popup is shown with title "Email Verified".', () => {
    // TODO: How to get verification link which is sent to email?
  });
});
