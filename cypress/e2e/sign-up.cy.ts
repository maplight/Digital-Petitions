describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('/auth/sign-up');
  });

  it('should show sign-up form when then "/auth/sign-up" route is visited', () => {
    cy.get('h4').should(($h4) => {
      expect($h4[0].textContent).equal('Create an account');
    });
  });

  it('should show nine mat-error when the form is submitted and it is invalid', () => {
    cy.get('button').should(($button) => {
      $button[2].click();
    });
    cy.get('mat-error').should('have.length', '9');
  });

  it('should show confirmation code form when the sign-up process finished successfully', () => {
    cy.intercept('https://cognito-idp.us-east-1.amazonaws.com/', (req: any) => {
      console.log(req);
      req.reply({ fixture: 'sign-up-response.json' });
    });
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
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'email@test.com'
    );
    cy.get('input[formcontrolname="password"]', { timeout: 10000 }).type(
      'Password'
    );
    cy.get('input[formcontrolname="cpassword"]', { timeout: 10000 }).type(
      'Password'
    );
    cy.get('input[formcontrolname="city"]', { timeout: 10000 }).type('City');
    cy.get('mat-select[formcontrolname="state"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-1"]', { timeout: 10000 }).click();
    cy.get('button').should(($button) => {
      $button[2].click();
    });
    cy.get('h4').should(($h4) => {
      expect($h4[0].textContent).equal('Confirm your account');
    });
  });

  it('should show loading bar when the view is waiting for API response', () => {
    cy.intercept('https://cognito-idp.us-east-1.amazonaws.com/', (req: any) => {
      console.log(req);
      req.reply({ fixture: 'sign-up-response.json' });
    });
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
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'email@test.com'
    );
    cy.get('input[formcontrolname="password"]', { timeout: 10000 }).type(
      'Password'
    );
    cy.get('input[formcontrolname="cpassword"]', { timeout: 10000 }).type(
      'Password'
    );
    cy.get('input[formcontrolname="city"]', { timeout: 10000 }).type('City');
    cy.get('mat-select[formcontrolname="state"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-1"]', { timeout: 10000 }).click();
    cy.get('button').should(($button) => {
      $button[2].click();
    });
    cy.get('dp-loading-bar').should('have.length', '1');
  });

  it('should show error message when response received contain an error (sign-up view)', () => {
    cy.intercept('https://cognito-idp.us-east-1.amazonaws.com/', (req: any) => {
      console.log(req);
      req.reply({ fixture: 'sign-up-error.json', statusCode: 400 });
    });
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
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'email@test.com'
    );
    cy.get('input[formcontrolname="password"]', { timeout: 10000 }).type(
      'Password'
    );
    cy.get('input[formcontrolname="cpassword"]', { timeout: 10000 }).type(
      'Password'
    );
    cy.get('input[formcontrolname="city"]', { timeout: 10000 }).type('City');
    cy.get('mat-select[formcontrolname="state"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-1"]', { timeout: 10000 }).click();
    cy.get('button').should(($button) => {
      $button[2].click();
    });
    cy.get('dp-error-msg').should('have.length', '1');
  });

  it('should show confirmation code form when the sign-up process finished successfully', () => {
    cy.intercept('https://cognito-idp.us-east-1.amazonaws.com/', (req: any) => {
      console.log(req);
      req.reply({ statusCode: 200 });
    });
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
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'email@test.com'
    );
    cy.get('input[formcontrolname="password"]', { timeout: 10000 }).type(
      'Password'
    );
    cy.get('input[formcontrolname="cpassword"]', { timeout: 10000 }).type(
      'Password'
    );
    cy.get('input[formcontrolname="city"]', { timeout: 10000 }).type('City');
    cy.get('mat-select[formcontrolname="state"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-1"]', { timeout: 10000 }).click();
    cy.get('button').should(($button) => {
      $button[2].click();
    });
    cy.get('p').should(($p) => {
      $p[2].click();
    });
    cy.get('p').should(($p) => {
      expect($p[0].textContent).equal(
        ' A new code has been sent to your email '
      );
    });
  });

  it('should show error message when response received contain an error (confirm code view)', () => {
    cy.intercept('https://cognito-idp.us-east-1.amazonaws.com/', (req: any) => {
      console.log(req);
      req.reply({ statusCode: 200 });
    });
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
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'email@test.com'
    );
    cy.get('input[formcontrolname="password"]', { timeout: 10000 }).type(
      'Password'
    );
    cy.get('input[formcontrolname="cpassword"]', { timeout: 10000 }).type(
      'Password'
    );
    cy.get('input[formcontrolname="city"]', { timeout: 10000 }).type('City');
    cy.get('mat-select[formcontrolname="state"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-1"]', { timeout: 10000 }).click();
    cy.get('button').should(($button) => {
      $button[2].click();
    });
    cy.get('input[formcontrolname="code"]', { timeout: 10000 }).type('123');
    cy.get('button').should(($p) => {
      $p[0].click();
    });
    cy.get('dp-error-msg').should('have.length', '1');
  });

  it('should show one mat-error element when the form is submitted and it is invalid', () => {
    cy.intercept('https://cognito-idp.us-east-1.amazonaws.com/', (req: any) => {
      console.log(req);
      req.reply({ statusCode: 200 });
    });
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
    cy.get('input[formcontrolname="email"]', { timeout: 10000 }).type(
      'email@test.com'
    );
    cy.get('input[formcontrolname="password"]', { timeout: 10000 }).type(
      'Password'
    );
    cy.get('input[formcontrolname="cpassword"]', { timeout: 10000 }).type(
      'Password'
    );
    cy.get('input[formcontrolname="city"]', { timeout: 10000 }).type('City');
    cy.get('mat-select[formcontrolname="state"]', { timeout: 10000 }).click();
    cy.get('mat-option[id="mat-option-1"]', { timeout: 10000 }).click();
    cy.get('button').should(($button) => {
      $button[2].click();
    });
    cy.wait(1000);
    cy.get('button').should(($button) => {
      $button[0].click();
    });
    cy.get('mat-error').should('have.length', '1');
  });
});
