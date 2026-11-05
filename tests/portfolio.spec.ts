import { expect, test } from '@playwright/test';

test('About restores the full introduction without the walkthrough', async ({
  page,
}) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Take a look', exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'About', exact: true })
    .click();
  await expect(page).toHaveURL(/#about$/);
  await expect(page.locator('#about-title')).toHaveText(
    /Hi, I’m Simon\.\s*I like making\s*things work\./,
  );
  await expect(page.locator('.about-copy > p')).toHaveText([
    'My background is in Linux systems and DevOps. I spend a lot of time with the things behind the screen: automation, containers, and the systems that keep everything running.',
    'These projects are the other side of that. A place to follow an interest, try an idea, and build something friends and colleagues can actually use.',
  ]);
});

test('the primary action leads to all projects without runtime requests', async ({
  page,
}) => {
  const errors: string[] = [];
  const externalRequests: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1:4322/')) {
      externalRequests.push(request.url());
    }
  });
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Questions', exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('heading', { name: 'Take your pick', exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('link', { name: 'Explore projects' }),
  ).toHaveCount(1);
  await expect(
    page.getByRole('link', { name: 'Questions', exact: true }),
  ).toHaveCount(0);
  await page.getByRole('link', { name: 'Explore projects' }).first().click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(
    page.locator('[data-section-link][aria-current="location"]'),
  ).toHaveText('Projects');
  for (const [name, url] of [
    ['Friday', 'https://friday.simonbrgstrm.se'],
    ['Icegrid', 'https://icegrid.simonbrgstrm.se'],
    ['One More Turn', 'https://onemoreturn.simonbrgstrm.se/'],
  ]) {
    const link = page.getByRole('link', { name: `Open ${name}`, exact: true });
    await expect(link).toHaveAttribute('href', url);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }
  await expect(page.locator('.project')).toHaveCount(3);
  const loaded = await page
    .locator('.project img')
    .evaluateAll((images) =>
      images.every((image) => (image as HTMLImageElement).naturalWidth > 0),
    );
  expect(loaded).toBe(true);
  expect(externalRequests).toEqual([]);
  expect(errors).toEqual([]);
});

test('390px layout keeps the action visible and navigation keyboard accessible', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const cta = page.getByRole('link', { name: 'Explore projects' }).first();
  await expect(cta).toBeInViewport({ ratio: 1 });
  const toggle = page.locator('.navigation .menu-toggle');
  await expect(toggle).toHaveAccessibleName('Open navigation');
  await toggle.click();
  const menu = page.getByRole('dialog', { name: 'Navigation' });
  await expect(menu).toBeVisible();
  await expect(
    menu.getByRole('link', { name: 'Questions', exact: true }),
  ).toHaveCount(0);
  expect((await menu.boundingBox())?.height).toBe(844);
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).not.toBeVisible();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await menu.getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(menu).not.toBeVisible();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('body')).not.toHaveClass(/menu-open/);
  const gameLink = page.getByRole('link', {
    name: 'Open One More Turn',
    exact: true,
  });
  await gameLink.scrollIntoViewIfNeeded();
  await expect(gameLink).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test('the visual terminal shows the desktop stack without interactive controls', async ({
  page,
}) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const terminal = page.getByRole('figure', {
      name: 'Desktop terminal illustration',
    });
    await terminal.scrollIntoViewIfNeeded();
    await expect(terminal).toHaveCSS('opacity', '1');
    await expect(terminal.locator('.terminal-stack dd')).toHaveText([
      'niri',
      'dms',
      'alacritty',
      'tmux',
    ]);
    await expect(terminal.locator('.terminal-projects li')).toHaveText([
      'friday/',
      'icegrid/',
      'onemoreturn/',
    ]);
    await expect(terminal.locator('input, textarea, button')).toHaveCount(0);
    expect(
      await terminal.evaluate(
        (element) => element.scrollWidth <= element.clientWidth,
      ),
    ).toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});

test('word reveals activate progressively and do not replay', async ({
  page,
}) => {
  await page.goto('/');
  const words = page.locator('.tagline-word');
  const wordCount = await words.count();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  await expect(words.last()).toHaveCSS('opacity', '0.3');
  await page.locator('.tagline').evaluate((element) => {
    const top = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top - window.innerHeight * 0.75 + 48);
  });
  await expect(words.first()).toHaveAttribute('data-active', '');
  await expect(words.last()).not.toHaveAttribute('data-active', '');
  await page.locator('.tagline').evaluate((element) => {
    const top = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top - window.innerHeight * 0.75 + 300);
  });
  await expect(page.locator('.tagline-word[data-active]')).toHaveCount(
    wordCount,
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator('.tagline-word[data-active]')).toHaveCount(
    wordCount,
  );
});

test('project actions align and previews stay still on hover', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  const image = page.locator('.project img').first();
  await image.scrollIntoViewIfNeeded();
  await expect(page.locator('.project').first()).toHaveCSS('opacity', '1');
  const actionPositions = await page
    .locator('.project-bottom')
    .evaluateAll((items) =>
      items.map((item) => item.getBoundingClientRect().top),
    );
  expect(
    Math.max(...actionPositions) - Math.min(...actionPositions),
  ).toBeLessThanOrEqual(1);
  const before = await image.boundingBox();
  await image.hover();
  await page.waitForTimeout(550);
  expect(await image.boundingBox()).toEqual(before);
});

test('reduced motion shows full text and does not move controls', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.tagline-word').last()).toHaveCSS('opacity', '1');
  const cta = page.getByRole('link', { name: 'Explore projects' }).first();
  await cta.hover();
  await expect(cta).toHaveCSS('transform', 'none');
  await expect(page.locator('.project').first()).toHaveCSS('opacity', '1');
  await expect(page.locator('.terminal-window')).toHaveCSS('opacity', '1');
  await expect(page.locator('.terminal-window')).toHaveCSS('transform', 'none');
});

test('legal pages and the custom 404 have usable destinations', async ({
  page,
}) => {
  for (const [link, heading] of [
    ['Privacy', 'Your visit, without the tracking.'],
    ['Terms', 'A personal collection of projects.'],
  ]) {
    await page.goto('/');
    await page.getByRole('link', { name: link, exact: true }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
    await expect(
      page.getByRole('link', { name: 'Back to home' }),
    ).toHaveAttribute('href', '/');
  }
  const response = await page.goto('/a-page-that-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Not every idea',
  );
  await expect(
    page.getByRole('link', { name: 'Back to projects' }),
  ).toHaveAttribute('href', '/#projects');
});

test('the mobile portfolio remains usable without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
    baseURL: 'http://127.0.0.1:4322',
  });
  const page = await context.newPage();
  await page.goto('/');
  await expect(
    page.getByRole('navigation', { name: 'Main navigation' }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('.project').first()).toHaveCSS('opacity', '1');
  await expect(page.locator('.tagline-word').last()).toHaveCSS('opacity', '1');
  await expect(
    page.getByRole('figure', { name: 'Desktop terminal illustration' }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await context.close();
});

test('keyboard entry and social metadata are complete', async ({
  page,
  request,
}) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  await expect(page).toHaveTitle('Simon Bergstrom | Personal projects');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://simonbrgstrm.se/social-preview.png',
  );
  for (const path of [
    '/favicon.svg',
    '/social-preview.png',
    '/sitemap.xml',
    '/robots.txt',
  ]) {
    expect((await request.get(path)).status()).toBe(200);
  }
});
