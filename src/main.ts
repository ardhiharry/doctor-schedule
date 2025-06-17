import express from 'express';
import routes from '@routes/v1/routes';
import { env } from '@config/env';
import { log } from '@utils/logger/logger';
import { Setup } from '@config/setup';
import { errorMiddleware } from '@middlewares/error.middleware';
import { notFoundMiddleware } from '@middlewares/not-found.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Setup.database();

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Doctor's Schedule API",
  });
});
app.use('/api', routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(env.APP_PORT, () => {
  log.info(`Server is running on ${env.APP_URL}`);
});
