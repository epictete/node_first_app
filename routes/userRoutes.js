const jsonfile = require("jsonfile");
const file = "/tmp/data.json";

module.exports = app => {
    app.get("/users", (req, res) => {
        console.log("Fetching all users");
        // jsonfile reading
        jsonfile.readFile("./DB/users.json", (err, content) => {
            // send file contents back to sender
            res.send(content);
        });
    });
};
