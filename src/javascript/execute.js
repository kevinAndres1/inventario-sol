const { ipcRenderer } = require('electron');
let idp = 1;

const execute = function (name, params) {
  const ipcid = idp;
  idp += 1;

  const handleResponse = function (resolve, reject) {
    ipcRenderer.on('asynchronous-execute-response', (event, { response, error, idp }) => {
      if (idp == ipcid && !error) resolve(response);
      else if (idp == ipcid && error) reject(error);
    });
  };

  setTimeout(ipcRenderer.send('asynchronous-execute-send', { name, params, idp: ipcid }), 10);
  return new Promise(handleResponse);
};

module.exports = execute;
