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
    cy.wait(1500);
    cy.visit('/account-setting');
  });

  it('should show account setting view', () => {
    cy.get('h2').contains('Account Settings').should('be.visible');
  });

  it('should show change email form when the "change email" button is clicked', () => {
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
    cy.get('form', { timeout: 10000 }).should('have.length', '1');
  });

  it('should show one mat-error element when the "change email" form is submited and it is invalid', () => {
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
    cy.wait(1500);
    cy.get('button').contains('Proceed').click();
    cy.get('mat-error', { timeout: 10000 }).should('have.length', '1');
  });

  it('should show "Confirm email change" form when "Email Change" form is sumbited and it is valid', () => {
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
    cy.wait(1500);
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'email@test.com'
    );
    cy.get('button').contains('Proceed').click();
    cy.get('input[formcontrolname="code"]', { timeout: 10000 }).should(
      'be.visible'
    );
  });

  it('should show one mat-error element when the "confirm email change" form is submited and it is invalid', () => {
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
    cy.wait(1500);
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'email@test.com'
    );
    cy.get('button').contains('Proceed').click();
    cy.wait(1500);
    cy.get('button').contains('Proceed').click();
    cy.get('mat-error', { timeout: 10000 }).should('have.length', '1');
  });

  it('should show the "result box" when the "change email" flow finished successfully', () => {
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
    cy.wait(1500);
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'email@test.com'
    );
    cy.get('button').contains('Proceed').click();
    cy.wait(1500);
    cy.get('input[formcontrolname="code"]', { timeout: 10000 }).type('123');
    cy.get('button').contains('Proceed').click();
    cy.get('h4', { timeout: 10000 })
      .contains(' Email successfully changed! ')
      .should('be.visible');
  });

  it('should show "change password" form when the "change password" button is clicked', () => {
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('form', { timeout: 10000 }).should('have.length', '1');
  });

  it('should show two mat-error elements when the "change password" form is submited and it is invalid', () => {
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.wait(1500);
    cy.get('button').contains('Save').click();
    cy.get('mat-error', { timeout: 10000 }).should('have.length', '2');
  });

  it('should show the "result box" when the "change password" flow finished successfully', () => {
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.wait(1500);
    cy.get('input[formcontrolname="oldPassword"]', { timeout: 10000 }).type(
      '1234'
    );
    cy.get('input[formcontrolname="newPassword"]', { timeout: 10000 }).type(
      '1234'
    );
    cy.get('button').contains('Save').click();

    cy.get('h4', { timeout: 10000 })
      .contains(' Password Successfully Changed! ')
      .should('be.visible');
  });

  it('should show "change personal details" form when the "change personal details" button is clicked', () => {
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[3].click();
    });
    cy.get('form', { timeout: 10000 }).should('have.length', '1');
  });

  it('should show six mat-error elements when the "change personal details" form is submited and it is invalid', () => {
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[3].click();
    });
    cy.wait(1500);
    cy.get('button').contains('Save').click();
    cy.get('mat-error', { timeout: 10000 }).should('have.length', '4');
  });

  it('should show the "result box" when the "change personal details" flow finished successfully', () => {
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[3].click();
    });
    cy.wait(1500);
    cy.get('input[formcontrolname="firstName"]', { timeout: 10000 }).type(
      'First Name'
    );
    cy.get('input[formcontrolname="lastName"]', { timeout: 10000 }).type(
      'Last Name'
    );
    cy.get('input[formcontrolname="address"]', { timeout: 10000 }).type(
      'Address'
    );
    cy.get('input[formcontrolname="zipCode"]', { timeout: 10000 }).type(
      '12345'
    );
    cy.get('input[formcontrolname="city"]', { timeout: 10000 }).type('City');
    cy.get('mat-select[formcontrolname="state"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-1"]', { timeout: 10000 }).click();

    cy.get('button').contains('Save').click();

    cy.get('h4', { timeout: 10000 })
      .contains('Personal Data successfully changed! ')
      .should('be.visible');
  });
});
