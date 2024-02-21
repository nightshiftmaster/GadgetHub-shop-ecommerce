// @ts-check
const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
import { Page, defineConfig, devices } from "@playwright/test";
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const fakeUserAdress = {
  firstName: "vlad",
  lastName: "medevedev",
  email: "test@gmail.com",
  mobileNumber: "0547355910",
  country: "israel",
  city: "eilat",
  address: "knaanim",
};

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

test.describe("testing application", () => {
  test("testing home page", async ({ page }: { page: any }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/", {
      waitUntil: "networkidle",
    });

    // if (process.env.NODE_ENV === "development") {
    //   // short delay for loading all page elements before screenshot
    //   await page.waitForTimeout(4000);
    //   expect(await page.screenshot()).toMatchSnapshot(
    //     `${pathToImageSnapshots}/home-page.png`
    //   );
    // }

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

    // testing choose by category from home page

    await page.getByTestId("general-category-Smartphones").click();
    await page.waitForURL(`/products?generalCategory=smartphones`);
    await page.waitForSelector('[data-testid="products"]'),
      await page.goto("/", {
        waitUntil: "networkidle",
      });
    await page.getByTestId("general-category-Laptops").click();
    await page.waitForURL(`/products?generalCategory=laptops`);
    await page.waitForSelector('[data-testid="products"]');

    // testing new arivals and top sales filters
    await page.goto("/", {
      waitUntil: "networkidle",
    });
    await page.getByTestId("view-all-top-sales").click();
    await page.waitForURL(`/products?filter=topSales`);
    await page.waitForSelector('[data-testid="products"]');

    await page.goto("/", {
      waitUntil: "networkidle",
    });
    await page.waitForSelector('[data-testid="new-arivals"]');
    await page.getByTestId("view-all-top-arrivals").click();
    await page.waitForURL(`/products?filter=newArrivals`);
    await page.waitForSelector('[data-testid="products"]');
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
      // page.waitForURL(`/cart`),
      page.waitForSelector('[data-testid="cart"]'),
    ]);
    await Promise.all([
      page.getByRole("link", { name: "login" }).click(),
      // page.waitForURL(`/login`),
      page.waitForSelector('[data-testid="login"]'),
    ]);
  });

  test("testing navbar mobile", async ({ page }: { page: Page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/", {
      waitUntil: "networkidle",
    });

    // if (process.env.NODE_ENV === "development") {
    //   await page.waitForTimeout(3000);
    //   expect(
    //     await page.screenshot({
    //       path: `${pathToSpecTsSnapshots}/home-page.png`,
    //     })
    //   ).toMatchSnapshot(`${pathToImageSnapshots}/home-page-mobile.png`);
    // }

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

    // if (process.env.NODE_ENV === "development") {
    //   await page.waitForTimeout(3000);
    //   expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(
    //     `${pathToImageSnapshots}/products-page.png`
    //   );
    // }

    await page.waitForSelector('[data-testid="products-container"]');
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

    // if (process.env.NODE_ENV === "development") {
    //   await page.waitForTimeout(3000);
    //   expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(
    //     `${pathToImageSnapshots}/product-page.png`
    //   );
    // }

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

    // if (process.env.NODE_ENV === "development") {
    //   await page.waitForTimeout(3000);
    //   expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(
    //     `${pathToImageSnapshots}/contact-page.png`
    //   );
    // }
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

    // if (process.env.NODE_ENV === "development") {
    //   await page.waitForTimeout(3000);
    //   expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(
    //     `${pathToImageSnapshots}/cart-page.png`
    //   );
    // }
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

    // if (process.env.NODE_ENV === "development") {
    //   await page.waitForTimeout(3000);
    //   expect(await page.screenshot()).toMatchSnapshot(
    //     `${pathToImageSnapshots}/address-page.png`
    //   );
    // }
    await page.waitForSelector('[data-testid="address-form"]');

    // checking form inputs
    // in case of created user inputs are filled with registr values
    await Promise.all(
      Object.entries(fakeUserAdress).map(async ([field, value]) => {
        const input = await page.inputValue(`[data-testid="input-${field}"]`);
        expect(input).toBe(value);
      })
    );

    await Promise.all([
      page.getByRole("button", { name: "next" }).click(),
      page.waitForURL("/checkout"),
      page.waitForSelector('[data-testid="payment-page"]'),
    ]);

    await expect(page.getByTestId("products-checkout")).toBeVisible();
    await expect(page.getByTestId("totals-checkout")).toBeVisible();
    await expect(page.getByTestId("terms-checkbox")).toBeVisible();

    await page.getByTestId("terms-checkbox").check();
    await page.waitForTimeout(10000);
    await expect(page.getByTestId("pay-component")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.locator('[id="payment-form"]')).toBeVisible();

    // if (process.env.NODE_ENV === "development") {
    //   await page.waitForTimeout(3000);
    //   expect(await page.screenshot()).toMatchSnapshot(
    //     `${pathToImageSnapshots}/payment-page.png`
    //   );
    // }
    // payment
    await page.waitForSelector('[data-testid="payment-page"]');
    const iframe = await page.waitForSelector("#payment-element iframe");
    const iframeContent = await iframe.contentFrame();
    await iframeContent
      .getByPlaceholder("1234 1234 1234 1234")
      .fill("4242424242424242"); // Example card number
    await iframeContent.getByPlaceholder("MM / YY").fill("0424");
    await iframeContent.getByPlaceholder("CVC").fill("424");

    await page.getByRole("button", { name: "Confirm order" }).click();
    await page.waitForTimeout(10000);
    const currentUrl = page.url();
    expect(currentUrl).toContain("success");
  });

  test("testing creating profile", async ({ page }: { page: Page }) => {
    await page.goto(`/login`, {
      waitUntil: "networkidle",
    });
    await page.waitForSelector('[data-testid="login"]');
    await page.getByRole("link", { name: "Create new account" }).click();
    await page.waitForSelector('[data-testid="register"]');

    // if (process.env.NODE_ENV === "development") {
    //   expect(await page.screenshot()).toMatchSnapshot(
    //     `${pathToImageSnapshots}/registration-page.png`
    //   );
    // }

    await page.waitForSelector('[data-testid="register"]');
    const element = await page.$('input[name="dateOfBirth"]');
    await element.evaluate((element) => element.removeAttribute("readonly"));

    await page.fill('[name="firstName"]', "vladislav");
    await page.fill('[name="lastName"]', "medvedev");
    await page.fill('[name="email"]', "test25@gmail.com");
    await page.fill('[name="mobileNumber"]', "0547355910");
    await element.fill("01101998");
    await page.fill('[name="dateOfBirth"]', "01101998");
    await page.getByTestId("input-country").selectOption("Israel");
    await page.fill('[name="city"]', "eilat");
    await page.fill('[name="address"]', "address");
    await page.fill('[name="password"]', "Vlad19820708");
    await page
      .getByTestId("avatar-upload")
      .setInputFiles(path.join(process.cwd(), "public", "facebook.png"));
    await page.getByRole("button", { name: "SUBMIT" }).click();
    await page.waitForTimeout(3000);
    await expect(
      page.getByText("Congratulations! User created successfully!")
    ).toBeVisible();
    await page.waitForURL(`/login?succes=Account has been created`);
  });
});
