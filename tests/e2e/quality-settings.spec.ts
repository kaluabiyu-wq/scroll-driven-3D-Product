import { expect, test } from '@playwright/test';

test('visitor can select and persist a 3D quality preference', async ({ page }) => {
  await page.goto('/');
  const quality = page.getByRole('group', { name: '3D graphics quality' });
  await expect(quality).toBeVisible();
  await quality.getByRole('button', { name: 'Low' }).click();
  await expect(quality.getByRole('button', { name: 'Low' })).toHaveAttribute('aria-pressed', 'true');
  await expect(quality.getByText('Rendering: low')).toBeVisible();
  await page.reload();
  await expect(page.getByRole('group', { name: '3D graphics quality' }).getByRole('button', { name: 'Low' }))
    .toHaveAttribute('aria-pressed', 'true');
});
