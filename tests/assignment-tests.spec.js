const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/');
});

test('assignment test 1', async ({ page }) => {
    let mainInput = page.locator('.main-input');
    await mainInput.fill('What I need to do');
    await mainInput.press('Enter');
    await expect(page.getByText('What I need to do')).toBeVisible();
});

test('assignment test 2', async ({ page }) => {
    let mainInput = page.locator('.main-input');
    await mainInput.fill('What I need to do');
    await mainInput.press('Enter');
    await expect(page.getByText('1 item left')).toBeVisible();
    //Press checkbox
    let checkBox = page.locator('.checkboxes');
    await checkBox.click();
    await expect(page.getByText('0 item left')).toBeVisible();
    //Confirm that it says 0 item left
});

test('assignment test 3', async ({ page }) => {
    let mainInput = page.locator('.main-input');
    await mainInput.fill('Item1');
    await mainInput.press('Enter');

    await mainInput.fill('Item2');
    await mainInput.press('Enter');

    await mainInput.fill('Item3');
    await mainInput.press('Enter');
    let checkBox = page.locator('.checkboxes').nth(2);
    await checkBox.click();
    await expect(page.getByText('2 item left')).toBeVisible();

});