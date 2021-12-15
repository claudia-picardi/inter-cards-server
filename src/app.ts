import express from 'express'

const app = express();
import * as sessionNamespace from 'express-session';
import session from 'express-session'
import mysqlSession from 'express-mysql-session';
const SessionStore = mysqlSession(sessionNamespace);
const port = 3000;
const options = {
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'session_test'
};

const mySessStore = new SessionStore(options);
app.use(session({
    secret: 'we shall not cease from exploration',
    store: mySessStore,
    resave: false,
    saveUninitialized: false
}));

const sessionRouter = express.Router();
sessionRouter.route("/login").get((req, res) => {
    if (req.session.count !== undefined) {
        res.send("<h1>You already logged in</h1>");
    } else {
        req.session.count = 0;
        res.send("<h1>Successful login!</h1>");
    }
});
sessionRouter.route("/act").get((req, res) => {
    if (req.session.count !== undefined) {
        req.session.count++;
        res.send(`<h1>You acted ${req.session.count} times</h1>`);
    } else {
        res.send("<h1>Before acting you need to log in</h1>");
    }
});
sessionRouter.route("/logout").get((req, res) => {
    if (req.session.count !== undefined) {
        req.session.destroy(()=> {
            res.send("<h1>You successfully logged out</h1>")
        });
    } else {
        res.send("<h1>You are already logged out</h1>");
    }
});
app.use('/', sessionRouter);
app.get('/', (req: express.Request, res: express.Response) => {
    res.send("Il mattino ha l'oro in bocca");
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
}).on('error', (err: Error) => {
    console.log(err);
});
