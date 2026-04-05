import { test, expect } from '@playwright/test';

test.describe('Shaadi Sajao - Wedding Planning Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3002');
  });

  test('should display wedding dashboard', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const dashboard = page.locator('[data-testid="wedding-dashboard"]');
    await expect(dashboard).toBeVisible();
  });

  test('should show wedding countdown', async ({ page }) => {
    const countdown = page.locator('[data-testid="wedding-countdown"]');
    await expect(countdown).toBeVisible();

    const timer = page.locator('[data-testid="countdown-timer"]');
    await expect(timer).toBeVisible();
  });

  test('should display Varmala package options', async ({ page }) => {
    await page.goto('http://localhost:3002/packages');
    await page.waitForLoadState('networkidle');

    const rokaPackage = page.locator('[data-testid="package-Roka"]');
    const sangeetPackage = page.locator('[data-testid="package-Sangeet"]');
    const saatPhere = page.locator('[data-testid="package-SaatPhere"]');

    await expect(rokaPackage).toBeVisible();
    await expect(sangeetPackage).toBeVisible();
    await expect(saatPhere).toBeVisible();
  });

  test('should browse vendors by category', async ({ page }) => {
    await page.goto('http://localhost:3002/vendors');
    await page.waitForLoadState('networkidle');

    const categoryFilter = page.locator('[data-testid="vendor-category-filter"]');
    await expect(categoryFilter).toBeVisible();

    const venueOption = categoryFilter.locator('button:has-text("Venue")');
    await venueOption.click();

    const vendorCards = page.locator('[data-testid="vendor-card"]');
    const count = await vendorCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should view vendor details', async ({ page }) => {
    await page.goto('http://localhost:3002/vendors');
    await page.waitForLoadState('networkidle');

    const firstVendor = page.locator('[data-testid="vendor-card"]').first();
    await firstVendor.click();

    const vendorDetail = page.locator('[data-testid="vendor-detail"]');
    await expect(vendorDetail).toBeVisible({ timeout: 5000 });

    const rating = page.locator('[data-testid="vendor-rating"]');
    await expect(rating).toBeVisible();
  });

  test('should access wedding stylist', async ({ page }) => {
    await page.goto('http://localhost:3002/stylist');
    await page.waitForLoadState('networkidle');

    const stylistForm = page.locator('[data-testid="stylist-form"]');
    await expect(stylistForm).toBeVisible();

    const skinToneSelect = page.locator('[data-testid="skin-tone-select"]');
    await expect(skinToneSelect).toBeVisible();
  });

  test('should get styling recommendations', async ({ page }) => {
    await page.goto('http://localhost:3002/stylist');
    await page.waitForLoadState('networkidle');

    const skinToneSelect = page.locator('[data-testid="skin-tone-select"]');
    await skinToneSelect.selectOption('fair');

    const submitButton = page.locator('[data-testid="get-recommendations"]');
    await submitButton.click();

    const recommendations = page.locator('[data-testid="styling-recommendations"]');
    await expect(recommendations).toBeVisible({ timeout: 5000 });
  });

  test('should track budget', async ({ page }) => {
    await page.goto('http://localhost:3002/budget');
    await page.waitForLoadState('networkidle');

    const budgetTracker = page.locator('[data-testid="budget-tracker"]');
    await expect(budgetTracker).toBeVisible();

    const allocations = page.locator('[data-testid="budget-category"]');
    const count = await allocations.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should add expenses to budget', async ({ page }) => {
    await page.goto('http://localhost:3002/budget');
    await page.waitForLoadState('networkidle');

    const addButton = page.locator('[data-testid="add-expense"]');
    await addButton.click();

    const categoryInput = page.locator('[data-testid="expense-category"]');
    const amountInput = page.locator('[data-testid="expense-amount"]');

    await categoryInput.selectOption('venue');
    await amountInput.fill('50000');

    const submitButton = page.locator('[data-testid="submit-expense"]');
    await submitButton.click();

    const notification = page.locator('[data-testid="success-notification"]');
    await expect(notification).toBeVisible({ timeout: 5000 });
  });

  test('should display budget alerts', async ({ page }) => {
    await page.goto('http://localhost:3002/budget');
    await page.waitForLoadState('networkidle');

    // Add large expense to trigger alert
    const addButton = page.locator('[data-testid="add-expense"]');
    await addButton.click();

    const categoryInput = page.locator('[data-testid="expense-category"]');
    const amountInput = page.locator('[data-testid="expense-amount"]');

    await categoryInput.selectOption('venue');
    await amountInput.fill('900000');

    const submitButton = page.locator('[data-testid="submit-expense"]');
    await submitButton.click();

    await page.waitForTimeout(1000);

    const alert = page.locator('[data-testid="budget-alert"]');
    const isVisible = await alert.isVisible().catch(() => false);
    expect(isVisible).toBe(true);
  });

  test('should show guest list', async ({ page }) => {
    await page.goto('http://localhost:3002/guest-list');
    await page.waitForLoadState('networkidle');

    const guestListPanel = page.locator('[data-testid="guest-list-panel"]');
    await expect(guestListPanel).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3002');
    await page.waitForLoadState('networkidle');

    const mobileNav = page.locator('[data-testid="mobile-bottom-nav"]');
    await expect(mobileNav).toBeVisible();
  });

  test('should have functional navigation', async ({ page }) => {
    const vendorsLink = page.locator('[data-testid="nav-vendors"]');
    const budgetLink = page.locator('[data-testid="nav-budget"]');

    await vendorsLink.click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('vendors');

    await budgetLink.click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('budget');
  });
});
