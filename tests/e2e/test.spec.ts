// @ts-check
const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
import { Page, defineConfig, devices } from "@playwright/test";
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const pathToImageSnapshots = path.join(
  process.cwd(),
  "tests",
  "e2e",
  "__image_snapshots__"
);
const pathToSpecTsSnapshots = path.join(
  process.cwd(),
  "tests",
  "e2e",
  "test.spec.ts-snapshots"
);

let browser;
let page;
test.beforeAll(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
});

test.describe("testing applicatrion", () => {
  test("testing home page", async ({ page }: { page: any }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/", {
      waitUntil: "networkidle",
    });

    if (process.env.NODE_ENV === "development") {
      // short delay for loading all page elements before screenshot
      await page.waitForTimeout(4000);
      await page.screenshot({
        path: `${pathToImageSnapshots}/home-page.png`,
        fullpage: true,
      });
      await expect(page).toHaveScreenshot();
      expect(
        await page.screenshot({
          path: `${pathToSpecTsSnapshots}/home-page.png`,
          fullPage: true,
        })
      ).toMatchSnapshot(`${pathToImageSnapshots}/home-page.png`);
    }

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
    await page.goto("/");
    await Promise.all([
      page.getByRole("link", { name: "products" }).click(),
      page.waitForURL(`/products`),
      page.waitForSelector('[data-testid="products"]'),
    ]);
    await Promise.all([
      page.getByRole("link", { name: "contact" }).click(),
      page.waitForURL(`/contact`),
      page.waitForSelector('[data-testid="contact"]'),
    ]);
    await Promise.all([
      page.getByRole("link", { name: "cart" }).click(),
      page.waitForURL(`/cart`),
      page.waitForSelector('[data-testid="cart"]'),
    ]);
    await Promise.all([
      page.getByRole("link", { name: "login" }).click(),
      page.waitForURL(`/login`),
      page.waitForSelector('[data-testid="login"]'),
    ]);
  });

  test("testing navbar mobile", async ({ page }: { page: Page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/", {
      waitUntil: "networkidle",
    });

    if (process.env.NODE_ENV === "development") {
      await page.waitForTimeout(4000);
      await page.screenshot({
        path: `${pathToImageSnapshots}/home-page-mobile.png`,
      });

      expect(
        await page.screenshot({
          path: `${pathToSpecTsSnapshots}/home-page.png`,
        })
      ).toMatchSnapshot(`${pathToImageSnapshots}/home-page-mobile.png`);
    }

    const openIcon = page.getByTestId("open-icon");
    await expect(openIcon).toBeVisible();
    await openIcon.click();
    const closeIcon = page.getByTestId("close-icon");
    await expect(closeIcon).toBeVisible();
    await expect(openIcon).toBeHidden();
    await expect(page.getByTestId("mobile-menu")).toBeVisible();

    await Promise.all([
      page.getByRole("link", { name: "products" }).click(),
      page.waitForURL(`/products`),
      page.waitForSelector('[data-testid="products"]'),
    ]);
    await Promise.all([
      openIcon.click(),
      page.getByRole("link", { name: "contact" }).click(),
      page.waitForURL(`/contact`),
      page.waitForSelector('[data-testid="contact"]'),
    ]);
    await Promise.all([
      openIcon.click(),
      page.getByRole("link", { name: "cart" }).click(),
      page.waitForURL(`/cart`),
      page.waitForSelector('[data-testid="cart"]'),
    ]);
    await Promise.all([
      openIcon.click(),
      page.getByRole("button", { name: "Login" }).click(),
      page.waitForURL(`/login`),
      page.waitForSelector('[data-testid="login"]'),
    ]);
  });
  test("testing products section", async ({ page }: { page: Page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`/products`, {
      waitUntil: "networkidle",
    });

    if (process.env.NODE_ENV === "development") {
      await page.waitForTimeout(4000);
      await page.screenshot({
        path: `${pathToImageSnapshots}/products-page.png`,
        fullPage: true,
      });

      expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(
        `${pathToImageSnapshots}/products-page.png`
      );
    }

    await expect(page.getByTestId("products-banner")).toBeVisible();
    await expect(page.getByTestId("products-filter")).toBeVisible();
    await expect(page.getByTestId("products-container")).toBeVisible();

    const elements = await page.$$('[data-testid="test-product"]');
    await elements[0].click();
    await page.waitForSelector('[data-testid="product-page"]');
  });

  test("testing product page", async ({ page }: { page: Page }) => {
    await page.goto(`/products`, {
      waitUntil: "networkidle",
    });

    await expect(page.getByTestId("products-container")).toBeVisible();
    const elements = await page.$$('[data-testid="test-product"]');
    await elements[0].click();
    await page.waitForSelector('[data-testid="product-page"]');

    if (process.env.NODE_ENV === "development") {
      await page.waitForTimeout(4000);
      await page.screenshot({
        path: `${pathToImageSnapshots}/product-page.png`,
        fullPage: true,
      });

      expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(
        `${pathToImageSnapshots}/product-page.png`
      );
    }

    await expect(page.getByTestId("main-image")).toBeVisible();
    await expect(page.getByTestId("additional-images")).toBeVisible();
    await expect(page.getByTestId("title")).toBeVisible();
    await expect(page.getByTestId("description")).toBeVisible();
    await expect(page.getByTestId("quantity-counter")).toBeVisible();
    await expect(page.getByTestId("price")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Add To Cart" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Buy now" })).toBeVisible();
  });

  test("testing contact page", async ({ page }: { page: Page }) => {
    await page.goto(`/contact`, {
      waitUntil: "networkidle",
    });

    if (process.env.NODE_ENV === "development") {
      await page.waitForTimeout(4000);
      await page.screenshot({
        path: `${pathToImageSnapshots}/contact-page.png`,
        fullPage: true,
      });

      expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(
        `${pathToImageSnapshots}/contact-page.png`
      );
    }
    await page.waitForSelector('[data-testid="contact"]');
    await expect(page.getByText("Let's Keep in Touch")).toBeVisible();
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("Please fill the name field")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Message is required")).toBeVisible();

    const name = page.getByPlaceholder("name");
    const email = page.getByPlaceholder("email");
    const message = page.getByPlaceholder("message");

    await name.fill("vlad");
    await email.fill("nightshift@gmail.com");
    await message.fill("Hello");

    await expect(name).toHaveValue("vlad");
    await expect(email).toHaveValue("nightshift@gmail.com");
    await expect(message).toHaveValue("Hello");

    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByText("Email sent successfully!")).toBeVisible();
  });

  test("testing cart page", async ({ page }: { page: Page }) => {
    await page.goto(`/cart`, {
      waitUntil: "networkidle",
    });
    if (process.env.NODE_ENV === "development") {
      await page.waitForTimeout(4000);
      await page.screenshot({
        path: `${pathToImageSnapshots}/cart-page.png`,
        fullPage: true,
      });

      expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(
        `${pathToImageSnapshots}/cart-page.png`
      );
    }
    await expect(page.getByText("Cart is empty")).toBeVisible();

    // adding product to cart
    await page.goto(`/products`, {
      waitUntil: "networkidle",
    });
    await expect(page.getByTestId("products-container")).toBeVisible();
    const elements = await page.$$('[data-testid="test-product"]');
    await elements[0].hover();
    await expect(
      page.getByRole("button", { name: "Add To Cart" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Add To Cart" }).click();
    await expect(
      page.getByText("The product added to the cart !")
    ).toBeVisible();

    await elements[1].hover();
    await expect(
      page.getByRole("button", { name: "Add To Cart" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Add To Cart" }).click();

    await page.goto(`/cart`, {
      waitUntil: "networkidle",
    });
    await expect(page.getByTestId("cart-container")).toBeVisible();
    await expect(page.getByTestId("cart-totals")).toBeVisible();
    let productsInCart = await page.$$('[data-testid="cart-item"]');
    await expect(productsInCart).toHaveLength(2);

    // deleting product from cart
    await page.getByTestId("delete-item-1").click();
    productsInCart = await page.$$('[data-testid="cart-item"]');
    await expect(productsInCart).toHaveLength(1);
    await page.getByTestId("delete-item-0").click();
    await expect(page.getByText("Cart is empty")).toBeVisible();
  });

  test("testing checkout", async ({ page }: { page: Page }) => {
    await page.goto(`/products`, {
      waitUntil: "networkidle",
    });

    await expect(page.getByTestId("products-container")).toBeVisible();
    const elements = await page.$$('[data-testid="test-product"]');
    await elements[0].hover();
    await page.getByRole("button", { name: "Add To Cart" }).click();

    await page.goto(`/cart`, {
      waitUntil: "networkidle",
    });
    await page.waitForSelector('[data-testid="cart-item"]');
    await page.getByRole("button", { name: "PROCEED TO CHECKOUT" }).click();

    // login before checkout
    await page.waitForURL(`/login`);
    await page.waitForSelector('[data-testid="login"]');
    const email = page.getByPlaceholder("email");
    const password = page.getByPlaceholder("password");
    await email.fill("test@gmail.com");
    await password.fill("Vlad19820708");
    await page.getByRole("button", { name: "Login" }).click();

    // checkout address forms
    await page.waitForSelector('[data-testid="address-form"]');

    if (process.env.NODE_ENV === "development") {
      await page.waitForTimeout(4000);
      await page.screenshot({
        path: `${pathToImageSnapshots}/address-form-page.png`,
        fullPage: true,
      });

      expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(
        `${pathToImageSnapshots}/address-form-page.png`
      );
    }
  });
});
