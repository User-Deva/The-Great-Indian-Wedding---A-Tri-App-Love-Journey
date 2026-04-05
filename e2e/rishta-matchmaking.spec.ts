import { test, expect } from '@playwright/test';

test.describe('Rishta - Matchmaking Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001');
  });

  test('should display matching dashboard', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const dashboard = await page.locator('[data-testid="matchmaking-dashboard"]');
    await expect(dashboard).toBeVisible();
  });

  test('should allow browsing matches', async ({ page }) => {
    await page.goto('http://localhost:3001/matches');
    await page.waitForLoadState('networkidle');

    const matchCards = page.locator('[data-testid="match-card"]');
    const count = await matchCards.count();

    expect(count).toBeGreaterThan(0);
  });

  test('should display compatibility score', async ({ page }) => {
    await page.goto('http://localhost:3001/matches');
    await page.waitForLoadState('networkidle');

    const score = page.locator('[data-testid="compatibility-score"]').first();
    await expect(score).toBeVisible();

    const scoreText = await score.textContent();
    expect(scoreText).toMatch(/\d+%/);
  });

  test('should allow expressing interest', async ({ page }) => {
    await page.goto('http://localhost:3001/matches');
    await page.waitForLoadState('networkidle');

    const interestButton = page.locator('[data-testid="express-interest-button"]').first();
    await expect(interestButton).toBeVisible();

    await interestButton.click();

    const notification = page.locator('[data-testid="success-notification"]');
    await expect(notification).toBeVisible({ timeout: 5000 });
  });

  test('should show personality quiz', async ({ page }) => {
    await page.goto('http://localhost:3001/personality-quiz');
    await page.waitForLoadState('networkidle');

    const quizTitle = page.locator('[data-testid="quiz-title"]');
    await expect(quizTitle).toBeVisible();

    const questions = page.locator('[data-testid="quiz-question"]');
    const count = await questions.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should complete personality quiz', async ({ page }) => {
    await page.goto('http://localhost:3001/personality-quiz');
    await page.waitForLoadState('networkidle');

    // Answer all 20 questions
    const options = page.locator('[data-testid="quiz-option"]');
    const optionCount = await options.count();

    for (let i = 0; i < Math.min(20, optionCount); i++) {
      const option = options.nth(i);
      await option.click();
      await page.waitForTimeout(100);
    }

    const submitButton = page.locator('[data-testid="submit-quiz-button"]');
    if (await submitButton.isVisible()) {
      await submitButton.click();

      const resultPage = page.locator('[data-testid="personality-result"]');
      await expect(resultPage).toBeVisible({ timeout: 5000 });
    }
  });

  test('should suggest date venues', async ({ page }) => {
    await page.goto('http://localhost:3001/date-venues');
    await page.waitForLoadState('networkidle');

    const venueCards = page.locator('[data-testid="venue-card"]');
    const count = await venueCards.count();

    expect(count).toBeGreaterThan(0);
  });

  test('should display venue details', async ({ page }) => {
    await page.goto('http://localhost:3001/date-venues');
    await page.waitForLoadState('networkidle');

    const venueCard = page.locator('[data-testid="venue-card"]').first();
    await venueCard.click();

    const venueDetail = page.locator('[data-testid="venue-detail"]');
    await expect(venueDetail).toBeVisible({ timeout: 5000 });
  });

  test('should responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');

    const header = page.locator('[data-testid="mobile-header"]');
    await expect(header).toBeVisible();
  });

  test('should handle offline state gracefully', async ({ page, context }) => {
    await page.goto('http://localhost:3001');

    // Go offline
    await context.setOffline(true);
    await page.waitForTimeout(1000);

    const offlineIndicator = page.locator('[data-testid="offline-indicator"]');

    // Either offline indicator is shown or content loads from cache
    const isOfflineShown = await offlineIndicator.isVisible().catch(() => false);
    const hasContent = await page.locator('[data-testid="matchmaking-dashboard"]').isVisible().catch(() => false);

    expect(isOfflineShown || hasContent).toBe(true);
  });
});
