import { log as print } from "console";
import { Readable } from "stream";

// Usage
const readableStream = new Readable({
  highWaterMark: 90, // this works a bit different now i shows no of object a buffer can hold like that 
  objectMode: true,
  read: (highWaterMark) => {
    console.log(highWaterMark);
  },
});

// by default we can pass object but if we set it true we can

readableStream.on("data", (chunk) => {
  console.log(chunk);
});

print(
  // i just weird things
  readableStream.push({
    name: "jack",
  })
);
