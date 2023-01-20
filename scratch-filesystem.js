(function(Scratch) {
  'use strict';
  
  /*
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Scratch Filesystem extension must be run unsandboxed');
  }
  */
  
  const fs = require('fs');

  const write = (file, text="HELLO WORLD") => {
    fs.writeFile(file, text, (err) => {

        // In case of a error throw err.
        if (err) throw err;
    })
  };

  class SaveImage {
    getInfo () {
      return {
        id: 'saveimage',
        name: 'Save Image',
        blocks: [
          {
            opcode: 'downloadimage',
            blockType: Scratch.BlockType.COMMAND,
            text: 'DOWNLOAD [file] | TYPE: [imgtype] | IMG WIDTH: [width] | PIXEL ARRAY: [pixels]',
            arguments: {
              file: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'DOWNLOAD.TXT'
              },
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'HELLO WORLD'
              }
            }
          }
        ],
      };
    }

    write_text (args) {
      write(args.file, args.imgtype, args.width, args.pixels);
    }
  }

  Scratch.extensions.register(new SaveImage());
})(Scratch);


