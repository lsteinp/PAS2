db.createUser(
    {
        user: "hubble",
        pwd: "ages_hubble",
        roles: [
            {
                role: "readWrite",
                db: "hubble"
            }
        ]
    }
);