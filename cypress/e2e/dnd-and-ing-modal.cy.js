describe('dnd and ing-modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/react-burger');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user-test.json' }).as('handleGetUserInfo');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients-arr.json' }).as('handleGetIngredients');
  });

  /* eslint-disable cypress/unsafe-to-chain-command */

  it('dnd-move ingredients to constructor', () => {
    cy.wait('@handleGetIngredients');
    cy.get('[data-testid=ingredientItem]').as('ingredientItem');
    cy.get('[data-testid=constructorBox]').as('constructorBox');
    cy.get('@ingredientItem').contains('Краторная булка N-200i').trigger('mousedown').trigger('dragstart');
    cy.get('@constructorBox').trigger('dragover').trigger('drop');
    
    cy.get('@ingredientItem').contains('Соус Spicy-X').trigger('mousedown').trigger('dragstart');
    cy.get('@constructorBox').trigger('dragover').trigger('drop');
    
    cy.get('@ingredientItem').contains('Филе Люминесцентного тетраодонтимформа').trigger('mousedown').trigger('dragstart');
    cy.get('@constructorBox').trigger('dragover').trigger('drop');
  });

  it('ingredient modal', () => {
    cy.wait('@handleGetIngredients');
    cy.get('[data-testid=ingredientItem]').contains('Филе Люминесцентного тетраодонтимформа').click();
    cy.get('[data-testid=ingredientDetails]').contains('Филе Люминесцентного тетраодонтимформа').should('exist');
    cy.get('[data-testid=closeModal]').click();
  });

});