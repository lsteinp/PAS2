db.createUser(
    {
        user: "PAS",
        pwd: "PAS",
        roles: [
            {
                role: "readWrite",
                db: "PAS"
            }
        ]
    }
);