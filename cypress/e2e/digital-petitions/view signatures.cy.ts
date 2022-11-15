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
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({ fixture: 'staff/home-admin.json' });
        }
        if (req.body.query.search('query GetPetitionAsStaff') == 0) {
          req.reply({ fixture: 'staff/view-petition-staff.json' });
        }
        if (req.body.query.search('query GetSignaturesByPetition') == 0) {
          req.reply({ fixture: 'staff/signatures-response.json' });
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
          case 'AWSCognitoIdentityProviderService.GetCredentialsForIdentity':
            req.reply({
              fixture: 'sign-in/sign-in-get-credentials-for-identity.json',
            });
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
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[3].click();
    });
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
  });

  it('should show six signatures', () => {
    cy.get('tr').should('have.length', '7');
  });

  it('should show an alert', () => {
    cy.get('dp-view-signatures-alert').should('have.length', '1');
  });

  it('should show approve and deny buttons when any signature is selected', () => {
    cy.get('mat-checkbox[id="mat-checkbox-2"]', { timeout: 10000 }).click();
    cy.get('button').should('have.length', '5');
  });

  it('should show loading bar when the "Approve" button is clicked', () => {
    cy.get('mat-checkbox[id="mat-checkbox-2"]', { timeout: 10000 }).click();
    cy.get('button').contains('Approve').trigger('click');
    cy.get('dp-loading-bar').should('have.length', '1');
  });

  it('should show loading bar when the "Deny" button is clicked', () => {
    cy.get('mat-checkbox[id="mat-checkbox-2"]', { timeout: 10000 }).click();
    cy.get('button').contains('Deny').trigger('click');
    cy.get('dp-loading-bar').should('have.length', '1');
  });
});
