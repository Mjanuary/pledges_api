const pool = require('../config/db');

module.exports = {
    getAllProvinces() {
        const query = {
            text: 'SELECT * FROM tbl_province WHERE state = $1',
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
    insertNewProvince({
        ...data
    }) {
        const query = {
            text: 'INSERT INTO tbl_province(province_id, province_name) VALUES($1, $2)',
            values: [data.id, data.province_name]
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
    updateProvince({
        ...data
    }) {
        const query = {
            text: 'UPDATE tbl_province SET province_name=$1, geo_location=$2 WHERE province_id=$3',
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
    getProvinceByname(name) {
        const query = {
            text: 'SELECT * FROM tbl_province WHERE LOWER(province_name)=LOWER($1)',
            values: [name]
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
    getProvinceById(id) {
        const query = {
            text: 'SELECT * FROM tbl_province WHERE province_id=$1',
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
    getProvinceDistrict(id) {
        const query = {
            text: 'SELECT d.district_id, d.district_name, d.geo_location FROM tbl_province p INNER JOIN tbl_district d ON p.province_id = d.province_id WHERE p.province_id=$1 and d.system_access=$2',
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