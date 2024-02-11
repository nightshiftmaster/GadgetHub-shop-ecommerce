// @ts-check
const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
import { Page, defineConfig, devices } from "@playwright/test";
// import path from "path";

let browser;
let page;
test.beforeAll(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
});

test.describe("testing applicatrion", () => {
  test("testing home page", async ({ page }: { page: any }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("https://gadget-hub-shop.vercel.app", {
      waitUntil: "networkidle",
    });

    // short delay for loading all page elements before screenshot
    await page.waitForTimeout(4000);
    // make screenshot
    await page.screenshot({
      path: "./tests/screenshots/home-page.png",
      fullpage: true,
    });

    expect(await page.screenshot()).toMatchSnapshot(
      "./tests/screenshots/home-page.png"
    );

    await Promise.all([
      page.waitForSelector('[data-testid="home"]'),
      page.waitForSelector('[data-testid="footer"]'),
      page.waitForSelector('[data-testid="navbar"]'),
      page.waitForSelector('[data-testid="banner"]'),
      page.waitForSelector('[data-testid="featured"]'),
      page.waitForSelector('[data-testid="top-sales"]'),
      page.waitForSelector('[data-testid="new-arivals"]'),
      page.waitForSelector('[data-testid="shop-by-category"]'),
    ]);
  });

  test("testing navbar", async ({ page }: { page: Page }) => {
    await page.goto("https://gadget-hub-shop.vercel.app");
    await Promise.all([
      page.getByRole("link", { name: "products" }).click(),
      page.waitForURL("/products"),
      page.waitForSelector('[data-testid="products"]'),
    ]);
    await Promise.all([
      page.getByRole("link", { name: "contact" }).click(),
      page.waitForURL("/contact"),
      page.waitForSelector('[data-testid="contact"]'),
    ]);
    await Promise.all([
      page.getByRole("link", { name: "cart" }).click(),
      page.waitForURL("/cart"),
      page.waitForSelector('[data-testid="cart"]'),
    ]);
    await Promise.all([
      page.getByRole("link", { name: "login" }).click(),
      page.waitForURL("/login"),
      page.waitForSelector('[data-testid="login"]'),
    ]);
  });

  test("testing navbar mobile", async ({ page }: { page: Page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("https://gadget-hub-shop.vercel.app", {
      waitUntil: "networkidle",
    });

    screenshot;
    await page.waitForTimeout(4000);
    await page.screenshot({
      path: "./tests/screenshots/home-page-mobile.png",
    });

    expect(await page.screenshot()).toMatchSnapshot(
      "./tests/screenshots/home-page-mobile.png"
    );

    const openIcon = page.getByTestId("open-icon");
    await expect(openIcon).toBeVisible();
    await openIcon.click();
    const closeIcon = page.getByTestId("close-icon");
    await expect(closeIcon).toBeVisible();
    await expect(openIcon).toBeHidden();
    await expect(page.getByTestId("mobile-menu")).toBeVisible();

    await Promise.all([
      page.getByRole("link", { name: "products" }).click(),
      page.waitForURL("https://gadget-hub-shop.vercel.app/products"),
      page.waitForSelector('[data-testid="products"]'),
    ]);
    await Promise.all([
      openIcon.click(),
      page.getByRole("link", { name: "contact" }).click(),
      page.waitForURL("https://gadget-hub-shop.vercel.app/contact"),
      page.waitForSelector('[data-testid="contact"]'),
    ]);
    await Promise.all([
      openIcon.click(),
      page.getByRole("link", { name: "cart" }).click(),
      page.waitForURL("https://gadget-hub-shop.vercel.app/cart"),
      page.waitForSelector('[data-testid="cart"]'),
    ]);
    await Promise.all([
      openIcon.click(),
      page.getByRole("button", { name: "Login" }).click(),
      page.waitForURL("https://gadget-hub-shop.vercel.app/login"),
      page.waitForSelector('[data-testid="login"]'),
    ]);
  });
  test("testing products section", async ({ page }: { page: Page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("https://gadget-hub-shop.vercel.app/products", {
      waitUntil: "networkidle",
    });

    await page.waitForTimeout(4000);
    await page.screenshot({
      path: "./tests/screenshots/products-page.png",
      fullPage: true,
    });

    expect(await page.screenshot()).toMatchSnapshot(
      "./tests/screenshots/products-page.png"
    );

    await expect(page.getByTestId("products-banner")).toBeVisible();
    await expect(page.getByTestId("products-filter")).toBeVisible();
    await expect(page.getByTestId("products-container")).toBeVisible();

    const elements = await page.$$('[data-testid="test-product"]');
    await elements[0].click();
  });
});
