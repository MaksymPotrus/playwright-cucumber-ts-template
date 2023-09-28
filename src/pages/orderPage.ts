import {expect, Page} from "@playwright/test";

export const OrderPage = (page: Page) => {
    return {
        inventoryItemName: () => page.locator('.inventory_item_name'),
        inventoryItemDesc: () => page.locator('.inventory_item_desc'),
        inventoryItemPrice: () => page.locator('.inventory_item_price'),
        checkoutButton: () => page.locator('#checkout'),
        firstNameField:() => page.locator('#first-name'),
        lastNameField:() => page.locator('#last-name'),
        postalCodeField:() => page.locator('#postal-code'),
        continueButton:() => page.locator('#continue'),
        finishButton:() => page.locator('#finish'),
        checkoutCompleteContainer:() => page.locator('#checkout_complete_container'),

        async verifyDataOnTheBasketPage(){
            await expect(this.inventoryItemName()).toContainText('Sauce Labs Backpack')
            await expect(this.inventoryItemDesc()).toContainText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.')
            await expect(this.inventoryItemPrice()).toContainText('29.99')
        },

        async makeCheckout(){
            await this.checkoutButton().click()
        },

        async enterUserInformation({firstName, lastName, postalCode}: {firstName:string, lastName:string, postalCode:string}){
            await this.firstNameField().type(firstName)
            await this.lastNameField().type(lastName)
            await this.postalCodeField().type(postalCode)
        },

        async finishOrder(){
            await this.continueButton().click()
            await this.finishButton().click()
        },

        async successfulOrderMessage(){
            await expect(this.checkoutCompleteContainer()).toContainText('Thank you for your order!')
            await expect(this.checkoutCompleteContainer()).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
        }
    };
};
