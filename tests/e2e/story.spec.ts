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


test('chapter navigation exposes the current section', async ({ page }) => {
  await page.goto('/');
  const navigation = page.getByRole('navigation', { name: /story chapters/i });
  await expect(navigation).toBeVisible();
  await expect(navigation.locator('[aria-current="true"]')).toHaveCount(1);
});

test('product details are reachable from the final chapter CTA', async ({ page }) => {
  await page.goto('/#buy');
  await expect(page.getByRole('heading', { name: /your sound/i })).toBeAttached();
  await expect(page.getByRole('link', { name: /explore product details/i })).toHaveAttribute('href', '#details');
});
