import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/Multer';

import ContractController from './app/controllers/ContractController';
import ContractIdController from './app/controllers/ContractIdController';
import PartesController from './app/controllers/PartesController';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/contracts', ContractController.store);

// routes.get('/contracts/:title', ContractController.index);

routes.get('/contracts', ContractController.index);
routes.get('/contractsid/:id', ContractIdController.index);

routes.put('/contracts/:id', ContractController.update);

routes.delete('/contracts/:id', ContractController.delete);

routes.post('/partes', PartesController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
