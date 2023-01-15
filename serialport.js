//Samm (c)2023
//1/14/2023

(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('files extension must be run unsandboxed');
  }
  
  var serial_init = false;
  
  function getDataFromSerialPort(port) {
    if(serial_init == false) {
      await port.open({ baudRate: 9600});
      serial_init = true;
    }
    
  }
  
  function writeDataToSerialPort(port) {
    if(serial_init == false) {
      await port.open({ baudRate: 9600});
      serial_init = true;
    }
    
  }

  class serialport {
    getInfo () {
      return {
        id: 'samm-scratchport,
        name: 'scratchport',
        
        blocks: [
          {
            opcode: 'getFromSerialPort',
            blockType: Scratch.BlockType.REPORTER,
            text: 'GETS FROM SERIAL PORT',
            arguments: {
              port: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '3'
              }
            },
            {
            opcode: 'sendToSerialPort',
            blockType: Scratch.BlockType.COMMAND,
            text: 'GETS FROM SERIAL PORT',
            arguments: {
              port: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '3'
              }
            }
          }
        }
      };
    }
    
    getFromSerialPort(args) {
      return getDataFromSerialPort(args.port);
    }

    sendToSerialPort(args) {
      writeDataToSerialPort(args.port);
    }
  }

  Scratch.extensions.register(new serialport());
})(Scratch);
