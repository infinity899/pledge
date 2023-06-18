describe('Home Page', () => {
  it('has the correct title and heading', () => {
    cy.visit('/');

    // Ensure browser title is Pledgecamp.
    cy.title().should('equal', 'Pledgecamp');

    // Ensure header title exists
    cy.contains('We redesigned');

    // Ensure demo popup
    cy.contains('div.modal-header', 'This Site Is a Demo Only');

    // Ensure enter button and agreement flag is set in localStorage
    cy.contains('div', 'Enter')
      .click()
      .should(() => {
        expect(localStorage.getItem('agreementHidden')).to.eq('true');
      });
  });
});
