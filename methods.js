const { ipcMain } = require('electron');
const { Queue } = require('./utils/queue');
const sleep = require('./utils/sleep');
const dirs = require('./dirs');
const log = require('electron-log');
const methodsLoaded = {};
const nodes = Queue();


ipcMain.setMaxListeners(15);

const loadMethods = function (files) {
  try {
    for (const index in files) {
      const file = files[index];
      const methodsFile = require(dirs.methods + file);

      for (const index in methodsFile) {
        if (methodsLoaded[index])
          throw 'Disculpe el siguiente metodo (' + index + ')  ha sido repetido';

        if (typeof methodsFile[index] != 'function')
          throw 'Disculpe intento agregar un atributo que no es un metodo';

        methodsLoaded[index] = methodsFile[index];
      }
    }

    const methods = Object.keys(methodsLoaded);
    console.log('Methods loaded ' + methods.length);

    return methods;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// funcion que se encarga de crear una cola de procesos
const executeMethod = async function ({ name, params }) {
  try {
    // agregando una identidad al metodo a ejecutar
    const key = `${Date.now()}-${Math.random()}-${nodes.size()}`;
    nodes.add({ params, name, key });

    // verificando el metopdo que esta en el frente
    let aux = nodes.front();

    // realizando la espera 10ms evaluando si la llamada fue realizada
    while (!nodes.empty() && aux.key != key) {
      await sleep(10);
      aux = nodes.front();
    }

    log.info('Method executing...\n', { name: aux.name, params: aux.params }, '\n\n');

    const method = methodsLoaded[aux.name];
    if (!method) throw 'Disculpe el metodo no ha sido encontrado';

    let time = Date.now();
    let response = null;

    if (method.constructor.name != 'AsyncFunction') response = method(aux.params);
    else
      response = await method(aux.params)
        .then(t => t)
        .catch(error => {
          throw error;
        });

    time = Date.now() - time;
    return { response, time };
  } catch (error) {
    log.error(error);
    console.error(error);
    throw error;
  } finally {
    nodes.pop();
  }
};

// respondiendo a la solicitud emitida
ipcMain.on('asynchronous-execute-send', async (event, arg) => {
  const { idp } = arg;
  try {
    const response = await executeMethod(arg)
      .then(t => t)
      .catch(error => {
        throw error;
      });

    event.reply('asynchronous-execute-response', { ...response, idp });
  } catch (error) {
    event.reply('asynchronous-execute-response', { error, idp });
  }
});

module.exports = { loadMethods };
