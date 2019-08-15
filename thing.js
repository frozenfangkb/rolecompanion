//const nodeAbi = require('node-abi')

//console.log(nodeAbi.getAbi('6.0.2', 'electron'))

const iohook = require('iohook');

iohook.on('keyup', (event) => {
   console.log(event);
});

iohook.start();