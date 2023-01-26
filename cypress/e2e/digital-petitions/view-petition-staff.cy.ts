describe('view petition staff spec', () => {
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
  });

  it('should show details a petition', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        if (req.body.query.search('query GetPetitionAsStaff') == 0) {
          req.reply({ fixture: 'staff/view-petition-staff.json' });
        }
      }
    );
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[3].click();
    });
    cy.get('h3', { timeout: 10000 }).should(($h2) => {
      expect($h2[0].textContent).equal('The meaning of life');
    });
  });

  it('should show "petition certification packet" element when the petition status is "active"', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        if (req.body.query.search('query GetPetitionAsStaff') == 0) {
          req.reply({ fixture: 'staff/view-petition-staff.json' });
        }
      }
    );
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[3].click();
    });
    cy.get('p').should(($p) => {
      expect($p[2].textContent).equal('Active');
    });
    cy.get('dp-cualified-box').should('be.visible');
  });

  it('should show approve/deny box when the petition status is "new"', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        if (req.body.query.search('query GetPetitionAsStaff') == 0) {
          req.reply({ fixture: 'staff/view-petition-staff-new.json' });
        }
      }
    );
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[3].click();
    });
    cy.get('p').should(($p) => {
      expect($p[2].textContent).equal('Awaiting approval');
    });
    cy.get('dp-new-box').should('be.visible');
  });

  it('should show an alert if deny button is clicked', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        if (req.body.query.search('query GetPetitionAsStaff') == 0) {
          req.reply({ fixture: 'staff/view-petition-staff-new.json' });
        }
      }
    );
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[3].click();
    });
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });

    cy.get('mat-dialog-container', { timeout: 10000 }).should(
      'have.length',
      '1'
    );
  });

  it('should display a "successful result" dialog when the user confirms the denial of a petition', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        if (req.body.query.search('query GetPetitionAsStaff') == 0) {
          req.reply({ fixture: 'staff/view-petition-staff-new.json' });
        }
        if (req.body.query.search('mutation RejectPetition') == 0) {
          req.reply({ fixture: 'staff/rejected-petition.json' });
        }
      }
    );
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[3].click();
    });
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[4].click(); //confirm edit petition
    });
    cy.get('h4', { timeout: 10000 }).should(($h4) => {
      expect($h4[1].textContent).equal(' Petition Denied! ');
    });
  });

  it('should show a form if approve button is clicked', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        if (req.body.query.search('query GetPetitionAsStaff') == 0) {
          req.reply({ fixture: 'staff/view-petition-staff-new.json' });
        }
      }
    );
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[3].click();
    });
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });

    cy.get('form', { timeout: 10000 }).should('have.length', '1');
  });

  it('should show two mat-error when the "Set Qualification Requirements" form is submited and it is invalid', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        if (req.body.query.search('query GetPetitionAsStaff') == 0) {
          req.reply({ fixture: 'staff/view-petition-staff-new.json' });
        }
      }
    );
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[3].click();
    });
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[6].click();
    });
    cy.get('mat-error', { timeout: 10000 }).should('have.length', '2');
  });

  it('should show an alert when the "Set Qualification Requirements" form is submited and it is valid', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        if (req.body.query.search('query GetPetitionAsStaff') == 0) {
          req.reply({ fixture: 'staff/view-petition-staff-new.json' });
        }
      }
    );
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[3].click();
    });
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[4].click();
    });
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[30].click();
    });
    cy.get('input[formcontrolname="requiredSignatures"]', {
      timeout: 10000,
    }).type('100');
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[6].click();
    });
    cy.get('mat-dialog-container', { timeout: 10000 }).should(
      'have.length',
      '2'
    );
  });

  it('should display a "successful result" dialog when the user confirms the approbal of a petition', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        if (req.body.query.search('query GetPetitionAsStaff') == 0) {
          req.reply({ fixture: 'staff/view-petition-staff-new.json' });
        }
        if (req.body.query.search('mutation ApprovePetition') == 0) {
          req.reply({ fixture: 'staff/approve-petition.json' });
        }
      }
    );
    cy.wait(1000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[3].click();
    });
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[4].click();
    });
    cy.wait(1500);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[30].click();
    });
    cy.get('input[formcontrolname="requiredSignatures"]', {
      timeout: 10000,
    }).type('100');
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[6].click();
    });

    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[8].click();
    });
    cy.get('h4', { timeout: 10000 }).should(($h4) => {
      expect($h4[0].textContent).equal(' Petition Approved! ');
    });
  });
});
