import { expect, test } from '@playwright/test';

test('finish comparison shows the active finish and allows choosing an alternative', async ({ page }) => {
  await page.goto('/');
  await page.locator('#details').scrollIntoViewIfNeeded();
  const selector = page.getByLabel('Compare against');
  await expect(selector).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Compare the colours.' })).toBeVisible();
  await selector.selectOption('ice');
  await expect(page.locator('.comparison-grid')).toContainText('Ice');
  await expect(page.locator('.comparison-grid')).toContainText('Graphite');
});
