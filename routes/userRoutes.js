const jsonfile = require("jsonfile");
const users = "./DB/users.json";

module.exports = app => {
    app.get("/users", (req, res) => {
        console.log("Fetching all users");
        jsonfile.readFile(users, (err, content) => {
            res.send(content);
        });
    });

    app.post("/users/new", (req, res) => {
        let { email, username } = req.body;

        jsonfile.readFile(users, (err, content) => {
            content.push({ email, username });

            console.log("Added " + email + " to DB");

            jsonfile.writeFile(users, content, err => console.log(err));

            res.sendStatus(200);
        });
    });

    app.delete("/users/destroy", (req, res) => {
        let email = req.body.email;

        jsonfile.readFile(users, (err, content) => {
            content = content.filter(user => {
                return user.email !== email;
            });

            jsonfile.writeFile(users, content, err => console.log(err));

            console.log("User removed from DB");

            res.sendStatus(200);
        });
    });

    app.put("/user", (req, res) => {
        let user;
        let username = req.body.username;
        let email = req.query.email;

        jsonfile.readFile(users, (err, content) => {
            for (var i = content.length - 1; i >= 0; i--) {
                if (content[i].email === email) {
                    console.log(
                        "Updated user " +
                            email +
                            " has now username : " +
                            username
                    );

                    user = content[i];
                    user.username = username;
                }
            }

            jsonfile.writeFile(users, content, err => console.log(err));
            res.send(user);
        });
    });

    app.get("/user", (req, res) => {
        let user;
        let email = req.query.email;

        jsonfile.readFile(users, (err, content) => {
            for (var i = content.length - 1; i >= 0; i--) {
                if (content[i].email === email) {
                    console.log("Found user " + content[i].username);
                    user = content[i];
                }
            }

            res.send(user);
        });
    });
};
