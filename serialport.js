(function(Scratch) {
  'use strict';
  
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('serialport extension must be run unsandboxed');
  }
  
  //Samm (c)2023
  //1/14/2023
  
  var serial_connected_to_port = -1;
  var decoder;
  var inputDone;
  var inputStream;
  var reader;
  var encoder;
  var outputDone;
  var outputStream;
  var writer;
  
  function serial_connectPort(port, baudRate) {
    port.open({ baudrate: baudRate });

    decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable;

    reader = inputStream.getReader();

    encoder = new TextEncoderStream();
    outputDone = encoder.readable.pipeTo(port.writable);
    outputStream = encoder.writable;

    writer = outputStream.getWriter();
    
    serial_connected_to_port = port;
}
  
  function getDataFromSerialPort(port, baudRate) {
    if(serial_connected_to_port == -1) {
      serial_connectPort(port, baudRate)
    }
    else if(serial_connected_to_port == port) {
      
    }
    else {
      //Disconnect
    }
    
    if(port.readable) {
      const reader = port.readable.getReader();
      const { value, done } = reader.read();
      if(done) {
        return value;
      }
      else {
        return -1;
      }
    }
    else {
      return -1;
    }
  }
  
  function writeDataToSerialPort(port, baudRate) {
    if(serial_connected_to_port == -1) {
      //await port.open({ baudRate: 9600});
    }
    
  }

  class serialport {
    getInfo () {
      return {
        id: 'sammscratchport',
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
              },
              rate: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '9600'
              }
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
              },
              rate: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '9600'
              }
            }
          }
        ]
      };
    }
    
    getFromSerialPort(args) {
      return getDataFromSerialPort(args.port, args.rate);
    }

    sendToSerialPort(args) {
      writeDataToSerialPort(args.port, args.rate);
    }
  }

  Scratch.extensions.register(new serialport());
})(Scratch);
