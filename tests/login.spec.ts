import { test, expect } from '@playwright/test';
import { chromium } from '@playwright/test';

test('Email required and password not required', async ({ page }) => {
    await page.goto('http://localhost:3002/auth/login');
    await page.fill('input[name="email"]', "");
    await page.fill('input[name="password"]', '123456789');
    await page.click('button[id="submit-login"]');

    const alertMessages = page.locator('.MuiAlert-message');
    expect(alertMessages).toContainText(['Email đang để trống']);
    await page.screenshot({ path: './tests/screenshots/login/screenshot_required_email.png', fullPage: true });
});

test('Password required and email not required', async ({ page }) => {
    await page.goto('http://localhost:3002/auth/login');
    await page.fill('input[name="email"]', 'ahihi12334@gmail.com');
    await page.fill('input[name="password"]', '');
    await page.click('button[id="submit-login"]');

    const alertMessages = page.locator('.MuiAlert-message');
    expect(alertMessages).toContainText(['Mật khẩu đang để trống']);
    await page.screenshot({ path: './tests/screenshots/login/screenshot_required_password.png', fullPage: true });
});

test('Password required and email required', async ({ page }) => {
    await page.goto('http://localhost:3002/auth/login');
    await page.fill('input[name="email"]', '');
    await page.fill('input[name="password"]', '');
    await page.click('button[id="submit-login"]');

    const alertMessages = page.locator('.MuiAlert-message');
    expect(alertMessages).toContainText(['Email đang để trống', 'Mật khẩu đang để trống']);
    await page.screenshot({ path: './tests/screenshots/login/screenshot_password_and_email_required.png', fullPage: true });
});

test('Email is longer than 255 or less than 8 characters and valid password', async ({ page }) => {
    await page.goto('http://localhost:3002/auth/login');
    await page.fill('input[name="email"]', 'abcccccsfaaaaaaaaagttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@gmail.com');
    await page.fill('input[name="password"]', '123456789');
    await page.click('button[id="submit-login"]');
    
    const alertMessages = page.locator('.MuiAlert-message');
    expect(alertMessages).toContainText(['Email phải từ 8 đến 255 ký tự']);
    await page.screenshot({ path: './tests/screenshots/login/screenshot_email_too_long.png', fullPage: true });
});

test('Password is longer than 50 or less than 8 characters and valid email', async ({ page }) => {
    await page.goto('http://localhost:3002/auth/login');
    await page.fill('input[name="email"]', 'ahihi@gmail.com');
    await page.fill('input[name="password"]', '123456789agfdahgafgafahgfahfgssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssahfg');
    await page.click('button[id="submit-login"]');

    const alertMessages = page.locator('.MuiAlert-message');
    expect(alertMessages).toContainText(['Mật khẩu phải từ 8 đến 50 ký tự']);
    await page.screenshot({ path: './tests/screenshots/login/screenshot_password_too_long.png', fullPage: true });
});

test('Invalid email and valid password', async ({ page }) => {
    await page.goto('http://localhost:3002/auth/login');
    await page.fill('input[name="email"]', 'ahihitoidangtest');
    await page.fill('input[name="password"]', '123456789afff');
    await page.click('button[id="submit-login"]');

    const alertMessages = page.locator('.MuiAlert-message');
    expect(alertMessages).toContainText(['Định dạng email sai']);
    await page.screenshot({ path: './tests/screenshots/login/screenshot_email_invalid.png', fullPage: true });
});

test('Wrong email or wrong password', async ({ page }) => {
    await page.goto('http://localhost:3002/auth/login');
    await page.fill('input[name="email"]', 'ahihitoidangtestclgt@gmail.com');
    await page.fill('input[name="password"]', '123456789afff$dhdh5');
    await page.click('button[id="submit-login"]');
    await page.waitForResponse('http://user_service.local/api/login');

    const alertMessages = page.locator('.MuiAlert-message');
    expect(alertMessages).toContainText(['Sai email hoặc mật khẩu!']);
    await page.screenshot({ path: './tests/screenshots/login/screenshot_email_wrong_or_password_wrong.png', fullPage: true });
});

test('Macth email and password and logout success', async ({ page }) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    await page.goto('http://localhost:3002/auth/login');
    await page.fill('input[name="email"]', 'ahihi@gmail.com');
    await page.fill('input[name="password"]', '12345678');
    await page.click('button[id="submit-login"]');
    await page.waitForResponse('http://user_service.local/api/login');
    await page.waitForURL("http://localhost:3002", {timeout: 60000 , waitUntil:"domcontentloaded"});
    await page.screenshot({ path: './tests/screenshots/login/screenshot_email_wrong_or_password_wrong.png', fullPage: true });

    await page.click('button[id="long-button-show-right-header-dropdown"]');
    await page.click('li[id="button-logout"]');
    const responsePromise = await page.waitForResponse('http://user_service.local/api/logout');
    expect(responsePromise.ok()).toBe(true);

    await context.close();
    await browser.close();
    await page.close();
});
