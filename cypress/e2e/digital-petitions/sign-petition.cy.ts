describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('/home/id');
  });

  it('should show a loading bar when the response is loading', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({});
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
        console.log(req);
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ statusCode: 403 });
        }
      }
    );
    cy.get('dp-error-msg', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(1);
    });
  });

  it('should show details of petition received from the API', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'view-petition.json' });
        }
      }
    );
    cy.get('dp-basic-card', { timeout: 10000 }).should('have.length', '1');
  });

  it('should show signatures box when the device screen is large', () => {
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'view-petition.json' });
        }
      }
    );
    cy.get('dp-sign-this-petition', { timeout: 10000 }).should(
      'have.length',
      '1'
    );
  });

  it('not should show signatures box when the device screen is mobile, should show "Sign Petition" button in this case', () => {
    cy.viewport(250, 660);
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'view-petition.json' });
        }
      }
    );
    cy.get('dp-sign-this-petition', { timeout: 10000 }).should(
      'have.length',
      '0'
    );
    cy.get('button', { timeout: 10000 }).should('have.length', '1');
  });

  it('should show signatures box when the device screen is mobile and "Sign Petition" button is clicked', () => {
    cy.viewport(250, 660);
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'view-petition.json' });
        }
      }
    );
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[0].click();
    });
    cy.get('dp-sign-this-petition', { timeout: 10000 }).should(
      'have.length',
      '1'
    );
  });

  it('should show five errors when "Continue" button is clicked in "Sign Petition" form and the form is invalid', () => {
    cy.viewport(250, 660);
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'view-petition.json' });
        }
      }
    );
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[0].click();
    });
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[0].click();
    });
    cy.get('mat-error', { timeout: 10000 }).should('have.length', '5');
  });

  it('should show the signature verification methods when "Continue" button is clicked in "Sign Petition" form and the form is valid', () => {
    cy.viewport(250, 660);
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req);

        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'view-petition.json' });
        }
        if (req.body.query.search('query GetVoterRecordMatch') == 0) {
          req.reply({ fixture: 'sign-response.json' });
        }
      }
    );
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[0].click();
    });
    cy.get('input[formcontrolname="fullName"]', { timeout: 10000 }).type(
      'Name'
    );
    cy.get('input[formcontrolname="address"]', { timeout: 10000 }).type(
      'Address'
    );
    cy.get('input[formcontrolname="city"]', { timeout: 10000 }).type('City');
    cy.get('mat-select[formcontrolname="state"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-1"]', { timeout: 10000 }).click();
    cy.get('input[formcontrolname="zipCode"]', { timeout: 10000 }).type(
      'Example'
    );
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[0].click();
    });
    cy.get('mat-radio-button', { timeout: 10000 }).should('have.length', '5');
  });

  it('should show "Continue" button if the signature verification form is valid', () => {
    cy.viewport(250, 660);
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req);

        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'view-petition.json' });
        }
        if (req.body.query.search('query GetVoterRecordMatch') == 0) {
          req.reply({ fixture: 'sign-response.json' });
        }
      }
    );
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[0].click();
    });
    cy.get('input[formcontrolname="fullName"]', { timeout: 10000 }).type(
      'Name'
    );
    cy.get('input[formcontrolname="address"]', { timeout: 10000 }).type(
      'Address'
    );
    cy.get('input[formcontrolname="city"]', { timeout: 10000 }).type('City');
    cy.get('mat-select[formcontrolname="state"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-1"]', { timeout: 10000 }).click();
    cy.get('input[formcontrolname="zipCode"]', { timeout: 10000 }).type(
      'Example'
    );
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[0].click();
    });
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[0].click();
    });
    cy.get('mat-radio-button[value="Email"]', { timeout: 10000 }).click();
    cy.get('button', { timeout: 10000 }).should(($button) => {
      expect($button[2].textContent).equal(' Continue ');
    });
  });

  it('should show the verification code form when the method selected is different of "State ID"', () => {
    cy.viewport(250, 660);
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req);

        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'view-petition.json' });
        }
        if (req.body.query.search('query GetVoterRecordMatch') == 0) {
          req.reply({ fixture: 'sign-response.json' });
        }

        if (req.body.query.search('mutation SubmitSignature') == 0) {
          req.reply({ fixture: 'submit-signature-true.json' });
        }
      }
    );
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[0].click();
    });
    cy.get('input[formcontrolname="fullName"]', { timeout: 10000 }).type(
      'Name'
    );
    cy.get('input[formcontrolname="address"]', { timeout: 10000 }).type(
      'Address'
    );
    cy.get('input[formcontrolname="city"]', { timeout: 10000 }).type('City');
    cy.get('mat-select[formcontrolname="state"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-1"]', { timeout: 10000 }).click();
    cy.get('input[formcontrolname="zipCode"]', { timeout: 10000 }).type(
      'Example'
    );
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[0].click();
    });
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[0].click();
    });
    cy.get('mat-radio-button[value="license"]', { timeout: 10000 }).click();
    cy.get('input[formcontrolname="licenseNumber"]', { timeout: 10000 }).type(
      '123456'
    );
    cy.get('input[formcontrolname="dateOfBirth"]', { timeout: 10000 }).type(
      '12/12/3022'
    );
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('input[formcontrolname="code"]', { timeout: 10000 }).should(
      'be.visible'
    );
  });

  it('should show the success result view if the signature verification form is valid and "Continue"  button is clicked (in this case the verification code is not necessary)', () => {
    cy.viewport(250, 660);
    cy.intercept(
      'POST',
      'https://neouilttfjcc5ght2tbr7of7mu.appsync-api.us-east-1.amazonaws.com/graphql',
      (req: any) => {
        console.log(req);

        if (req.body.query.search('query SiteConfiguration') == 0) {
          req.reply({ fixture: 'site-config.json' });
        }
        if (req.body.query.search('query GetPetitionAsCommonUser') == 0) {
          req.reply({ fixture: 'view-petition.json' });
        }
        if (req.body.query.search('query GetVoterRecordMatch') == 0) {
          req.reply({ fixture: 'sign-response.json' });
        }

        if (req.body.query.search('mutation SubmitSignature') == 0) {
          req.reply({ fixture: 'submit-signature.json' });
        }
      }
    );
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[0].click();
    });
    cy.get('input[formcontrolname="fullName"]', { timeout: 10000 }).type(
      'Name'
    );
    cy.get('input[formcontrolname="address"]', { timeout: 10000 }).type(
      'Address'
    );
    cy.get('input[formcontrolname="city"]', { timeout: 10000 }).type('City');
    cy.get('mat-select[formcontrolname="state"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-1"]', { timeout: 10000 }).click();
    cy.get('input[formcontrolname="zipCode"]', { timeout: 10000 }).type(
      'Example'
    );
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[0].click();
    });
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[0].click();
    });
    cy.get('mat-radio-button[value="license"]', { timeout: 10000 }).click();
    cy.get('input[formcontrolname="licenseNumber"]', { timeout: 10000 }).type(
      '123456'
    );
    cy.get('input[formcontrolname="dateOfBirth"]', { timeout: 10000 }).type(
      '12/12/3022'
    );
    cy.get('button', { timeout: 10000 }).should(($button) => {
      $button[2].click();
    });
    cy.get('p', { timeout: 10000 }).should(($p) => {
      expect($p[0].textContent).equal(' Signature Successfully Received! ');
    });
    cy.get('p', { timeout: 10000 }).should(($p) => {
      expect($p[1].textContent).equal(
        'Your endorsement on the following petition has been saved:'
      );
    });
    cy.get('p', { timeout: 10000 }).should(($p) => {
      expect($p[2].textContent).equal(' Title example ');
    });
  });
});
