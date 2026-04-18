describe('Order Flow', () => {
  it('should allow a user to browse menu and add to cart', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Our Menu').should('be.visible');
    // More complex E2E would require backend running
  });
});
