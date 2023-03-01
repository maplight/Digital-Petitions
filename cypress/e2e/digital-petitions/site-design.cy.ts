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
        if (req.body.query.search('query GetSiteResources') == 0) {
          req.reply({ fixture: 'staff/site-design-response.json' });
        }
        if (req.body.query.search('mutation UpdateSiteConfiguration') == 0) {
          req.reply({ fixture: 'staff/change-site-design.json', delay: 1000 });
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
      $button[2].click();
    });
  });

  it('should show site design page', () => {
    cy.get('p').should(($p) => {
      expect($p[2].textContent).equal('Global Designer Setting');
    });
  });

  it('should show correct Highlight, Buttons and Header colors when corresponding selector is clicked', () => {
    cy.get(
      'mat-expansion-panel-header[id="mat-expansion-panel-header-0"]'
    ).click();
    cy.get(
      'mat-expansion-panel-header[id="mat-expansion-panel-header-1"]'
    ).click();
    cy.get(
      'mat-expansion-panel-header[id="mat-expansion-panel-header-2"]'
    ).click();
    cy.wait(1500);
    cy.get('dp-color-palette').click({ multiple: true });
    cy.get('dp-color-slider').click({ multiple: true });
    cy.get('p').should(($p) => {
      expect($p[4].textContent).equal(' #40807B ');
      expect($p[6].textContent).equal(' #407F7D ');
      expect($p[9].textContent).equal(' #40807B ');
    });
  });

  it('should show a error message when the site configuration is submitted with incorrect data', () => {
    cy.wait(1500);
    cy.get('button').contains(' Save ').click();
    cy.get('dp-error-msg').should('have.length', '1');
  });

  it('should show a loading bar when the site configuration is submitted with correct data', () => {
    cy.wait(1500);
    cy.get(
      'mat-expansion-panel-header[id="mat-expansion-panel-header-0"]'
    ).click();
    cy.get(
      'mat-expansion-panel-header[id="mat-expansion-panel-header-1"]'
    ).click();
    cy.get(
      'mat-expansion-panel-header[id="mat-expansion-panel-header-2"]'
    ).click();
    cy.wait(1500);
    cy.get('dp-color-palette').click({ multiple: true });
    cy.get('dp-color-slider').click({ multiple: true });
    cy.get('img').click({ multiple: true });
    cy.get('button').contains(' Save ').click();
    cy.get('dp-loading-bar').should('have.length', '1');
  });
});
