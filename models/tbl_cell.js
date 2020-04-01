const pool = require('../config/db');

module.exports = {
    getAllCell() {
        const query = {
            text: 'SELECT * FROM tbl_cell WHERE status = $1',
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
    insertNewCell({
        ...data
    }) {
        const query = {
            text: 'INSERT INTO tbl_cell(cell_id, cell_code, cell_name) VALUES($1, $2, $3)',
            values: [data.id, data.cell_code, data.cell_name]
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
    updateCell({
        ...data
    }) {
        const query = {
            text: 'UPDATE tbl_cell SET cell_name=$1, cell_code=$2 WHERE cell_id=$3',
            values: [data.cell_name, data.cell_code, data.id]
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
    getCellByname(name) {
        const query = {
            text: 'SELECT * FROM tbl_cell WHERE LOWER(cell_name)=LOWER($1) AND status = $2',
            values: [name, true]
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
    getCellById(id) {
        const query = {
            text: 'SELECT * FROM tbl_cell WHERE cell_id=$1 AND status = $2',
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
    }

}