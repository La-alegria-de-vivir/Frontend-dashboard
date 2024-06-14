describe('Sign Up and Log In Flow', () => {
    it('should submit the sign up form successfully and log in', () => {
        
        cy.visit('http://localhost:5174/signup'); 
  
        
        cy.get('input[id="username"]').type('textuser4');
        cy.get('input[id="email"]').type('text@example4.com');
        cy.get('input[id="password"]').type('password123');
  
        
        cy.intercept('POST', 'http://localhost:5174/api/auth/signup').as('signupRequest');
  
        
        cy.get('button[type="submit"]').click();
  
        
        cy.wait('@signupRequest', { timeout: 10000 }).then(({ request }) => {
            expect(request.body).to.deep.equal({
                username: 'textuser4',
                email: 'text@example4.com',
                password: 'password123'
            });
        });
  

        cy.url().should('include', '/'); 
  
       
        cy.visit('http://localhost:5174/'); 
  
        cy.get('input[type="email"]').type('text@example4.com');
        cy.get('input[type="password"]').type('password123');
        cy.get('button[type="submit"]').click();
  
        
        cy.wait(2000); 
  
        
        cy.url().should('include', '/dashboard');
    });
});
