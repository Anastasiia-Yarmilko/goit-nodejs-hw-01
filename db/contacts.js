const fs = require('fs').promises;
const path = require('path');
const {v4} = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
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

const updateContacts = async(contacts) => {
    const str = JSON.stringify(contacts);
    try {
        await fs.writeFile(contactsPath, str);
    } 
    catch (error) {
        throw error;
    }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const findContact = contacts.find(item => item.contactId === contactId);
    if (!findContact) {
      throw new Error("Id incorrect");
    }
    return findContact;
  }
  catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.contactId === contactId);
    if (index === -1) {
      throw new Error("Id incorrect");
    }
    const filteredContacts = contacts.filter(item => item.contactId !== contactId);
    await updateContacts(filteredContacts);
  } catch (error) {
    throw error;
  }
};

const addContact = async (name, email, phone) => {
  const newContact = {name, email, phone, id: v4()};
    try {
        const contacts = await getAll();
        const newContacts = [...contacts, newContact];
        await updateContacts(newContacts);
        return newContact;
    }
    catch(error){
        throw error;
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}