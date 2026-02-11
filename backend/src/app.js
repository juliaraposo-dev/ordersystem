import express from 'express';
import { openDB } from './configDB.js';
import { createTableItem, insertItem } from './controllers/item.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});