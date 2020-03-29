const pool = require('../config/db');

module.exports = {
    getIndicatorById(id) {
        const query = {
            text: 'SELECT * FROM indicator WHERE indicator_id = $1',
            values: [id]
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
    createNewIndicator({
        ...data
    }) {
        const query = {
            text: 'INSERT INTO indicator(indicator_id, accademic_id, indicator_title, indicator_description) VALUES($1, $2, $3, $4)',
            values: [data.id, data.accademic_id, data.indicator_title, data.indicator_description],
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
    getAllIndicator() {
        const query = {
            text: 'SELECT * FROM indicator'
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
    updateIndicatorById({
        ...data
    }) {
        const query = {
            text: 'UPDATE indicator SET accademic_id=$1, indicator_title=$2, indicator_description=$3  WHERE indicator_id=$4',
            values: [data.accademic_id, data.indicator_title, data.indicator_description, data.id]
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
    updateIndicatorStatus({
        ...data
    }) {
        const query = {
            text: 'UPDATE indicator SET status=$1 WHERE indicator_id=$2',
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