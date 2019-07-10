# indian-banks-fyle
REST API build using Node.js to fetch details of banks and bank-branches

## Heroku instance
https://indian-banks-fyle.herokuapp.com

## Notes
- Please install jq before running scripts/curl-script.sh
- For now, static username and password is used to authenticate user to get access to token
- username and password is "fyle"
- limits and offset are optional params to each API Endpoint

## API Endpoints
- ```/``` Base URL for app
- ```/authenticate``` to authenticate user using - {username: "fyle", password: "fyle"}
- ```/api/banks``` to get all bank ids and names
- ```/api/banksByName/:name``` to get bank details by bank name
- ```/api/banksByIfsc/:ifsc``` to get bank details by bank ifsc
- ```/api/banksByNameAndCity/:name/:city``` to get bank details given name and its city

## Additional

- Use ```?limit=<value>``` and/or ```?offset=<value>``` for putting limit and/or offset to results for each of the endpoints
