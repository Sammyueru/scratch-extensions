(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('save image extension must be run unsandboxed');
  }

  const download = (text, file, img_type='png', width=255, pixels) => {
    var pixels = [],  // your massive array
    height = Math.ceil(pixels.length / width),

    // Create canvas
    canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    imgData = context.createImageData(width, height);

    canvas.height = height;
    canvas.width = width;

    // fill imgData with colors from array
    for(var i = 0; i < pixels.length; i++) {
        // Convert pixels[i] to RGB
        // See http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

        imgData[i] = r;
        imgData[i + 1] = g;
        imgData[i + 2] = b;
        imgData[i + 3] = 255; // Alpha channel
    }

    // put data to context at (0, 0)
    context.putImageData(imgData, 0, 0);

    // output image
    var img = new Image();
    img.src = canvas.toDataURL('image/'+img_type);
    //document.body.appendChild(img);

    const blob = new Blob([text]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  class SaveImage {
    getInfo () {
      return {
        id: 'files',
        name: 'Files',
        color1: '#fcb103',
        color2: '#db9a37',
        color3: '#db8937',
        blocks: [
          {
            opcode: 'showPicker',
            blockType: Scratch.BlockType.REPORTER,
            text: 'open a file',
            disableMonitor: true
          },
          {
            opcode: 'showPickerExtensions',
            blockType: Scratch.BlockType.REPORTER,
            text: 'open a [extension] file',
            arguments: {
              extension: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '.txt'
              }
            }
          },
          {
            opcode: 'download',
            blockType: Scratch.BlockType.COMMAND,
            text: 'download [text] as [file]',
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello, world!'
              },
              file: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'save.txt'
              }
            }
          },
          {
            opcode: 'setOpenMode',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set open file selector mode to [mode]',
            arguments: {
              mode: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: MODE_MODAL,
                menu: 'automaticallyOpen'
              }
            }
          }
        ],
        menus: {
          automaticallyOpen: {
            acceptReporters: true,
            items: [
              {
                text: 'show modal',
                value: MODE_MODAL
              },
              {
                text: 'open selector immediately',
                value: MODE_IMMEDIATELY_SHOW_SELECTOR
              }
            ]
          }
        }
      };
    }

    showPicker () {
      return showFilePrompt('');
    }

    showPickerExtensions (args) {
      return showFilePrompt(args.extension);
    }

    download (args) {
      download(args.text, args.file);
    }

    setOpenMode (args) {
      if (ALL_MODES.includes(args.mode)) {
        openFileSelectorMode = args.mode;
      } else {
        console.warn(`unknown mode`, args.mode);
      }
    }
  }

  Scratch.extensions.register(new SaveImage());
})(Scratch);
