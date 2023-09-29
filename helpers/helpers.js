/**
 * create random unique ID
 */
export const getRandomUserID = (length = 20) => {
  if (isNaN(length) || length < 1) {
    throw new Error("Invalid length. Length must be a positive integer.");
  }

  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let userID = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    userID += characters.charAt(randomIndex);
  }

  return userID;
};

/**
 * create slug
 */
export const getProductSlug = (productName) => {
  // Remove special characters and spaces, convert to lowercase
  const cleanedName = productName.replace(/[^\w\s]/gi, "").toLowerCase();

  // Replace spaces with hyphens
  const slug = cleanedName.replace(/\s+/g, "-");

  return slug;
};

// Example usage:
//   const productName = "Awesome Product 123!";
//   const productSlug = getProductSlug(productName);
//   console.log(productSlug); // Output: "awesome-product-123"
