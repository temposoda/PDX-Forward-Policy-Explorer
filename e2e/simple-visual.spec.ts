import { test, expect } from '@playwright/test';

test('capture screenshots of all important pages', async ({ page }) => {
    // Define the routes you want to capture
    const routes = [
        { path: '/', name: 'home' },
        { path: '/policy/homeshare-expansion', name: 'policy-detail' },
        // Add more routes as needed
    ];

    // Visit each route and take a screenshot
    for (const route of routes) {
        // Navigate to the route
        await page.goto(route.path);

        // Wait for content to load
        await page.waitForSelector('h1');

        // Take a screenshot of the entire page
        await expect(page).toHaveScreenshot(`${route.name}-screenshot.png`, {
            fullPage: true
        });
    }
});

// You can also add tests for different UI states
test('capture screenshots with filters applied', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('input[placeholder="Search policies..."]');
    await page.fill('input[placeholder="Search policies..."]', 'housing');
    await page.waitForURL(/.*\?q=housing/);
    await expect(page).toHaveScreenshot('single-filtered-results-screenshot.png', {
        fullPage: true
    });
});

test('capture multi-filter state', async ({ page }) => {
    await page.goto('/?domains=safety,social-services&domainMode=ANY&cost=substantial&impact=needs_revenue&q=viol');
    await page.waitForSelector('input[placeholder="Search policies..."]');
    await expect(page).toHaveScreenshot('multi-filtered-results-screenshot.png', {
        fullPage: true
    });
});