//badel BleManager bel instance imta3 bluetooth emta3ek 
BleManager.read('XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX', 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX', 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')
  .then((readData) => {
    // Success code
    //readData from bluetooth
    console.log('Read: ' + readData);

    const buffer = Buffer.Buffer.from(readData);    //https://github.com/feross/buffer#convert-arraybuffer-to-buffer
    const sensorData = buffer.readUInt8(1, true);
  })
  .catch((error) => {
    // Failure code
    console.log(error);
  });