import { test, expect } from '@playwright/test';

test('story can be traversed from the first chapter to the final details', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
  await page.locator('#buy').scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: /your sound\. your finish/i })).toBeVisible();
  await page.locator('#details').scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: /frequently asked questions/i })).toBeVisible();
});
