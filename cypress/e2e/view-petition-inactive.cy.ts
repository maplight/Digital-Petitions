describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('/inactive-petitions/id');
  });
  it('should show the petition received from the API', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'view-petition-inactive.json' });
        }
      }
    );
    cy.get('h3', { timeout: 10000 }).should('have.text', 'James Duncan');
  });

  it('should show an error message when the API response with an error', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req);
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ statusCode: 403 });
        }
      }
    );
    cy.get('dp-error-msg', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(1);
    });
  });

  it('should show a loading bar when the response is loading', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({});
        }
      }
    );
    cy.get('dp-loading-bar', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(1);
    });
  });

  it('should show the status box when a petition is received from the API', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'view-petition-inactive.json' });
        }
      }
    );
    cy.get('dp-status', { timeout: 10000 }).should('have.length', '1');
  });
});
