/**
 * If user provides limit and offset it will be
 * used else default value for limit will be
 * set to 10 with offset as 1
 * 
 * Valid token should be passed in header
 * with access-token as param
 */

/**
 * example query:
 * http://localhost:3000/api/banks?limit=100
 */
function getAllBanks(pool, request, response) {
  const limit = typeof(request.query.limit) === "undefined" ? 10 : request.query.limit;
  const offset = typeof(request.query.offset) === "undefined" ? 0 : request.query.offset;
  const query = `SELECT * FROM banks LIMIT ${limit} OFFSET ${offset};`;
  pool.query(query, (error, results) => {
    if (error) {
      return response.status(404).json(`records not found`);
    }
    return response.status(200).json(results.rows);
  })
}

/**
 * example query:
 * http://localhost:3000/api/banksByName/ABHYUDAYA%20COOPERATIVE%20BANK%20LIMITED?limit=100
*/
function getBankDetailsByName(pool, request, response) {
  const name = request.params.name;
  const limit = typeof(request.query.limit) === "undefined" ? 10 : request.query.limit;
  const offset = typeof(request.query.offset) === "undefined" ? 0 : request.query.offset;
  const query = `SELECT br.ifsc, br.bank_id, br.branch, br.address, br.city, br.district, br.state, ba.name
                FROM banks as ba
                JOIN branches as br ON ba.id = br.bank_id
                WHERE ba.name = '${name}' LIMIT ${limit} OFFSET ${offset};`;
  pool.query(query, (error, results) => {
    if (error) {
      return response.status(404).json(`record not found for '${name}'`)
    }
    return response.status(200).json(results.rows)
  })
}

/**
 * example query:
 * http://localhost:3000/api/banksByIfsc/ABHY0065001
 */
function getBankDetailsByIfsc(pool, request, response) {
  const ifsc = request.params.ifsc;
  const limit = typeof(request.query.limit) === "undefined" ? 10 : request.query.limit;
  const offset = typeof(request.query.offset) === "undefined" ? 0 : request.query.offset;
  const query = `SELECT br.ifsc, br.bank_id, br.branch, br.address, br.city, br.district, br.state, ba.name
                FROM banks as ba
                JOIN branches as br ON ba.id = br.bank_id
                WHERE br.ifsc = '${ifsc}' LIMIT ${limit} OFFSET ${offset};`;
  pool.query(query, (error, results) => {
    if (error) {
      return response.status(404).json(`record not found for '${ifsc}'`)
    }
    return response.status(200).json(results.rows)
  })
}

/**
 * example query:
 * http://localhost:3000/api/banksByNameAndCity/ABHYUDAYA%20COOPERATIVE%20BANK%20LIMITED/MUMBAI
 */
function getBankDetailsByNameAndCity(pool, request, response) {
  const name = request.params.name;
  const city = request.params.city;
  const limit = typeof(request.query.limit) === "undefined" ? 10 : request.query.limit;
  const offset = typeof(request.query.offset) === "undefined" ? 0 : request.query.offset;
  const query = `SELECT br.ifsc, br.bank_id, br.branch, br.address, br.city, br.district, br.state, ba.name
                FROM banks as ba
                JOIN branches as br ON ba.id = br.bank_id
                WHERE (ba.name = '${name}' AND br.city = '${city}') LIMIT ${limit} OFFSET ${offset};`;
  pool.query(query, (error, results) => {
    if (error) {
      return response.status(404).json(`record not found for '${name}' and '${city}'`)
    }
    return response.status(200).json(results.rows)
  })
}

module.exports = {
  getAllBanks,
  getBankDetailsByName,
  getBankDetailsByIfsc,
  getBankDetailsByNameAndCity
}
