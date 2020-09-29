const express = require("express");
const bodyParser = require("body-parser");

const app = express();

require("./routes/userRoutes")(app);

app.use(bodyParser.json());

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running`);
});
