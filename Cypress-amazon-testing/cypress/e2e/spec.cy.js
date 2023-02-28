

{/* <reference types="cypress" /> */}

describe("Amazon app testing",()=>{
    beforeEach(()=>{
        cy.visit("https://www.amazon.in/")
    });

    it("Testing login button",()=>{
        cy.get("#nav-link-accountList").click()
        cy.url().should('contain','https://www.amazon.in/ap/signin')
    });

    it("Wrong email",()=>{
      cy.get("#nav-link-accountList").click()
      cy.url().should('contain','https://www.amazon.in/ap/signin')
      cy.get('#ap_email').type('deathracer384@gmail.com')
      cy.get("#continue").as('continue').click()
      cy.get('#auth-error-message-box')
    });

    it("Search bar working",()=>{
      cy.get('#twotabsearchtextbox').type('mobile phones')
      cy.get('#nav-search-submit-button').click()
      cy.get('[data-cel-widget="search_result_1"] > .s-widget-container > .rush-component > .a-section > .s-no-outline > .a-size-medium-plus')
    });

    it("Product not found",()=>{
      cy.get('#twotabsearchtextbox').type('gjfsfvjsdasda')
      cy.get('#nav-search-submit-button').click()
      cy.get('.s-no-outline > :nth-child(1) > :nth-child(1)').should('contain.text','No results for')
      // cy.get('.a-size-base').should('contain.text','Try checking your spelling')
    });

    it("Adding product to cart",()=>{
      cy.visit('https://www.amazon.in/Redmi-9A-Sport-Octa-core-Processor/dp/B09GFLXVH9/ref=sr_1_3?crid=24GEX0N50VYX7&keywords=mobile+phones&qid=1677562223&sprefix=%2Caps%2C679&sr=8-3');
      cy.get('#add-to-cart-button').click();
      cy.visit('https://www.amazon.in/OnePlus-Nord-Lite-128GB-Storage/dp/B09WQYFLRX/?_encoding=UTF8&pf_rd_p=41a33d60-2d34-418b-adcc-9bd9f71b8272&pd_rd_wg=wdj7w&pf_rd_r=MKT2FCE198Q125PGF5YQ&content-id=amzn1.sym.41a33d60-2d34-418b-adcc-9bd9f71b8272&pd_rd_w=UAoSl&pd_rd_r=cddf7a89-e69b-470f-83b8-0f93cc5f6392&ref_=pd_gwm_unk')
      cy.get('#add-to-cart-button').click();
      cy.visit("https://www.amazon.in/");
      cy.get('#nav-cart-count').click();
      cy.get('.a-truncate-cut').should('contain.text',"Redmi 9A");
    });

    it('login',()=>{
      cy.get("#nav-link-accountList").click()
      cy.url().should('contain','https://www.amazon.in/ap/signin')
      cy.get('#ap_email').type('+91number');
      cy.get('.a-button-inner > #continue').click();
      cy.get('#ap_password').type('password');
      cy.get('#signInSubmit').click();
      cy.get('#nav-link-accountList-nav-line-1').should('have.text','Hello, Vivek');
    });

    it('logout',()=>{
      cy.get("#nav-link-accountList").click()
      cy.url().should('contain','https://www.amazon.in/ap/signin')
      cy.get('#ap_email').type('+91number');
      cy.get('.a-button-inner > #continue').click();
      cy.get('#ap_password').type('password');
      cy.get('#signInSubmit').click();
      cy.get('#nav-link-accountList-nav-line-1').should('have.text','Hello, Vivek');
      cy.get('#nav-link-accountList > .nav-line-2 > .nav-icon').trigger('mouseover');
      cy.get('#nav-item-signout').click();
      cy.url().should('contain','https://www.amazon.in/ap/signin')

    });

    it('checkout',()=>{
      cy.get("#nav-link-accountList").click()
      cy.url().should('contain','https://www.amazon.in/ap/signin')
      cy.get('#ap_email').type('+91number');
      cy.get('.a-button-inner > #continue').click();
      cy.clock();
      cy.tick(1000);
      cy.get('#ap_password').type('password');
      cy.get('#signInSubmit').click();
      cy.get('#twotabsearchtextbox').type('mobile phones')
      cy.get('#nav-search-submit-button').click()
      cy.get('.rush-component > .a-row').click();
      cy.get('#add-to-cart-button').click();
      cy.clock();
      cy.tick(1000);
      cy.visit("https://www.amazon.in/");
      cy.get('#nav-cart-count').click();
      cy.get('#sc-buy-box-ptc-button > .a-button-inner > .a-button-input').click();
      cy.url().should('contain','/buy/addressselect')
    })
})