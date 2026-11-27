import { test, expect } from '@playwright/test';

test('static story is rendered when WebGL is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (contextId: string, ...args: unknown[]) {
      if (contextId === 'webgl' || contextId === 'webgl2' || contextId === 'experimental-webgl') return null;
      return original.call(this, contextId, ...args as []);
    };
  });
  await page.goto('/');
  await expect(page.locator('.static-story')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Halo H1' })).toBeVisible();
});
