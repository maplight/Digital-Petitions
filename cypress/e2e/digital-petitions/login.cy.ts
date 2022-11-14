describe('login process', () => {
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

  it('should show admin home page when the login process finished successfully and the logged user is an admin', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({ fixture: 'home-admin.json' });
        }
      }
    );
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
    cy.get('h2', { timeout: 10000 })
      .contains('Welcome, Admin')
      .should('be.visible');
  });

  it('should show "Site Admin" option when the login process finished successfully and the logged user is an admin', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({ fixture: 'home-admin.json' });
        }
      }
    );
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
    cy.get('a', { timeout: 10000 }).should(($a) => {
      expect($a[1].textContent).contain('Site Admin');
    });
  });

  it('not should show "Site Admin" option when the login process finished successfully and the logged user is diferent an admin', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByType') == 0) {
          req.reply({ fixture: 'home-admin.json' });
        }
      }
    );
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

    cy.get('a', { timeout: 10000 }).should('have.length', '1');
  });

  it('should show committee home page when the login process finished successfully and the logged user is a petitioner', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByOwner') == 0) {
          req.reply({ fixture: 'committee/home-committee.json' });
        }
      }
    );
    cy.intercept('https://cognito-idp.us-east-1.amazonaws.com/', (req: any) => {
      req.reply({ statusCode: 200 });
    });

    cy.intercept(
      'POST',
      'https://cognito-idp.us-east-1.amazonaws.com/',
      (req: any) => {
        switch (req.headers['x-amz-target']) {
          case 'AWSCognitoIdentityProviderService.GetUser':
            req.reply({ fixture: 'sign-in/sign-in-get-petitioner.json' });
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

    cy.get('p', { timeout: 10000 })
      .contains(
        'View your submitted petitions or create a new petition to submit to the city.'
      )
      .should('be.visible');
  });

  it('should navigate to sign-up view when sign-up link is clicked', () => {
    cy.get('a', { timeout: 10000 }).should(($a) => {
      $a[0].click();
    });
    cy.get('h4').should(($h4) => {
      expect($h4[0].textContent).equal(' Create an account ');
    });
  });

  it('should navigate to recover passwrd form when forgot password link is clicked', () => {
    cy.get('a', { timeout: 10000 }).should(($a) => {
      $a[1].click();
    });
    cy.get('h4', { timeout: 10000 }).should(($h4) => {
      expect($h4[0].textContent).equal(
        ' Enter the email that is linked to your account '
      );
    });
  });

  it('should show two mat-error elements when the login form is submitted and it is invalid', () => {
    cy.get('button').should(($button) => {
      $button[1].click();
    });

    cy.get('mat-error').should('have.length', '2');
  });

  it('should show an error message when the API response contains an error', () => {
    cy.intercept('https://cognito-idp.us-east-1.amazonaws.com/', (req: any) => {
      req.reply({});
    });
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'email@test.com'
    );
    cy.get('input[formcontrolname="password"]', { timeout: 10000 }).type(
      'Password'
    );
    cy.get('button').should(($button) => {
      $button[1].click();
    });

    cy.get('dp-error-msg').should('have.length', '1');
  });

  it('should show the loading-bar element when the view is waiting for the API response', () => {
    cy.intercept('https://cognito-idp.us-east-1.amazonaws.com/', (req: any) => {
      req.reply({});
    });
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'email@test.com'
    );
    cy.get('input[formcontrolname="password"]', { timeout: 10000 }).type(
      'Password'
    );
    cy.get('button').should(($button) => {
      $button[1].click();
    });

    cy.get('dp-loading-bar').should('have.length', '1');
  });
});
