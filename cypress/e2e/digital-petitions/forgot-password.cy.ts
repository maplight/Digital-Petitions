describe('Forgot Password', () => {
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
    cy.visit('/auth/forgot-password');
  });

  it('should show the form', () => {
    cy.get('form').should('be.visible');
  });

  it('should show one mat-error element when the form is submitted and it is invalid', () => {
    cy.get('button').should(($button) => {
      $button[0].click();
    });

    cy.get('mat-error').should('have.length', '1');
  });

  it('should show a loading bar when the response is loading', () => {
    cy.intercept(
      'POST',
      'https://cognito-idp.us-east-1.amazonaws.com/',
      (req: any) => {
        req.reply({ statusCode: 200 });
      }
    );
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'test@example.com'
    );
    cy.get('button').should(($button) => {
      $button[0].click();
    });

    cy.get('dp-loading-bar', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(1);
    });
  });

  it('should show an error message when the API response with an error', () => {
    cy.intercept(
      'POST',
      'https://cognito-idp.us-east-1.amazonaws.com/',
      (req: any) => {
        req.reply({ statusCode: 403 });
      }
    );
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'test@example.com'
    );
    cy.get('button').should(($button) => {
      $button[0].click();
    });
    cy.get('dp-error-msg', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(1);
    });
  });

  it('should show "change password" form when the form is submitted and it is valid ', () => {
    cy.intercept(
      'POST',
      'https://cognito-idp.us-east-1.amazonaws.com/',
      (req: any) => {
        req.reply({ statusCode: 200 });
      }
    );
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'test@example.com'
    );
    cy.get('button').should(($button) => {
      $button[0].click();
    });
    cy.get('h4').should(($h4) => {
      expect($h4[0].textContent).equal('Set New Password');
    });
  });

  it('should show three mat-error elements when change password form is submitted and it is invalid', () => {
    cy.intercept(
      'POST',
      'https://cognito-idp.us-east-1.amazonaws.com/',
      (req: any) => {
        req.reply({ statusCode: 200 });
      }
    );
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'test@example.com'
    );
    cy.get('button').should(($button) => {
      $button[0].click();
    });
    cy.get('button').should(($button) => {
      $button[2].click();
    });

    cy.get('mat-error').should('have.length', '3');
  });

  it('should show a loading bar when the response is loading (change password form)', () => {
    cy.intercept(
      'POST',
      'https://cognito-idp.us-east-1.amazonaws.com/',
      (req: any) => {
        req.reply({ statusCode: 200 });
      }
    );
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'test@example.com'
    );
    cy.get('button').should(($button) => {
      $button[0].click();
    });
    cy.get('input[formcontrolname="code"]', { timeout: 10000 }).type('123');
    cy.get('input[formcontrolname="newPassword"]', { timeout: 10000 }).type(
      '123'
    );
    cy.get('input[formcontrolname="confirmPassword"]', { timeout: 10000 }).type(
      '123'
    );
    cy.get('button').should(($button) => {
      $button[2].click();
    });

    cy.get('dp-loading-bar', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(1);
    });
  });

  it('should show an error message when the API response with an error (change password form)', () => {
    cy.intercept(
      'POST',
      'https://cognito-idp.us-east-1.amazonaws.com/',
      (req: any) => {
        req.reply({ statusCode: 200 });
      }
    );
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'test@example.com'
    );
    cy.get('button').should(($button) => {
      $button[0].click();
    });
    cy.get('input[formcontrolname="code"]', { timeout: 10000 }).type('123');
    cy.get('input[formcontrolname="newPassword"]', { timeout: 10000 }).type(
      '123'
    );
    cy.get('input[formcontrolname="confirmPassword"]', { timeout: 10000 }).type(
      '123'
    );
    cy.intercept(
      'POST',
      'https://cognito-idp.us-east-1.amazonaws.com/',
      (req: any) => {
        req.reply({ statusCode: 403 });
      }
    );
    cy.get('button').should(($button) => {
      $button[2].click();
    });

    cy.get('dp-loading-bar', { timeout: 10000 }).should(($element) => {
      expect($element).to.have.length(1);
    });
  });

  it('should show "successful reset" view when the form is submitted and it is valid (change password form)', () => {
    cy.intercept(
      'POST',
      'https://cognito-idp.us-east-1.amazonaws.com/',
      (req: any) => {
        req.reply({ statusCode: 200 });
      }
    );
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'test@example.com'
    );
    cy.get('button').should(($button) => {
      $button[0].click();
    });
    cy.get('input[formcontrolname="code"]', { timeout: 10000 }).type('123');
    cy.get('input[formcontrolname="newPassword"]', { timeout: 10000 }).type(
      '123'
    );
    cy.get('input[formcontrolname="confirmPassword"]', { timeout: 10000 }).type(
      '123'
    );

    cy.get('button').should(($button) => {
      $button[2].click();
    });
    cy.get('h4').should(($h4) => {
      expect($h4[0].textContent).equal('Password Reset');
    });
  });
});
