import { write } from "fs";
import { Readable, Writable } from "stream";

const readableStream = new Readable({
  highWaterMark: 10, // size of buffer deafult 64kb  this 10 shows this is 10 bytes means 10 -> charc
  read: () => {},
});

const writeableStream = new Writable({
  write: (data) => console.log(data.toString() + "<- data text-> from write method"),
});
readableStream.on("data", (chunk) => {
  console.log(chunk.toString());
  writeableStream.write(chunk);
});

console.log(readableStream.push("hello")); // if we pass value les than highwatermark thershold it will return ture if not then flase

// we can write manully like
// writeableStream.write("hello")  but we gonna write from readable stream
