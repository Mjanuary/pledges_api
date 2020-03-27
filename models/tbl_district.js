exports.districts = {
    cells: '',
    sectors: 'SELECT tbl_district.district_name AS district, tbl_sector.sector_name AS sector_name, tbl_sector.sector_id AS sector_id FROM tbl_district, tbl_sector WHERE tbl_district.district_id = tbl_sector.district_id AND tbl_district.system_access = true AND tbl_sector.status = true AND tbl_district.district_id = $1'
}