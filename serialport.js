(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('files extension must be run unsandboxed');
  }

  class serialport {
    getInfo () {
      return {
        id: 'files',
        name: 'Files',
        color1: '#fcb103',
        color2: '#db9a37',
        color3: '#db8937',
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
            }
          }
        }
      };
    }
    
    getFromSerialPort(args) {
      return getDataFromSerialPort(args.port);
    }
    
  }

  Scratch.extensions.register(new serialport());
})(Scratch);
