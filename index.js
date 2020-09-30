const express = require("express");

const app = express();

app.use(express.json());

require("./routes/userRoutes")(app);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running`);
});
