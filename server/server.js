const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${PORT}`);
});
