const pool = require('../config/db');

module.exports = {
    getUserById(id) {
        const query = {
            text: 'SELECT * FROM users WHERE user_id = $1',
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
    getUserByEmail(email) {
        const query = {
            text: 'SELECT * FROM users WHERE email = $1',
            values: [email]
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
    createNewUser({
        ...data
    }) {
        const query = {
            text: 'INSERT INTO users(user_id, nid, names, username, email, phone_number, password, profile, status, dob) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
            values: [data.id, data.nid, data.names, data.email, data.email, data.phone_number, data.password, 0, true, '2000-12-31'],
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