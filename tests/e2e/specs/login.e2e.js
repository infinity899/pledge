import { i18n } from '../support/utils';

describe('Authentication', () => {
  before(() => {
    cy.setAgreement();
  });

  it('Login link exists on the home page and show login form when clicked', () => {
    cy.visit('/');
    // Check if login button exists in home page.
    // TODO: Update the login button to use a tag.
    // cy.contains('a', 'Log In').should('have.attr', 'href', '/login');
    cy.contains('div', i18n.t('login')).click();

    // Ensure login form.
    cy.contains(i18n.t('auth.login'));

    // Check social login buttons.
    cy.contains('div', i18n.t('auth.buttonText.facebook')); // TODO: Make facebook button to use button tag.
    cy.contains('div', i18n.t('auth.buttonText.google'));// TODO: Make google button to use button tag.

    // Check login inputs.
    cy.get('input[type="email"]').should('have.attr', 'placeholder', i18n.t('auth.placeholders.email'));
    cy.get('input[type="password"]').should('have.attr', 'placeholder', i18n.t('auth.placeholders.password'));

    // Check login button.
    cy.contains('button', i18n.t('login')).should('have.attr', 'type', 'submit');

    // Check 'Remember Me' checkbox.
    cy.contains('div', i18n.t('auth.remember_me'));

    // Check forgot password link.
    cy.contains('a', i18n.t('auth.forgot_password')).should('have.attr', 'href', '/forgot-password');
  });

  it('When the user logs in without any of the fields, it displays an appropriate message.', () => {
    // Submit with empty email and password.
    cy.get('button[type="submit"]').click();

    // Show error message and disable button.
    cy.contains('div.error', i18n.t('auth.errors.EMAIL_MISSING'));
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('When the user logs in with incorrect credentials, it shows them an error message for it.', () => {
    // Enter invalid email.
    cy.get('input[type="email"]')
      .clear()
      .type('badEmail@test');
    cy.get('button[type="submit"]').click();

    // Show error message and disable button.
    cy.contains('div.error', i18n.t('auth.errors.EMAIL_INVALID'));
    cy.get('button[type="submit"]').should('have.attr', 'disabled');

    // Enter invalid password.
    cy.get('input[type="email"]')
      .clear()
      .type('test@email.com');
    cy.get('input[type="password"]')
      .clear()
      .type('badPassword');
    cy.get('button[type="submit"]').click();

    // Show invalid credential message and disable button.
    cy.contains('div', i18n.t('auth.errors.LOGIN_FAILURE'));
    cy.get('button[type="submit"]').should('have.attr', 'disabled');
  });

  it('When the user logs in with the "Remember me" checked, the credentials are saved for the user.', () => {
    // TODO: Update when cookie authentication?
  });

  it('When the user logs in with correct information, it returns them to the page they were previously on.', () => {
    const redirectTestUrl = '/project/4/project';
    // Goto a project page
    cy.visit(redirectTestUrl);

    // Click login button
    cy.contains('div', i18n.t('login')).click();

    // Submit correct credential
    cy.get('input[type="email"]')
      .clear()
      .type('test1@gmail.com');
    cy.get('input[type="password"]')
      .clear()
      .type('password1');
    cy.get('button[type="submit"]').click();

    // Redirect to the previous project page again
    cy.url()
      .should('be', redirectTestUrl);
  });

  it('When user logged in and refresh the page, session should be alive.', () => {
    // Log in User
    cy.login()
      .should(() => expect(localStorage.getItem('USER-TOKEN')).to.exist);

    // Visit profile page (refreshing)
    cy.visit('/user/me');

    cy.wait(5000);

    // Make sure page is not redirecting to /login
    cy.location('pathname')
      .should((pathname) => {
        expect(pathname).to.eq('/user/me');
      });
  });

  it('When token is invalid or expired, it should redirect to login from private pages', () => {
    // Log in User and then invalidate the token.
    cy.login()
      .should(() => expect(localStorage.getItem('USER-TOKEN')).to.exist)
      .then(() => {
        localStorage.setItem('USER-TOKEN', 'some wrong token');
      });

    // Visit profile page
    cy.visit('/user/me');

    // Make sure the page is redirected to /login
    cy.location('pathname')
      .should((pathname) => {
        expect(pathname).to.eq('/login');
      });
  });

  it('When the user logs in without a confirmed email address, they are redirected to a page explaining the email confirmation requirement.', () => {
    // TODO: Create an "email unconfirmed" user in db.
    const testEmail = 'test9@gmail.com';
    const testPassword = 'password9';

    // Go to login page.
    cy.visit('/login');

    // Submit "email unconfirmed" user credentials.
    cy.get('input[type="email"]')
      .type(testEmail);
    cy.get('input[type="password"]')
      .type(testPassword);
    cy.get('button[type="submit"]').click();

    // Check email confirmation page
    cy.contains('div', i18n.t('auth.confirm'));
  });

  it('When the user logs in and they haven\'t entered a name, they are redirected to a page with a name input', () => {
    // TODO: Create a "name unconfirmed" user in db
    const testEmail = 'test8@gmail.com';
    const testPassword = 'password8';

    // Go to login page.
    cy.visit('/login');

    // Submit "name unconfirmed" user credentials.
    cy.get('input[type="email"]')
      .type(testEmail);
    cy.get('input[type="password"]')
      .type(testPassword);
    cy.get('button[type="submit"]').click();

    // Check name input page
    cy.contains('div', i18n.t('auth.what'));
    cy.get('div[name="name"] > input')
      .should('have.attr', 'placeholder', i18n.t('auth.placeholders.name'));
  });
});
