const contactsOperations = require("./contacts.js");

// const argv = require("yargs").argv;

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          const contactsList = await contactsOperations.listContacts();
          console.table(contactsList);
      break;

    case "get":
          const contactById = await contactsOperations.getContactById(id);
          if (!contactById) {
            throw new Error(`Contact with id=${id} not found`);
          }
          console.table(contactById);
      break;

    case "add":
          const newArray = await contactsOperations.addContact(name, email, phone);
          console.table(JSON.parse(newArray));
      break;

    case "remove":
          const updatedArray = await contactsOperations.removeContact(id);
          console.table(JSON.parse(updatedArray));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);




