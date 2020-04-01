const pool = require('../config/db');

module.exports = {
    getAllPillars() {
        const query = {
            text: 'SELECT * FROM pillars  WHERE status = $1',
            values: [true]
        }
        return new Promise((resolve, reject) => {
            pool.query(query, (err, res) => {
                if (err) {
                    reject(err.stack)
                } else {
                    resolve(res.rows)
                }
            })
        })
    },
    createNewPillar({
        ...data
    }) {
        const query = {
            text: 'INSERT INTO pillars (pillar_id, pillar_title, description) VALUES ($1, $2, $3)',
            values: [data.id, data.title, data.description]
        }
        return new Promise((resolve, reject) => {
            pool.query(query, (err, res) => {
                if (err) {
                    reject(err.stack)
                } else {
                    resolve(res.rows)
                }
            })
        })
    },
    getPillarById(id) {
        const query = {
            text: 'SELECT * FROM pillars WHERE pillar_id = $1 AND status = $2',
            values: [id, true]
        }
        return new Promise((resolve, reject) => {
            pool.query(query, (err, res) => {
                if (err) {
                    reject(err.stack)
                } else {
                    resolve(res.rows)
                }
            })
        })
    },
    updatePillarById({
        ...data
    }) {
        const query = {
            text: 'UPDATE pillars SET pillar_title = $1, description = $2 WHERE pillar_id = $3',
            values: [data.title, data.description, data.id]
        }
        return new Promise((resolve, reject) => {
            pool.query(query, (err, res) => {
                if (err) {
                    reject(err.stack)
                } else {
                    resolve(res.rows)
                }
            })
        })
    },
    updatePillaStatus({
        ...data
    }) {
        const query = {
            text: 'UPDATE pillars SET status = $1 WHERE pillar_id = $2',
            values: [data.status, data.id]
        }
        return new Promise((resolve, reject) => {
            pool.query(query, (err, res) => {
                if (err) {
                    reject(err.stack)
                } else {
                    resolve(res.rows)
                }
            })
        })
    }
}