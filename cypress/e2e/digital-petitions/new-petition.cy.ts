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
    cy.wait(2000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
  });

  it('should show "select type petition" form when "create now" button is clicked', () => {
    cy.get('h2', { timeout: 10000 }).should(($h2) => {
      expect($h2[0].textContent).equal('Create a petition');
    });
  });

  it('should show new issue petition form when "Continue" button is clicked and issue type is selected', () => {
    cy.wait(2000);
    cy.get('mat-radio-button[id="mat-radio-3"]', { timeout: 10000 }).click();

    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.wait(1000);
    cy.get('h4')
      .contains(
        'Please fill out all fields to submit your issue petition to the city.'
      )
      .should('be.visible');
  });

  it('should show two mat-error elements when the new issue petition form is submitted and it is invalid', () => {
    cy.wait(2000);

    cy.get('mat-radio-button[id="mat-radio-3"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('mat-error').should('have.length', '2');
  });

  it('should show new issue petition form when "Continue" button is clicked and issue type is selected', () => {
    cy.wait(2000);

    cy.get('mat-radio-button[id="mat-radio-2"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('h4')
      .contains(
        'Please fill out all fields to submit your candidate for ballot petition.'
      )
      .should('be.visible');
  });

  it('should show six mat-error elements when the new candidate petition form is submitted and it is invalid', () => {
    cy.wait(2000);

    cy.get('mat-radio-button[id="mat-radio-2"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('mat-error').should('have.length', '7');
  });

  it('should show two mat-error elements when the new issue petition form is submitted and it is invalid', () => {
    cy.wait(2000);

    cy.get('mat-radio-button[id="mat-radio-3"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('input[formcontrolname="title"]', { timeout: 10000 }).type(
      'Example title'
    );
    cy.get('textarea[formcontrolname="detail"]', { timeout: 10000 }).type(
      'Example text'
    );
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
  });

  it('should show an error message when the API response contains an error (new issue petition form)', () => {
    cy.intercept('https://cognito-idp.us-east-1.amazonaws.com/', (req: any) => {
      req.reply({});
    });
    cy.wait(2000);

    cy.get('mat-radio-button[id="mat-radio-3"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('input[formcontrolname="title"]', { timeout: 10000 }).type(
      'Example title'
    );
    cy.get('textarea[formcontrolname="detail"]', { timeout: 10000 }).type(
      'Example text'
    );
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });

    cy.get('dp-error-msg').should('have.length', '1');
  });

  it('should show the loading-bar element when the view is waiting for the API response (new issue petition form)', () => {
    cy.wait(2000);

    cy.get('mat-radio-button[id="mat-radio-3"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('input[formcontrolname="title"]', { timeout: 10000 }).type(
      'Example title'
    );
    cy.get('textarea[formcontrolname="detail"]', { timeout: 10000 }).type(
      'Example text'
    );
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('dp-loading-bar').should('have.length', '1');
  });

  it('should show an error message when the API response contains an error (new candidate petition form)', () => {
    cy.intercept('https://cognito-idp.us-east-1.amazonaws.com/', (req: any) => {
      req.reply({});
    });
    cy.wait(2000);

    cy.get('mat-radio-button[id="mat-radio-2"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });

    cy.get('input[formcontrolname="name"]', { timeout: 10000 }).type(
      'First Name'
    );

    cy.get('input[formcontrolname="address"]', { timeout: 10000 }).type(
      'Address'
    );
    cy.get('input[formcontrolname="zipCode"]', { timeout: 10000 }).type(
      '12345'
    );

    cy.get('input[formcontrolname="city"]', { timeout: 10000 }).type('City');

    cy.get('mat-select[formcontrolname="state"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-18"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('mat-select[formcontrolname="office"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-4"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('mat-select[formcontrolname="party"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-9"]', { timeout: 10000 }).click();

    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });

    cy.get('dp-error-msg').should('have.length', '1');
  });

  it('should show the loading-bar element when the view is waiting for the API response (new candidate petition form)', () => {
    cy.wait(2000);

    cy.get('mat-radio-button[id="mat-radio-2"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });

    cy.get('input[formcontrolname="name"]', { timeout: 10000 }).type(
      'First Name'
    );

    cy.get('input[formcontrolname="address"]', { timeout: 10000 }).type(
      'Address'
    );
    cy.get('input[formcontrolname="zipCode"]', { timeout: 10000 }).type(
      '12345'
    );

    cy.get('input[formcontrolname="city"]', { timeout: 10000 }).type('City');

    cy.get('mat-select[formcontrolname="state"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-17"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('mat-select[formcontrolname="office"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-4"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('mat-select[formcontrolname="party"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-11"]', { timeout: 10000 }).click();

    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('dp-loading-bar').should('have.length', '1');
  });

  it('should show "successful response" page when the "issue petition" form is submitted and it is valid', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('mutation SubmitIssuePetition') == 0) {
          req.reply({ fixture: 'committee/new-petition-issue.json' });
        }
      }
    );
    cy.wait(2000);

    cy.get('mat-radio-button[id="mat-radio-3"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('input[formcontrolname="title"]', { timeout: 10000 }).type(
      'Example title'
    );
    cy.get('textarea[formcontrolname="detail"]', { timeout: 10000 }).type(
      'Example text'
    );
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });

    cy.get('h4').should(($h4) => {
      expect($h4[0].textContent).equal(
        ' Your petition has been submitted to the city for review. A confirmation email has been sent to you. '
      );
    });
  });

  it('should show "successful response" page when the "candidate petition" form is submitted and it is valid', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('mutation SubmitCandidatePetition') == 0) {
          req.reply({ fixture: 'committee/new-petition-candidate.json' });
        }
      }
    );
    cy.wait(2000);

    cy.get('mat-radio-button[id="mat-radio-2"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });

    cy.get('input[formcontrolname="name"]', { timeout: 10000 }).type(
      'First Name'
    );

    cy.get('input[formcontrolname="address"]', { timeout: 10000 }).type(
      'Address'
    );
    cy.get('input[formcontrolname="zipCode"]', { timeout: 10000 }).type(
      '12345'
    );

    cy.get('input[formcontrolname="city"]', { timeout: 10000 }).type('City');

    cy.get('mat-select[formcontrolname="state"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-31"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('mat-select[formcontrolname="office"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-4"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('mat-select[formcontrolname="party"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-11"]', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });

    cy.get('h4').should(($h4) => {
      expect($h4[0].textContent).equal(
        ' Your petition has been submitted to the city for review. A confirmation email has been sent to you. '
      );
    });
  });
});
