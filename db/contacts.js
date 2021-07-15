const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts () {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  }
  
  catch (error) {
    error.message = "Cannot read contacts file";
    throw error;
  }
};

async function updateContacts (contacts) {
    const str = JSON.stringify(contacts);
    try {
        await fs.writeFile(contactsPath, str);
    } 
    catch (error) {
        throw error;
    }
};

async function getContactById (id) {
  try {
    const contacts = await listContacts();
    const findContact = await contacts.find((contact) => {
      return String(contact.id) === String(id);
    });
    console.table(findContact);

    if (!findContact) {
      throw new Error("Id incorrect");
    }
  } catch (error) {
    throw error;
  }
};

async function removeContact (id) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error("Id incorrect");
    }
    const filteredContacts = contacts.filter(item => item.id !== id);
    await updateContacts(filteredContacts);
    console.table(filteredContacts);
  } catch (error) {
    throw error;
  }
};

async function addContact (name, email, phone) {
  const newContact = { id: v4(), name, email, phone };
    try {
        const contacts = await listContacts();
        const newContacts = [...contacts, newContact];
        updateContacts(newContacts);
        console.table(newContact);
    } catch(error){
        throw error;
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}