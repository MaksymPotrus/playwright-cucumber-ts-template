import {When, Then, Given} from '@cucumber/cucumber';

import {fixture} from "../../hooks/pageFixture";
import {TIMEOUTS} from "../../../fixtures/constants";
import {InventoryPage} from "../../pages/inventoryPage";
import {LoginPage} from "../../pages/loginPage";

let inventoryPage;
let loginPage;

Given('user successfully login in', {timeout: TIMEOUTS.big}, async () => {
    inventoryPage = InventoryPage(fixture.page);
    loginPage = LoginPage(fixture.page)
    await loginPage.login();
});

When('user change sort option to {string}', {timeout: TIMEOUTS.big}, async (sort_option) => {
    await inventoryPage.changeSortOption({option: sort_option});
});

Then('system shows sorted table by {string} option', {timeout: TIMEOUTS.big}, async (sort_option) => {
    await inventoryPage.verifyThatTableSortedSuccessfully({option: sort_option});
});