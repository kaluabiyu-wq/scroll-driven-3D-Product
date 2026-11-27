import { expect, test } from '@playwright/test';

test('keyboard chapter shortcut advances the story', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Alt+ArrowRight');
  await expect(page.locator('#design')).toBeInViewport();
});

test('keyboard chapter shortcut does not hijack form controls', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    const input = document.createElement('input');
    input.id = 'shortcut-test-input';
    input.style.position = 'fixed';
    document.body.append(input);
    input.focus();
  });
  await page.keyboard.press('Alt+ArrowRight');
  await expect(page.locator('#intro')).toBeInViewport();
});
