export const fetchProduct = async (id: number) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (response) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch");
    }
  } catch {
    throw new Error("Something goes wrong");
  }
};

export const fetchProductSearch = async (query: string) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${query}`
    );
    if (response) {
      const data = await response.json();
      return data.products;
    } else {
      throw new Error("Failed to fetch");
    }
  } catch {
    throw new Error("Something goes wrong");
  }
};
