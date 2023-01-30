# Helsinki city bike app
## Front-end UI made with React

### Requirements
- Git, NodeJS, Npm
- [bikeApp-backend](https://github.com/Hnes-co/bikeApp-backend)

### Usage
- Clone repository, install modules & run the app:
```bash
$ git clone https://github.com/Hnes-co/bikeApp-frontend.git
$ cd bikeApp-frontend
$ npm install
$ npm start
```
- Open web browser at http://localhost:3000/
- To access journeys and stations from the database you need to also install & run [bikeApp-backend](https://github.com/Hnes-co/bikeApp-backend)

### Features
#### Journey list view 
- Pagination 
- Ordering per column 
- Filtering by departure/return station
#### Station list view 
- Filtering
#### Single station view 
- Name, address
- Number of journeys starting from and ending at the station
- Station location on the map
### E2E tests with cypress
#### How to run the tests: 
- Start the server and front-end
- In bikeApp-frontend/ run the test script:
```bash
$ npm run cypress:open
OR
$ npm run cypress:run
```
- cypress:open runs tests with graphical test runner
- cypress:run runs tests in the command line

