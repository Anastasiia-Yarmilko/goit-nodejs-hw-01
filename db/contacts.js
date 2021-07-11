// contacts.js

const fs = require('fs').promises;
const path = require('path');

// const contactsPath = path.basename('/db/contacts.json');
const contactsPath = require('./contacts.json');

function listContacts = async ()=> {
    try {
        const data = await fs.readFile(contactsPath);
        const products = JSON.parse(data);
        return products;
    }
  
    catch(error){
        error.message = "Cannot read products file";
        throw error;
    }
}

function getContactById = async (contactId)=> {
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
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}