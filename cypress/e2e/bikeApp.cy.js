describe('bikeApp', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', () => {
    cy.contains('Helsinki City Bike App');
  });

  it('journey list view can be opened', () => {
    cy.contains('List Journeys').click();
    cy.contains('Departure Station');
    cy.contains('Return Station');
    cy.contains('Travelled distance');
    cy.contains('Travel duration');
  });

  it('station list view can be opened', () => {
    cy.contains('List Stations').click();
    cy.contains('Station Name');
  });

  it('single station list view can be opened', () => {
    cy.contains('List Stations').click();
    cy.get('.list-item.list-item-stations.list-item-odd:first').click();
    cy.contains('Journeys started');
    cy.contains('Journeys ended');
  });
});