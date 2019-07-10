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

## Snapshots
### Authentication
![Screenshot 2019-07-10 at 1 13 29 PM](https://user-images.githubusercontent.com/16608864/60950679-3a580b00-a315-11e9-8b91-b88d72210c11.png)

### Get All Banks
![Screenshot 2019-07-10 at 1 12 37 PM](https://user-images.githubusercontent.com/16608864/60950699-43e17300-a315-11e9-9951-499f71f8cfb0.png)


### Get Bank details by bank name
![Screenshot 2019-07-10 at 1 15 04 PM](https://user-images.githubusercontent.com/16608864/60950654-30360c80-a315-11e9-9735-da528f69298c.png)

### Get Bank details by bank ifsc
![Screenshot 2019-07-10 at 1 15 23 PM](https://user-images.githubusercontent.com/16608864/60950591-13013e00-a315-11e9-97de-b7c9185c27e8.png)

### Get Bank details by bank name and city
![Screenshot 2019-07-10 at 1 15 42 PM](https://user-images.githubusercontent.com/16608864/60950630-22808700-a315-11e9-833d-be1ed0989001.png) 
