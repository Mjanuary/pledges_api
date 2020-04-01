const pool = require('../config/db');

module.exports = {
    getAllSector() {
        const query = {
            text: 'SELECT * FROM tbl_sector WHERE status = $1',
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
    insertNewSector({
        ...data
    }) {
        const query = {
            text: 'INSERT INTO tbl_sector(sector_id, sector_name) VALUES($1, $2)',
            values: [data.id, data.sector_name]
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
    updateSector({
        ...data
    }) {
        const query = {
            text: 'UPDATE tbl_sector SET sector_name=$1, geo_location=$2 WHERE sector_id=$3',
            values: [data.sector_name, data.geo_location, data.id]
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
    getSectorByname(name) {
        const query = {
            text: 'SELECT * FROM tbl_sector WHERE LOWER(sector_name)=LOWER($1) AND status = $2',
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
    getSectorById(id) {
        const query = {
            text: 'SELECT * FROM tbl_sector WHERE sector_id=$1 AND status = $2',
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
    getSectorCell(id) {
        const query = {
            text: 'SELECT c.cell_id, c.cell_code, c.cell_name FROM tbl_sector s INNER JOIN tbl_cell c ON s.sector_id = c.sector_id WHERE s.sector_id=$1 AND c.status=$2',
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