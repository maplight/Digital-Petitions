describe('Home Test', () => {
  it('should show a h1 title', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({ fixture: 'home-response.json' });
        }
      }
    );
    cy.visit('/');

    cy.get('h1', { timeout: 10000 }).should('have.text', 'Sign A Petition');
  });

  it('should show ten petition card', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({ fixture: 'home-response.json' });
        }
      }
    );
    cy.visit('/');
    cy.get('dp-petition-card', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(10);
    });
  });

  it('should show six mat-chips elements in the filters when the view corresponding a large screen device', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({ fixture: 'home-response.json' });
        }
      }
    );
    cy.get('mat-chip', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(6);
    });
  });

  it('should show two "mat-select" elements in the filters when the view corresponding a movile screen device', () => {
    cy.viewport(250, 660);
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({ fixture: 'home-response.json' });
        }
      }
    );
    cy.get('mat-select', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(2);
    });
  });

  it('should show twenty petition card when "see more" option is clicked', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({ fixture: 'home-response.json' });
        }
      }
    );
    cy.visit('/');
    cy.get('button').should(($button) => {
      $button[10].click();
    });
    cy.get('dp-petition-card', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(20);
    });
  });

  it('should show "You still have no petitions" message when response is empty', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({});
        }
      }
    );
    cy.visit('/');

    cy.get('h3', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(1);
    });
  });

  it('should show details of petition when the button endorse now is clicked', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({ fixture: 'home-response.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser  ') == 0) {
          req.reply({ fixture: 'view-petition.json' });
        }
      }
    );
    cy.visit('/');
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[0].click();
    });
    cy.get('h3', { timeout: 10000 }).should('have.text', 'James Duncan');
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
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({});
        }
      }
    );
    cy.visit('/');

    cy.get('dp-loading-bar', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(1);
    });
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
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({ statusCode: 403 });
        }
      }
    );
    cy.visit('/');
    cy.get('dp-error-msg', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(1);
    });
  });
});
