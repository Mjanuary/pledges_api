const pool = require('../config/db');

module.exports = {
    getAllDistrict() {
        const query = {
            text: 'SELECT * FROM tbl_district WHERE system_access = $1',
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
    insertNewDistrict({
        ...data
    }) {
        const query = {
            text: 'INSERT INTO tbl_district(district_id, district_name) VALUES($1, $2)',
            values: [data.id, data.district_name]
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
    updateDistrict({
        ...data
    }) {
        const query = {
            text: 'UPDATE tbl_district SET district_name=$1, geo_location=$2 WHERE district_id=$3',
            values: [data.province_name, data.geo_location, data.id]
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
    getDistrictByname(name) {
        const query = {
            text: 'SELECT * FROM tbl_district WHERE LOWER(district_name)=LOWER($1) AND system_access = $2',
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
    getDistrictById(id) {
        const query = {
            text: 'SELECT * FROM tbl_district WHERE district_id=$1 AND system_access = $2',
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
    getDistrictSector(id) {
        const query = {
            text: 'SELECT s.sector_id, s.sector_name, s.geo_location FROM tbl_district d INNER JOIN tbl_sector s ON d.district_id = s.district_id WHERE d.district_id=$1 AND s.status=$2',
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