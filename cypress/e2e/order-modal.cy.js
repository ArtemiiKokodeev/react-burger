describe('order-modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/react-burger');
    window.localStorage.setItem('accessToken', 'test-accessToken');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user-test.json' }).as('handleGetUserInfo');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients-arr.json' }).as('handleGetIngredients');
    cy.intercept('POST', 'api/orders', { fixture: 'order-test.json' }).as('handleCreateOrder');
  });

  /* eslint-disable cypress/unsafe-to-chain-command */

  it('order-modal', () => {
    cy.wait('@handleGetIngredients');
    cy.get('[data-testid=ingredientItem]').as('ingredientItem');
    cy.get('[data-testid=constructorBox]').as('constructorBox');
    cy.get('@ingredientItem').contains('Краторная булка N-200i').trigger('mousedown').trigger('dragstart');
    cy.get('@constructorBox').trigger('dragover').trigger('drop');
    cy.get('@ingredientItem').contains('Соус Spicy-X').trigger('mousedown').trigger('dragstart');
    cy.get('@constructorBox').trigger('dragover').trigger('drop');
    cy.get('@ingredientItem').contains('Филе Люминесцентного тетраодонтимформа').trigger('mousedown').trigger('dragstart');
    cy.get('@constructorBox').trigger('dragover').trigger('drop');
    cy.get('[data-testid=orderMade]').click();
    cy.wait('@handleCreateOrder');
    cy.get('[data-testid=orderModal]').should('exist');
    cy.get('[data-testid=closeModal]').click();
  });

});