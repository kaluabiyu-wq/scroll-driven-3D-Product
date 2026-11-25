import { test, expect } from '@playwright/test';

test('story renders chapters and product details', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: /frequently asked questions/i })).toBeAttached();
});

test('skip link is keyboard accessible', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: /skip to main content/i })).toBeFocused();
});

test('reduced motion renders the static story', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.static-story')).toBeVisible();
});

test('finish selector exposes accessible choices', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: /graphite|sand|ice/i }).first()).toBeAttached();
});
