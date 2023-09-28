import { When, Then } from '@cucumber/cucumber';

import {fixture} from "../../hooks/pageFixture";
import {TIMEOUTS} from "../../../fixtures/constants";
import {OrderPage} from "../../pages/orderPage";
import {InventoryPage} from "../../pages/inventoryPage";

let orderPage;
let inventoryPage;

When('user clicks on add to card button by {string}', {timeout: TIMEOUTS.big}, async (product_name) => {
    orderPage = OrderPage(fixture.page);
    inventoryPage = InventoryPage(fixture.page);
    await inventoryPage.selectProductByName({productName: product_name});
});

When('user sees correct data on the basket page', {timeout: TIMEOUTS.big}, async () => {
    await inventoryPage.navigateToTheBasketPage();
    await orderPage.verifyDataOnTheBasketPage();
});

Then('user clicks on the checkout button', {timeout: TIMEOUTS.big}, async () => {
    await orderPage.makeCheckout();
});

Then('user enter {string}, {string} and {string}', {timeout: TIMEOUTS.big}, async (first_name, last_name, postal_code) => {
    await orderPage.enterUserInformation({firstName: first_name, lastName: last_name, postalCode: postal_code});
});

Then('user clicks on the finish button', {timeout: TIMEOUTS.big}, async () => {
    await orderPage.finishOrder();
});

Then('user sees a notification of successful order placement', {timeout: TIMEOUTS.big}, async () => {
    await orderPage.successfulOrderMessage();
});