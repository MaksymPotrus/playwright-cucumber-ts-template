import {expect, Page} from "@playwright/test";

export const InventoryPage = (page: Page) => {
    return {
        sortContainer:() => page.locator('.product_sort_container'),
        productName:() => page.$$('.inventory_item_name'),
        productPrice:() => page.$$('.inventory_item_price'),
        shoppingCardIcon: () => page.locator('#shopping_cart_container'),

        async changeSortOption({option}:{option:string}){
            await this.sortContainer().selectOption(option);
        },

        async verifyThatTableSortedSuccessfully({option}:{option:string}){
            let arrayOfTableElements = []
            let tableElements
            let isSorted
            if(option.includes('Name')) {
                tableElements = this.productName()
                for (const tableElement of tableElements) {
                    arrayOfTableElements.push(await tableElement.textContent());
                }
                isSorted = arrayOfTableElements.every((value, index, array) => {
                    if (index === 0) {
                        return true;
                    }
                    return value >= array[index - 1];
                });
            }else{
                tableElements = this.productPrice()
                for (const tableElement of tableElements) {
                    arrayOfTableElements.push(await tableElement.textContent());
                }
                isSorted = arrayOfTableElements.every((price, index, array) => {
                    if (index === 0) return true;
                    return price >= array[index - 1];
                });
            }
            if (isSorted) {
                console.log(`Elements are sorted by ${option}.`);
            } else {
                console.error('Elements are not sorted by ${option}.');
            }
        },

        async selectProductByName({productName}:{productName:string}){
            const products = await page.$$eval('.inventory_item_name', (names) =>
                names.map((name) => {
                    return {
                        name: name.textContent.trim(),
                        addToCartButton: (name.closest('.inventory_item') as HTMLElement).querySelector('.btn_inventory').getAttribute('name')
                    }
                })
            );
            const product = products.find(product => product.name === productName);
            if (product) {
                await page.click(`button[name="${product.addToCartButton}"]`);
            } else {
                console.log(`Product with name "${productName}" not found.`);
            }
            await expect(this.shoppingCardIcon()).toContainText('1')
        },

        async navigateToTheBasketPage(){
            await this.shoppingCardIcon().click()
        },
    };
};
