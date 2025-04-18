import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    timeout: 30 * 1000,
    expect: {
        timeout: 5000,
        toHaveScreenshot: { maxDiffPixelRatio: 0.05 },
    },
    use: {
        baseURL: 'http://localhost:3000',
        // Capture screenshots of the full page by default
        screenshot: 'on'
    },
    projects: [
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 15 Pro'] },
        },
        {
            name: 'Desktop Chrome',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Desktop Firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'Desktop Safari',
            use: { ...devices['Desktop Safari'] },
        },
        {
            name: 'Widescreen',
            use: {
                viewport: { width: 1920, height: 1080 }
            },
        }
    ],
    webServer: {
        command: 'npm run build && npm run start',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 60 * 1000,
    },
});