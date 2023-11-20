import readline from 'readline';
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "./utils/user-requests.js";

main();

async function main() {
  const rl = readline.createInterface(process.stdin, process.stdout);
  
  rl.on('line', function (line) {
    const args = line.split(' ');
    switch (args[0].toLocaleLowerCase()) {
      case 'get':
        rl.question('[ALL/search]: ', async function (res) {
          switch (res.toLocaleLowerCase()) {
            case 'all':
            case 'a':
              const data = await getUsers();
              console.log('users:', data.users);
              break;
            case 'search':
            case 's':
              rl.question('id: ', async function (id) {
                const data = await getUser(id);
                console.log('user:', data.user);
              });
              break;

          }
        })
        // get user by id or get all
        break;
      case 'create':
        rl.question('name: ', async function (name) {
          const data = await createUser(name);
          console.log('user:', data.user);
        });
      case 'update':
        rl.question('id: ', function (id) {
          rl.question('name: ', async function (name) {
            const data = await updateUser(id, name);
            console.log('user:', data.user);
          });
        });
        break;
      case 'delete':
        rl.question('id: ', async function (id) {
          const data = await deleteUser(id);
          console.log('message:', data.message);
        });
        break;
      default:
        console.log(`command ${args[0]} not recognized`);
        break;
    }
  })
}
