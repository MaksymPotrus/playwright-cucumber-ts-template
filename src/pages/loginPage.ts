import {expect, Page} from "@playwright/test";
import {ENDPOINT_URL} from "../../fixtures/endpoints";

export const LoginPage = (page: Page) => {
    return {
        emailField: () => page.locator('#user-name'),
        passwordField: () => page.locator('#password'),
        loginButton: () => page.locator('#login-button'),
        loginErrorMessage: () => page.locator('[data-test="error"]'),
        appLogo: () => page.locator('.app_logo'),
        title: () => page.locator('.title'),
        shoppingCardIcon: () => page.locator('#shopping_cart_container'),

        async navigateToTheLoginPage(){
            await Promise.all([
                page.waitForNavigation(),
                page.goto(process.env.BASE_URL+ENDPOINT_URL.inventoryPage)
            ]);
            await this.emailField().waitFor({state:"visible"});
            await this.passwordField().waitFor({state:"visible"});
            await this.loginButton().waitFor({state:"visible"});
        },

        async enterUsernameAndPassword({username}:{username:string}){
            await this.emailField().type(username);
            await this.passwordField().type(process.env.PASSWORD);
        },

        async login(){
            await page.goto(process.env.BASE_URL);
            await page.waitForLoadState()
            await this.emailField().waitFor()
            await this.emailField().type(process.env.USERNAME);
            await this.passwordField().type(process.env.PASSWORD);
            await this.loginButton().click();
        },

        async clickOnTheLoginButton(){
            await this.loginButton().click()
        },

        async verifyThatUserSuccessfullyLongedIn({username}:{username:string}){
            if(username==='locked_out_user'){
                await expect(this.loginErrorMessage()).toContainText('Epic sadface: Sorry, this user has been locked out.')
            } else {
                await expect(this.appLogo()).toContainText('Swag Labs');
                await expect(this.title()).toContainText('Products');
                await this.shoppingCardIcon().waitFor({state: "visible"})
            }
        },
    };
};
