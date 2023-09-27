const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET Route
router.get('/:childId', (req, res) => {
    console.log('/timeline GET route');
    console.log('is authenticated?', req.isAuthenticated());
    if(req.isAuthenticated()) {
        console.log('user', req.user);
        const userId = req.user.id;
        const childId = req.params.childId;
        const queryText = `
            SELECT * FROM "timeline" 
            WHERE "userId" = $1 AND "childId" = $2;
        `;

        pool.query(queryText, [userId, childId]).then((result) => {
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
    console.log('/timeline POST route');
    console.log('is authenticated?', req.isAuthenticated());
    if(req.isAuthenticated()) {
        console.log('user', req.user);
        const userId = req.user.id;
        const { childId, eventSum, dateOf, summary } = req.body;
        const queryText = `
            INSERT INTO "timeline" (userId, childId, eventSum, dateOf, summary)
            VALUES ($1, $2, $3, $4, $5);
        `;

        pool.query(queryText, [userId, childId, eventSum, dateOf, summary])
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
    console.log('/timeline PUT route');
    console.log('is authenticated?', req.isAuthenticated());
    if(req.isAuthenticated()) {
        console.log('user', req.user);
        const timelineId = req.params.id;
        const { eventSum, dateOf, summary } = req.body;
        const queryText = `
            UPDATE "timeline" 
            SET "eventSum" = $1, "dateOf" = $2, "summary" = $3
            WHERE "ID" = $4 AND "userId" = $5;
        `;

        pool.query(queryText, [eventSum, dateOf, summary, timelineId, req.user.id])
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

// DELETE Route
router.delete('/:id', (req, res) => {
    console.log('/timeline DELETE route');
    console.log('is authenticated?', req.isAuthenticated());
    if(req.isAuthenticated()) {
        console.log('user', req.user);
        const timelineId = req.params.id;
        const userId = req.user.id;
        const queryText = `
            DELETE FROM "timeline" 
            WHERE "ID" = $1 AND "userId" = $2;
        `;

        pool.query(queryText, [timelineId, userId])
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
