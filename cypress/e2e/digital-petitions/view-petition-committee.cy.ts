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
        if (req.body.query.search('query GetPetitionsByOwner') == 0) {
          req.reply({ fixture: 'committee/home-committee.json' });
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
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByOwner') == 0) {
          req.reply({ fixture: 'committee/home-committee.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'committee/view-petition-committee.json' });
        }
      }
    );
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });

    cy.get('h3', { timeout: 10000 }).should(($h2) => {
      expect($h2[0].textContent).equal('Example titile edited');
    });
  });

  it('should show edit petition form when edit button is clicked', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByOwner') == 0) {
          req.reply({ fixture: 'committee/home-committee.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'committee/view-petition-committee.json' });
        }
      }
    );
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });

    cy.get('form', { timeout: 10000 }).should('have.length', '1');
  });

  it('should show an alert when submit button is clicked and the edit form is valid', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByOwner') == 0) {
          req.reply({ fixture: 'committee/home-committee.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'committee/view-petition-committee.json' });
        }
      }
    );
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('mat-dialog-container', { timeout: 10000 }).should(
      'have.length',
      '1'
    );
  });

  it('should show "successful result" page when the from is submitted and it is valid ', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByOwner') == 0) {
          req.reply({ fixture: 'committee/home-committee.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'committee/view-petition-committee.json' });
        }
        if (req.body.query.search('mutation EditIssuePetition') == 0) {
          req.reply({ fixture: 'committee/edited-petition.json' });
        }
      }
    );
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[4].click();
    });
    cy.get('h3', { timeout: 10000 })
      .contains('Your petition has been successfully resubmitted!')
      .should('be.visible');
  });

  it('should show a loading bar when the response is loading', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByOwner') == 0) {
          req.reply({ fixture: 'committee/home-committee.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'committee/view-petition-committee.json' });
        }
        if (req.body.query.search('mutation EditIssuePetition') == 0) {
          req.reply({ fixture: 'committee/edited-petition.json' });
        }
      }
    );
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click(); //view petition
    });
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click(); //edit petition
    });
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click(); //submit petition
    });
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[4].click(); //confirm edit petition
    });

    cy.get('dp-loading-bar', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(1);
    });
  });

  it('should show an alert if withdraw button is clicked', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByOwner') == 0) {
          req.reply({ fixture: 'committee/home-committee.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'committee/view-petition-committee.json' });
        }
      }
    );
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });

    cy.get('mat-dialog-container', { timeout: 10000 }).should(
      'have.length',
      '1'
    );
  });

  it('should show a confirm dialog when user try withdraw a petition', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByOwner') == 0) {
          req.reply({ fixture: 'committee/home-committee.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'committee/view-petition-committee.json' });
        }
      }
    );
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[4].click(); //confirm edit petition
    });
    cy.get('form', { timeout: 10000 }).should('have.length', '1');
  });

  it('should show one mat-error element when the text typed is different of "YES" in confirm withdraw petition dialog', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByOwner') == 0) {
          req.reply({ fixture: 'committee/home-committee.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'committee/view-petition-committee.json' });
        }
      }
    );
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[4].click(); //confirm edit petition
    });
    cy.get('input[formcontrolname="code"]', { timeout: 10000 }).type('ASD');
    cy.get('mat-error', { timeout: 10000 }).should('have.length', '1');
  });

  it('should show "successful withdraw" page when the form submitted is valid', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req.body.query);
        if (req.body.query.search('query GetPetitionsByOwner') == 0) {
          req.reply({ fixture: 'committee/home-committee.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'committee/view-petition-committee.json' });
        }
      }
    );
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[1].click();
    });
    cy.wait(3000);
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[4].click(); //confirm edit petition
    });
    cy.wait(500);
    cy.get('input[formcontrolname="code"]', { timeout: 10000 }).type('Y');
    cy.wait(500);
    cy.get('input[formcontrolname="code"]', { timeout: 10000 }).type('E');
    cy.wait(500);
    cy.get('input[formcontrolname="code"]', { timeout: 10000 }).type('S');
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[4].click(); //confirm edit petition
    });
    cy.get('p', { timeout: 10000 }).should(($p) => {
      expect($p[1].textContent).equal(
        ' Your petition has been successfully Withdrawn! '
      );
    });
  });
});
