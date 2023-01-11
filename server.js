const http = require('http');
const url = require('url');
const { exec } = require('child_process');

const PORT = 3000; // this is the port that the server will listen on

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  const script = query.script;

  if (script) {
    exec(`${script}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }

      res.end(stdout);
    });
  } else {
    res.end('No script specified');
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
