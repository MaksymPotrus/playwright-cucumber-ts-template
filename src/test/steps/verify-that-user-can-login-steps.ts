import { Given, When, Then } from '@cucumber/cucumber';

import {fixture} from "../../hooks/pageFixture";
import {TIMEOUTS} from "../../../fixtures/constants";
import {LoginPage} from "../../pages/loginPage";

let loginPage;

Given('user on the login page', {timeout: TIMEOUTS.big}, async () => {
    loginPage = LoginPage(fixture.page);
    await loginPage.navigateToTheLoginPage();
});

When('user enters correct {string} and password', {timeout: TIMEOUTS.big}, async (username) => {
    await loginPage.enterUsernameAndPassword({username});
});

When('user clicks on the login button', {timeout: TIMEOUTS.big}, async () => {
    await loginPage.clickOnTheLoginButton();
});

Then('user sees the state of his account with {string}', {timeout: TIMEOUTS.big}, async (username) => {
    await loginPage.verifyThatUserSuccessfullyLongedIn({username});
});
