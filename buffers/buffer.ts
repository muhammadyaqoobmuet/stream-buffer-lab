// creating buffer from number
const buffer = Buffer.alloc(6);
console.log(buffer);

// creating buffer form string

const bufferFromString = Buffer.from("Aello");
console.log(bufferFromString);

const bufferFromArrayOfNumbers = Buffer.from([1, 2, 3, 4, 5]);
console.log(bufferFromArrayOfNumbers);

// writing in bufffer
buffer.write("nodejs exceds 6 letter will work ?");

console.log("after writing buffer : bufferOne", buffer.toString());
console.log("buffer from string ", bufferFromString[0]);
