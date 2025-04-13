const { Port } = require("./Configs/Configs");
import languageMiddleware from 'middlewares/languageMiddleware';
import Database from './db/database';
import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");


app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello world");
});

app.use('/:lang/auth', languageMiddleware, authRouter);
app.use('/:lang/user', languageMiddleware, userRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    errors: err.errors || {}
  });
});

async function startServer() {
  try {
    const db = Database.getInstance();
    await db.connect();
    
    app.listen(Port, () => {
      console.info(`Server is listening on port ${Port}`);
    });
    
    console.log('App is running...');
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();