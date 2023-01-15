(function(Scratch) {
  'use strict';
  
  /*
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('save image extension must be run unsandboxed');
  }
  */
  
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  
  function hexToRgb(hex) {
    //var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    //const r = parseInt(result[1], 16);
    //const g = parseInt(result[2], 16);
    //const b = parseInt(result[3], 16);
    
    const r = parseInt(hex.substr(1,3), 16);
    const g = parseInt(hex.substr(4,6), 16);
    const b = parseInt(hex.substr(7,9), 16);
    
    return {
      r,g,b
    };
  }

  const download = (file, img_type='png', width=255, pixels) => {
    var height = Math.ceil(pixels.length / width);

    // Create canvas
    var canvas = document.createElement('canvas');
    
    canvas.height = height;
    canvas.width = width;
    
    var context = canvas.getContext('2d');
    var imgData = context.createImageData(width, height);

    // fill imgData with colors from array
    for(var i = 0; i < pixels.length; i++) {
        // Convert pixels[i] to RGB
        // See http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        
        const {r, g, b} = hexToRgb(pixels[i]);
      
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

    const blob = new Blob([img]);
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
                defaultValue: 'DOWNLOAD.PNG'
              },
              imgtype: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'png'
              },
              width: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 256
              },
              pixels: {
                type: Scratch.ArgumentType.LIST,
                defaultValue: ['#100100100']
              }
            }
          },
          {
            opcode: 'convertRgbToHex',
            blockType: Scratch.BlockType.REPORTER,
            text: 'CONVERT [r][g][b] TO HEX',
            arguments: {
              r: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 256
              },
              g: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 256
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 256
              }
            }
          }
        ],
      };
    }

    downloadimage (args) {
      download(args.file, args.imgtype, args.width, args.pixels);
    }

    convertRgbToHex (args) {
      return rgbToHex(args.r, args.g, args.b);
    }

  }

  Scratch.extensions.register(new SaveImage());
})(Scratch);
