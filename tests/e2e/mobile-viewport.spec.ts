import { test, expect } from '@playwright/test';

test('mobile viewport keeps the story readable and finish controls available', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
  await expect(page.getByRole('button', { name: /graphite|sand|ice/i }).first()).toBeAttached();
  await page.locator('#details').scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: /frequently asked questions/i })).toBeVisible();
});
