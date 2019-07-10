# Required: Install jq to parse json output (for mac)
# for windows/linux please install jq separately.
printf "Installing jq for mac to parse json output"
brew install jq
printf "\n\n"

# Heroku instance for REST API
printf "Heroku instance"
url='https://indian-banks-fyle.herokuapp.com'
printf "\n\n"

# Will be obtanined after authentication
token=''

# Required headers
h1='Content-Type: application/json'

# accessing index page: https://indian-banks-fyle.herokuapp.com/
printf "Index page output = "
curl -H "$h1" ${url}
printf "\n\n"

# Authenticating to receive token: https://indian-banks-fyle.herokuapp.com/authenticate
printf "Token = "
# Static username and password for authentication to get token
token=$(curl -s -H "$h1" -d '{"username": "fyle", "password": "fyle"}' -X POST "$url/authenticate" | jq '.token')
printf "$token"
printf "\n\n"

# Currently token is: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTYyNzQyMDk2LCJleHAiOjE1NjI3NDkyOTZ9.KTiEYBInUjeH77Wh5Ww062kxyHSMAbeWDVD0IEmC0zE'

# get all banks with token and offset as 1: https://indian-banks-fyle.herokuapp.com/api/banks?offset=1
printf "get all banks with offset as 1 = "
curl -H "$h1" -H "access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTYyNzQyMDk2LCJleHAiOjE1NjI3NDkyOTZ9.KTiEYBInUjeH77Wh5Ww062kxyHSMAbeWDVD0IEmC0zE" "$url/api/banks?offset=1"
printf "\n\n"

# get all details of bank - ABHYUDAYA COOPERATIVE BANK LIMITED using https://indian-banks-fyle.herokuapp.com/api/banksByName/ABHYUDAYA%20COOPERATIVE%20BANK%20LIMITED?limit=10
# with limit as 10 and offset as 1
printf "get all details of ABHYUDAYA COOPERATIVE BANK LIMITED with limit 10 and offset 1 = "
curl -H "$h1" -H "access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTYyNzQyMDk2LCJleHAiOjE1NjI3NDkyOTZ9.KTiEYBInUjeH77Wh5Ww062kxyHSMAbeWDVD0IEmC0zE" "$url/api/banksByName/ABHYUDAYA%20COOPERATIVE%20BANK%20LIMITED?limit=10"
printf "\n\n"

# get all banks details of IFSC ABHY0065001 with limit as 10 using https://indian-banks-fyle.herokuapp.com/api/banksByIfsc/ABHY0065001?limit=10
printf "get all banks details of IFSC ABHY0065001 with limit as 10 and no offset = "
curl -H "$h1" -H "access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTYyNzQyMDk2LCJleHAiOjE1NjI3NDkyOTZ9.KTiEYBInUjeH77Wh5Ww062kxyHSMAbeWDVD0IEmC0zE" "$url/api/banksByIfsc/ABHY0065001?limit=10"
printf "\n\n"

# get all details of bank with city and bank name for "ABHYUDAYA COOPERATIVE BANK LIMITED"
# present in "MUMBAI" city with no limits or offset using http://localhost:3000/api/banksByNameAndCity/ABHYUDAYA%20COOPERATIVE%20BANK%20LIMITED/MUMBAI
printf "get all details of ABHYUDAYA COOPERATIVE BANK LIMITED bank in MUMBAI city without limits and offset = "
curl -H "$h1" -H "access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTYyNzQyMDk2LCJleHAiOjE1NjI3NDkyOTZ9.KTiEYBInUjeH77Wh5Ww062kxyHSMAbeWDVD0IEmC0zE" "$url/api/banksByNameAndCity/ABHYUDAYA%20COOPERATIVE%20BANK%20LIMITED/MUMBAI"
printf "\n\n"
