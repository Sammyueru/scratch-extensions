(function(Scratch) {
  'use strict';
  class newline {
    getInfo () {
      return {
        id: 'saveimage',
        name: 'Save Image',
        blocks: [
          {
            opcode: 'newline_return',
            blockType: Scratch.BlockType.REPORTER,
            text: 'NEWLINE'
          }
        ],
      };
    }

    newline_return() {
      return '\n';
    }
  }

  Scratch.extensions.register(new newline());
})(Scratch);
