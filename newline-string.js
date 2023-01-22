(function(Scratch) {
  'use strict';
  class newline {
    getInfo () {
      return {
        id: 'newline',
        name: 'NEWLINE',
        blocks: [
          {
            opcode: 'newline_return',
            blockType: Scratch.BlockType.REPORTER,
            text: 'NEWLINE'
          },
          {
            opcode: 'tab_return',
            blockType: Scratch.BlockType.REPORTER,
            text: 'TAB'
          }
        ],
      };
    }

    newline_return() {
      return '\n';
    }
    
    tab_return() {
      return '\t';
    }
  }

  Scratch.extensions.register(new newline());
})(Scratch);
