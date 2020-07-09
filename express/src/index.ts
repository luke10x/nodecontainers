import * as express from "express";
import * as ejs from "ejs";

const server = express();

server.set('view engine', 'ejs');
server.set('views', '/mnt/public/views')

server.engine('html', ejs.renderFile);

server.all('*', (req, res, next) => {
  const uri: String = req.params[0];

  console.log("URI", uri)
  if (uri.substr(0,1) === "/" && uri.substr(uri.length - 4) === "html") {
    const filename = uri.substr(1);
    res.render(filename);
  } else if (uri === "/") {
    res.render('index.html')
  } else {
    next();
  }
});

server.use(express.static('/mnt/public/static'));

const port = 8080;
server.listen(port, () => {
  console.log(`Express server started on ${port}`);
})