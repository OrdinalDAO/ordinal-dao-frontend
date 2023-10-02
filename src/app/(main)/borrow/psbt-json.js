const bip174 = require('bip174');

// Replace 'base64PSBT' with your actual base64 PSBT string
const base64PSBT = 'cHNidP8BANICAAAAAp6N2Ry3LfcbOp82GI9cfObC1/rXKgCMcBdwTk2p8IVUAAAAAAD/////Ppazm0aREKoNevt6ukTZ9e9qT7AHf2eO4GNsopdtwqMBAAAAAP////8DAAAAAAAAAAAiUSDqhZ6qjFo5a06s+Xv/ZX15ej8zd4uIzmOpf50r/dxiGgsmAAAAAAAAIlEgzZvndkv4eenhr9skwKMlDmdj2mn/nYYt0h92x7MxzEuJHgAAAAAAABepFIUHzptZs7tjKDPZPdxD+cGzPAHUhwAAAAAAAQErCyYAAAAAAAAiUSDNm+d2S/h56eGv2yTAoyUOZ2Paaf+dhi3SH3bHszHMSwEXIIWo3lx3/vL2r9hZb2/hVg9Vb6aqzTYOTYhJLwHPSIhuAAEBIHEiAAAAAAAAF6kUhQfOm1mzu2MoM9k93EP5wbM8AdSHAQQWABRcgLCEXZtrCNDseLCK2XeY4OHklQAAAAA=';

// Decode the base64 PSBT to a Buffer
const psbtBuffer = Buffer.from(base64PSBT, 'base64');

// Parse the PSBT
const psbt = bip174.Psbt.fromBuffer(psbtBuffer,txGetter);

// Convert the PSBT to a JSON object
const psbtJSON = psbt.data;

console.log(JSON.stringify(psbtJSON, null, 2));


