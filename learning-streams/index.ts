import http from "http";
import fs from "node:fs";
import chalk from "chalk";
const server = http.createServer((_req, res) => {
  if (_req.url == "/copyfilesbadway") {
    console.time();
    // copying files bad way
    const readFileData = fs.readFileSync("./heavyFile.txt", "utf-8");
    fs.writeFileSync("output.txt", readFileData);
    console.timeEnd();
    res.end("copy done ");
    return;
  }
  if (_req.url == "/copyfilesgoodway") {
    console.time();
    // copying files bad way
    const readFileData = fs.createReadStream("./heavyFile.txt");
    const writeableStream = fs.createWriteStream("output.txt");

    readFileData.on("data", (chunk) => {
      console.log(chunk.toString());
      console.log(chalk.bgRed("chunk"));
      writeableStream.write(chunk);
    });
    console.timeEnd();
    res.end("copying  best way done ");
    return;
  }
  // req is a READABLE stream (incoming data from client)
  // res is a WRITABLE stream (outgoing data to client)
  //  bad way to serve heavy file from server
  // const heavyFileData = fs.readFileSync("./projectBoss.mkv"); // removed utf-8 encoding for binary data
  // res.writeHead(200, { "content-type": "video/mp4" });
  // res.end(heavyFileData);
  //GOOD WAY WITH STREAMS
  const readableStream = fs.createReadStream("./projectBoss.mkv");
  // readable stream to writable stream piping
  readableStream.on("error", (error) => {
    if (error) {
      console.log(error.message);
    }
  });
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  readableStream.pipe(res);
});

server.listen(3001, () => {
  console.log("listening on port 3k");
});
