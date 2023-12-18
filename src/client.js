import readline from 'readline';
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "./services/user.js";

main();

async function main() {
  const rl = readline.createInterface(process.stdin, process.stdout);
  
  rl.on('line', async function (line) {
    const args = line.split(' ');

    let data, name, id;
    
    switch (args[0].toLocaleLowerCase()) {
      case 'get':
        const res = await onQuestion(rl, '[ALL/search]: ');
        switch (res.toLocaleLowerCase()) {
          case 'all':
          case 'a':
            data = await getUsers();
            console.log('users:', data.users);
            break;
          case 'search':
          case 's':
            id = await onQuestion(rl, 'id: ');
            data = await getUser(id);
            console.log('user:', data.user);
            break;
          default:
            onsole.log(`command ${res} not recognized`);
        }
        // get user by id or get all
        break;
      case 'create':
        name = await onQuestion(rl, 'name: ');
        data = await createUser(name);
        console.log('user:', data.user);
      case 'update':
        id = await onQuestion(rl, 'id: ');
        name = await onQuestion(rl, 'name: ');
        data = await updateUser(id, name);
        console.log('user:', data.user);
        break;
      case 'delete':
        id = await onQuestion(rl, 'id: ');
        data = await deleteUser(id);
        console.log('message:', data.message);
        break;
      default:
        console.log(`command ${args[0]} not recognized`);
        break;
    }
  })
}

function onQuestion(rl, question) {
  return new Promise(function (resolve) {
    rl.question(question, async function (res) {
      resolve(res);
    });
  });
}
