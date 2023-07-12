import * as express from 'express';
import * as serverless from "serverless-http";
import { MoviesController } from './controllers/MoviesController';

(async () => {
    const clientOrigin = 'https://test.d35ucue36jlldo.amplifyapp.com';

    const app = express();
    
    app.use(express.json());
    app.use((_, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', clientOrigin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'content-type');
        next();
    });

    const moviesController = MoviesController.Create();

    app.get('/movies/:id', moviesController.getMovie);

    app.get('/movies', moviesController.getMovies);

    app.post('/movies', moviesController.createMovie);

    app.put('/movies/:id', moviesController.updateMovie);

    app.delete('/movies/:id', moviesController.deleteMovie);

    const port = process.env.PORT || 3001;

    if (process.env.ENVIRONMENT === "lambda") {
        exports.handler = serverless(app);
    } else {
        app.listen(port, () => console.log(`Express API listening on PORT ${port}`));
    }
})();
