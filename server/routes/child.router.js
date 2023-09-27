const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET Route
router.get('/', (req, res) => {
    console.log('/child GET route');
    console.log('is authenticated?', req.isAuthenticated());
    if(req.isAuthenticated()) {
        console.log('user', req.user);
        let parameters = [req.user.id];
        let queryText = `select * from "child" where "userId" = $1;`;

        pool.query(queryText, parameters).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

// POST Route
router.post('/', (req, res) => {
    console.log('/child POST route');
    console.log('is authenticated?', req.isAuthenticated());
    if(req.isAuthenticated()) {
        console.log('user', req.user);
        const userId = req.user.id;  // Get userId from req.user.id
        const { first, middle, last, birthday, hour, min, gender } = req.body;
        const queryText = `
            INSERT INTO "child" (userId, first, middle, last, birthday, hour, min, gender)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `;

        pool.query(queryText, [userId, first, middle, last, birthday, hour, min, gender])
            .then(() => {
                res.sendStatus(201);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});
// PUT Route
router.put('/:id', (req, res) => {
    console.log('/child PUT route');
    console.log('is authenticated?', req.isAuthenticated());
    if(req.isAuthenticated()) {
        console.log('user', req.user);
        const childId = req.params.id;
        const { first, middle, last, birthday, hour, min, gender } = req.body;
        const queryText = `
            UPDATE "child" 
            SET "first" = $1, "middle" = $2, "last" = $3, 
                "birthday" = $4, "hour" = $5, "min" = $6, "gender" = $7
            WHERE "ID" = $8 AND "userId" = $9;
        `;

        pool.query(queryText, [first, middle, last, birthday, hour, min, gender, childId, req.user.id])
            .then(() => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;


