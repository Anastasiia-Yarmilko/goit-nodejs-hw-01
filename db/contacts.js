const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const products = JSON.parse(data);
    return products;
  }
  
  catch (error) {
    error.message = "Cannot read products file";
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const products = await listContacts();
    const findProduct = products.find(item => item.contactId === contactId);
    if (!findProduct) {
      throw new Error("Id incorrect");
    }
    return findProduct;
  }
  catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const products = await listContacts();
    const index = products.findIndex(item => item.contactId === contactId);
    if (index === -1) {
      throw new Error("Id incorrect");
    }
    const filteredProducts = products.filter(item => item.contactId !== contactId);
    await updateProducts(filteredProducts);
  } catch (error) {
    throw error;
  }
};

const addContact = async (name, email, phone) => {
  // ...твой код
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}