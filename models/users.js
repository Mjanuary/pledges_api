const pool = require('../config/db');

module.exports = {
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
    }
}