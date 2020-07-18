describe('This is our test', () => {
    it('Should return true', () => {
        expect(true).to.equal(true);
    });
});

describe('Testing our form inputs', () => {
    beforeEach(function() {
        cy.visit('http://localhost:3003');
    });

    it('Input Name into the Name Input', () => {
        cy.pause()
        cy.get('[data-cy="name"]')
            .type("Melanie")
            .should("have.value", "Melanie")
            .type(" wants pizza")
            .should("have.value", "Melanie wants pizza")
            .clear();
      cy.contains("Name is a required field")

      cy.get('input[type="checkbox"]')
        .check()
        .should("be.checked")
    });
});