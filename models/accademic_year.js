const pool = require('../config/db');

module.exports = {
    getAcademicYearById(id) {
        const query = {
            text: 'SELECT * FROM accademic_year WHERE user_id = $1',
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
            values: [],
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
    getAllUsers() {
        const query = {
            text: 'SELECT * FROM users'
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
    updateUserById(id, {
        ...data
    }) {
        const query = {
            text: 'UPDATE users SET nid=$1, email=$2, username=$3, names=$4, profile=$5, dob=$6, phone_number=$7 WHERE user_id=$8',
            values: [data.nid, data.email, data.username, data.names, data.profile, data.dob, data.phone_number, id]
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
    updateUserPassword(id, password) {
        const query = {
            text: 'UPDATE users SET password=$1 WHERE user_id=$2',
            values: [password, id]
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