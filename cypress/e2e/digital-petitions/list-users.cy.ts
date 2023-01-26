describe('list users', () => {
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
        if (req.body.query.search('query GetUsers') == 0) {
          req.reply({ fixture: 'staff/users-list-response.json' });
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
            req.reply({ fixture: 'sign-in/sign-in-get-admin.json' });
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
    cy.get('a[href="/city-staff/admin"]', { timeout: 10000 }).click();

    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
  });

  it('should show eleven users', () => {
    cy.get('tr').should('have.length', '11');
  });

  it('should show a loading bar when the response is loading', () => {
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
        if (req.body.query.search('query GetUsers') == 0) {
          req.reply({ statusCode: 403 });
        }
      }
    );
    cy.get('dp-error-msg', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(1);
    });
  });

  it('should show a form if New Member button is clicked', () => {
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });

    cy.get('form', { timeout: 10000 }).should('have.length', '1');
  });

  it('should show two mat-error when the "New Member" form is submited and it is invalid', () => {
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).contains(' + Add Member ').click();

    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).contains('Save').click();
    cy.get('mat-error', { timeout: 10000 }).should('have.length', '2');
  });

  it('should show an error message when the API response with an error (new member form)', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req);
        if (req.body.query.search('mutation CreateStaffUser') == 0) {
          req.reply({ statusCode: 403 });
        }
      }
    );
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).contains(' + Add Member ').click();
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'email@test.com'
    );
    cy.get('mat-select[formcontrolname="permissions"]', {
      timeout: 10000,
    }).click();
    cy.get('mat-option[id="mat-option-12"]', { timeout: 10000 }).click();
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).contains('Save').click();
    cy.get('dp-error-msg', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(1);
    });
  });

  it('should show a form if "Change Account Permission" button is clicked', () => {
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('button', { timeout: 10000 })
      .contains(' Change Account Permission ')
      .click();
    cy.get('form', { timeout: 10000 }).should('have.length', '1');
  });

  it('should show one mat-error when the "Change Account Permission" form is submited and it is invalid', () => {
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('button', { timeout: 10000 })
      .contains(' Change Account Permission ')
      .click();

    cy.get('mat-select[formcontrolname="type"]', {
      timeout: 10000,
    }).click();
    cy.get('mat-option[id="mat-option-11"]', { timeout: 10000 }).click();
    cy.get('mat-error', { timeout: 10000 }).should('have.length', '1');
  });

  it('should show an error message when the API response with an error (Change Account Permission form)', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req);
        if (req.body.query.search('mutation UpdateUserAccess') == 0) {
          req.reply({ statusCode: 403 });
        }
      }
    );
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('button', { timeout: 10000 })
      .contains(' Change Account Permission ')
      .click();
    cy.get('button', { timeout: 10000 }).contains('Save').click();

    cy.get('dp-error-msg', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(1);
    });
  });
});
