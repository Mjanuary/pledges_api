const pool = require('../config/db');

module.exports = {
    getAcademicYearById(id) {
        const query = {
            text: 'SELECT * FROM accademic_year WHERE accademic_id = $1',
            values: [id]
        }
        return new Promise((resolve, reject) => {
            pool.query(query, (err, res) => {
                if (err) {
                    reject(err.stack)
                } else {
                    resolve(res.rows[0])
                }
            })
        })

    },
    createNewAccademicYear({
        ...data
    }) {
        const query = {
            text: 'INSERT INTO accademic_year(accademic_title, start_date, end_date, registered_date) VALUES($1, $2, $3, $4)',
            values: [data.accademic_title, data.start_date, data.end_date, data.registered_date],
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
    getAllAccademicYear() {
        const query = {
            text: 'SELECT * FROM accademic_year'
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
    updateAccademicYearById({
        ...data
    }) {
        const query = {
            text: 'UPDATE accademic_year SET accademic_title=$1, start_date=$2, end_date=$3,updated_date=$4  WHERE accademic_id=$5',
            values: [data.accademic_title, data.start_date, data.end_date, data.updated_date, data.id]
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
    updateAcademicYearStatus({
        ...data
    }) {
        const query = {
            text: 'UPDATE accademic_year SET status=$1 WHERE accademic_id=$2',
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