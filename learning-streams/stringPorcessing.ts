import { createServer } from "http";
import chalk from "chalk";
import fs from "node:fs";
import { pipeline, Transform } from "node:stream";
import { error } from "node:console";
const server = createServer((req, res) => {
  if (req.url == "/stringProcess") {
    // create Readable Stream
    const readableStream = fs.createReadStream("./heavyFile.txt");
    const writeableStream = fs.createWriteStream("./heavyFileUpdated.txt");

    // listen for data comming in chunks

    // NOTE: THIS WAS KINDA MANUAL PIPING NOT EXACT PIPING BUT YEAH WE DID MANUAL WORK WE CAN USE PIP WITH TRNASFORM STREAM
    // readableStream.on("data", (chunk) => {
    //  // console.log(chalk.bgRed(chunk));
    //   // process each chunk what you want
    //   const finalString = chunk.toString().toUpperCase();
    //   writeableStream.write(finalString);

    //   res.end("done");
    //   return;
    // });

    // transform
    const transformStreamWhoseWorkIsToLowerCaseAllChunks = new Transform({
      transform: (chunk, encoding, cb) => {
        console.log(chalk.bgRedBright(encoding));
        const finalString = chunk.toString().toLowerCase();
        cb(null, finalString); // if not error then null
      },
    });

    //readableStream
    // .pipe(transformStreamWhoseWorkIsToLowerCaseAllChunks)
    // .pipe(writeableStream);   // NOTE IF ANY OF PIPE GOT ERROR WE HAVE TO HANDLE MANULLALLY LIKE ON ERROR LIKE THAT

    // BETTER APPROCH
    pipeline(
      readableStream,
      transformStreamWhoseWorkIsToLowerCaseAllChunks,
      writeableStream,
      (error) => {
        if (error) {
          console.log(error);
        }
      }
    );
  }
  return;
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
