const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'products.json');

const readProducts = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeProducts = (products) => {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
};

const getProducts = () => {
  return readProducts();
};

const getProductById = (id) => {
  const products = readProducts();
  return products.find(product => product.id === id);
};

const addProduct = (product) => {
  const products = readProducts();
  product.id = products.length ? products[products.length - 1].id + 1 : 1;
  products.push(product);
  writeProducts(products);
  return product;
};

const updateProduct = (id, updatedProduct) => {
  const products = readProducts();
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products[index] = { id, ...updatedProduct };
    writeProducts(products);
    return products[index];
  } else {
    return null;
  }
};

const deleteProduct = (id) => {
  let products = readProducts();
  const product = products.find(product => product.id === id);
  if (product) {
    products = products.filter(product => product.id !== id);
    writeProducts(products);
    return product;
  } else {
    return null;
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};