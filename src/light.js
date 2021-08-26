// Use 'serialport' module for communicate with arduino
import SerialPort from 'serialport';

const serial = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });

serial.on('open', () => {
    console.log(`Serial port '${serial.path}' is open`);
});

serial.on('error', err => {
    if(err) throw err;
});

export default class Light{
    
    static turnOn = room => {
        serial.write((room * 10 + 1).toString());
    }
    static turnOff = room => {
        serial.write((room * 10).toString())
    }
    static getStatus = room => {
        serial.write((room * 10 + 9).toString());
        serial.on('data', data => {
            return data === '1' ? 'on' : 'off';
        });
    }
    static shutDown = () => {
        serial.write('0');
    }
}

