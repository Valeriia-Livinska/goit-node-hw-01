const fs = require("fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, ".", "db", "contacts.json");

// get contacts list
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = JSON.parse(data);
    //   console.log(Array.isArray(parsedData));
    return parsedData;
  } catch (error) {
    console.log(error);
  }
}

// get contact by id
async function getContactById(contactId) {
  try {
    const contactsArr = await listContacts(contactsPath);
    const searchedContact = contactsArr.find((obj) => obj.id === contactId);
    return searchedContact;
  } catch (error) {
    console.log(error);
  }
}

// remove contact by is
async function removeContact(contactId) {
  try {
    const contactsArr = await listContacts(contactsPath);
    const updatedArr = contactsArr.filter((obj) => obj.id !== contactId);
    const updatedData = JSON.stringify(updatedArr, null, 4);
    await fs.writeFile(contactsPath, updatedData);
    return updatedData;
  } catch (error) {
    console.log(error);
  }
}

// add contact
async function addContact(name, email, phone) {
  try {
    const contactsArr = await listContacts(contactsPath);
    const contactToAdd = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    contactsArr.push(contactToAdd);
    const updatedData = JSON.stringify(contactsArr, null, 4);
    await fs.writeFile(contactsPath, updatedData);
    return updatedData;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
