describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
      }
    );
    cy.visit('/auth/login');
  });
  beforeEach(() => {
    cy.intercept('https://cognito-idp.us-east-1.amazonaws.com/', (req: any) => {
      req.reply({ statusCode: 200 });
    });

    cy.intercept(
      'POST',
      'https://cognito-idp.us-east-1.amazonaws.com/',
      (req: any) => {
        switch (req.headers['x-amz-target']) {
          case 'AWSCognitoIdentityProviderService.GetUser':
            req.reply({ fixture: 'sign-in/sign-in-get-staff.json' });
            break;

          case 'AWSCognitoIdentityProviderService.RespondToAuthChallenge':
            req.reply({
              fixture: 'sign-in/sign-in-respond-to-auth-challenge.json',
            });
            break;
          case 'AWSCognitoIdentityProviderService.InitiateAuth':
            req.reply({ fixture: 'sign-in/sign-in-initiate-auth.json' });
            break;
        }
      }
    );

    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'email@test.com'
    );
    cy.get('input[formcontrolname="password"]', { timeout: 10000 }).type(
      'Password'
    );

    cy.get('button').should(($button) => {
      $button[1].click();
    });
    cy.intercept(
      'POST',
      'https://cognito-identity.us-east-1.amazonaws.com/',
      (req: any) => {
        if (
          req.headers['x-amz-target'] ===
          'AWSCognitoIdentityService.GetCredentialsForIdentity'
        ) {
          req.reply({
            fixture: 'sign-in/sign-in-get-credentials-for-identity.json',
          });
        }
      }
    );
  });

  it('should show city staff home page', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({ fixture: 'staff/home-admin.json' });
        }
      }
    );
    cy.get('p', { timeout: 10000 })
      .contains('Active Petitions In the City')
      .should('be.visible');
  });

  it('should show a loading bar when the response is loading', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByOwner') == 0) {
          req.reply({ fixture: 'committee/home-committee-empty.json' });
        }
      }
    );

    cy.get('dp-loading-bar', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(1);
    });
  });

  it('should show an error message when the API response with an error', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByOwner') == 0) {
          req.reply({ statusCode: 403 });
        }
      }
    );
    cy.get('dp-error-msg', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(1);
    });
  });

  it('should show "You still have no petitions" when the response is empty', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({ fixture: 'staff/home-admin-empty.json' });
        }
      }
    );

    cy.get('h3', { timeout: 10000 })
      .contains('You still have no petitions')
      .should('be.visible');
  });

  it('should show ten petition card', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({ fixture: 'staff/home-admin.json' });
        }
      }
    );
    cy.get('dp-petition-card', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(10);
    });
  });

  it('should show twenty petition card when "see more" option is clicked', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({ fixture: 'staff/home-admin.json' });
        }
      }
    );
    cy.get('button').should(($button) => {
      $button[12].click();
    });
    cy.get('dp-petition-card', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(20);
    });
  });

  it('should show details a petition when "View Petition" button is clicked', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({ fixture: 'staff/home-admin.json' });
        }
        if (req.body.query.search('query GetPetitionAsStaff') == 0) {
          req.reply({ fixture: 'staff/view-petition-staff.json' });
        }
      }
    );
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[3].click();
    });

    cy.get('h3', { timeout: 10000 }).should(($h2) => {
      expect($h2[0].textContent).equal('The meaning of life');
    });
  });
});
