(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('files extension must be run unsandboxed');
  }

  class Files {
    getInfo () {
      return {
        id: 'files',
        name: 'Files',
        color1: '#fcb103',
        color2: '#db9a37',
        color3: '#db8937',
        blocks: [
          {
            opcode: 'GET FROM SERIAL PORT',
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

  Scratch.extensions.register(new Files());
})(Scratch);
