import express from "express";
import sessionMiddleware from "./utils/session";
import passport from "passport";
import oauthRouter from "./routes/oauth";
import { googleStrategy } from "./auth.config";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";


const app = express();
const port = 3000;
passport.use(googleStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user as Express.User));


app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
// Swagger 문서 로드
const swaggerDocument = YAML.load(path.resolve(__dirname, "./swagger/openapi.yaml"));

// Swagger UI 설정
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    validatorUrl: null,
    docExpansion: 'list'
  }
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use("/oauth2", oauthRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
  console.log(`Swagger UI is available at http://0.0.0.0:${port}/docs`);
});

