import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
const port = 3000;

// Swagger 문서 로드
const swaggerDocument = YAML.load('./src/swagger/openapi.yaml');

// Swagger UI 설정
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger UI is available at http://localhost:${port}/docs`);
});