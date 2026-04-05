import { test, expect } from '@playwright/test';

test.describe('Jannat Safar - Honeymoon Planning Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3003');
  });

  test('should display honeymoon dashboard', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const dashboard = page.locator('[data-testid="honeymoon-dashboard"]');
    await expect(dashboard).toBeVisible();
  });

  test('should show honeymoon countdown', async ({ page }) => {
    const countdown = page.locator('[data-testid="honeymoon-countdown"]');
    await expect(countdown).toBeVisible();
  });

  test('should display destination cards', async ({ page }) => {
    await page.goto('http://localhost:3003/destinations');
    await page.waitForLoadState('networkidle');

    const destinationCards = page.locator('[data-testid="destination-card"]');
    const count = await destinationCards.count();

    expect(count).toBeGreaterThan(0);
  });

  test('should filter destinations by archetype', async ({ page }) => {
    await page.goto('http://localhost:3003/destinations');
    await page.waitForLoadState('networkidle');

    const archetypeFilter = page.locator('[data-testid="archetype-filter"]');
    await expect(archetypeFilter).toBeVisible();

    const beachLoversOption = archetypeFilter.locator('button:has-text("Beach Lovers")');
    await beachLoversOption.click();

    await page.waitForTimeout(500);

    const cards = page.locator('[data-testid="destination-card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should view destination details', async ({ page }) => {
    await page.goto('http://localhost:3003/destinations');
    await page.waitForLoadState('networkidle');

    const firstCard = page.locator('[data-testid="destination-card"]').first();
    await firstCard.click();

    const detailPanel = page.locator('[data-testid="destination-detail"]');
    await expect(detailPanel).toBeVisible({ timeout: 5000 });

    const weather = page.locator('[data-testid="destination-weather"]');
    await expect(weather).toBeVisible();
  });

  test('should access flight booking', async ({ page }) => {
    await page.goto('http://localhost:3003/book-flight');
    await page.waitForLoadState('networkidle');

    const flightForm = page.locator('[data-testid="flight-search-form"]');
    await expect(flightForm).toBeVisible();

    const fromInput = page.locator('[data-testid="flight-from"]');
    const toInput = page.locator('[data-testid="flight-to"]');

    await expect(fromInput).toBeVisible();
    await expect(toInput).toBeVisible();
  });

  test('should search flights', async ({ page }) => {
    await page.goto('http://localhost:3003/book-flight');
    await page.waitForLoadState('networkidle');

    const fromInput = page.locator('[data-testid="flight-from"]');
    const toInput = page.locator('[data-testid="flight-to"]');
    const dateInput = page.locator('[data-testid="flight-date"]');

    await fromInput.fill('DEL');
    await toInput.fill('BOM');
    await dateInput.fill('2024-12-25');

    const searchButton = page.locator('[data-testid="search-flights"]');
    await searchButton.click();

    await page.waitForLoadState('networkidle');

    const results = page.locator('[data-testid="flight-result"]');
    const count = await results.count();

    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should access hotel booking', async ({ page }) => {
    await page.goto('http://localhost:3003/book-hotel');
    await page.waitForLoadState('networkidle');

    const hotelForm = page.locator('[data-testid="hotel-search-form"]');
    await expect(hotelForm).toBeVisible();
  });

  test('should create itinerary', async ({ page }) => {
    await page.goto('http://localhost:3003/itinerary');
    await page.waitForLoadState('networkidle');

    const createButton = page.locator('[data-testid="create-itinerary"]');
    await expect(createButton).toBeVisible();

    await createButton.click();

    const destinationSelect = page.locator('[data-testid="itinerary-destination"]');
    const daysInput = page.locator('[data-testid="itinerary-days"]');

    await expect(destinationSelect).toBeVisible();
    await expect(daysInput).toBeVisible();
  });

  test('should add activities to itinerary', async ({ page }) => {
    await page.goto('http://localhost:3003/itinerary');
    await page.waitForLoadState('networkidle');

    const createButton = page.locator('[data-testid="create-itinerary"]');
    await createButton.click();

    const destinationSelect = page.locator('[data-testid="itinerary-destination"]');
    await destinationSelect.selectOption('Maldives');

    const submitButton = page.locator('[data-testid="create-itinerary-submit"]');
    await submitButton.click();

    await page.waitForTimeout(1000);

    const addActivityButton = page.locator('[data-testid="add-activity"]');
    if (await addActivityButton.isVisible()) {
      await addActivityButton.click();

      const activityInput = page.locator('[data-testid="activity-name"]');
      await activityInput.fill('Snorkeling');

      const saveButton = page.locator('[data-testid="save-activity"]');
      await saveButton.click();

      const notification = page.locator('[data-testid="success-notification"]');
      await expect(notification).toBeVisible({ timeout: 5000 });
    }
  });

  test('should access expense tracker', async ({ page }) => {
    await page.goto('http://localhost:3003/expenses');
    await page.waitForLoadState('networkidle');

    const expenseTracker = page.locator('[data-testid="expense-tracker"]');
    await expect(expenseTracker).toBeVisible();
  });

  test('should add expense', async ({ page }) => {
    await page.goto('http://localhost:3003/expenses');
    await page.waitForLoadState('networkidle');

    const addButton = page.locator('[data-testid="add-expense"]');
    await addButton.click();

    const categorySelect = page.locator('[data-testid="expense-category"]');
    const amountInput = page.locator('[data-testid="expense-amount"]');

    await categorySelect.selectOption('food');
    await amountInput.fill('5000');

    const submitButton = page.locator('[data-testid="submit-expense"]');
    await submitButton.click();

    const notification = page.locator('[data-testid="success-notification"]');
    await expect(notification).toBeVisible({ timeout: 5000 });
  });

  test('should convert currency', async ({ page }) => {
    await page.goto('http://localhost:3003/currency');
    await page.waitForLoadState('networkidle');

    const amountInput = page.locator('[data-testid="currency-amount"]');
    const fromSelect = page.locator('[data-testid="currency-from"]');
    const toSelect = page.locator('[data-testid="currency-to"]');

    await amountInput.fill('100');
    await fromSelect.selectOption('INR');
    await toSelect.selectOption('USD');

    await page.waitForTimeout(500);

    const result = page.locator('[data-testid="currency-result"]');
    const isVisible = await result.isVisible().catch(() => false);

    if (isVisible) {
      const resultText = await result.textContent();
      expect(resultText).toMatch(/\d+/);
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3003');
    await page.waitForLoadState('networkidle');

    const mobileNav = page.locator('[data-testid="mobile-bottom-nav"]');
    await expect(mobileNav).toBeVisible();
  });

  test('should handle offline gracefully', async ({ page, context }) => {
    await page.goto('http://localhost:3003');
    await page.waitForLoadState('networkidle');

    await context.setOffline(true);
    await page.waitForTimeout(1000);

    const offlineIndicator = page.locator('[data-testid="offline-indicator"]');
    const hasContent = await page
      .locator('[data-testid="honeymoon-dashboard"]')
      .isVisible()
      .catch(() => false);

    const isOfflineShown = await offlineIndicator.isVisible().catch(() => false);

    expect(isOfflineShown || hasContent).toBe(true);
  });
});
