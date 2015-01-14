# CPSC 304 Project

A point-of-sale app for the AMS store.

## Technical Details

This is build as a modern web app with an API backend and a reactive, JavaScript,
frontend communicating with the RESTful API.

The backend is built in node.js using the koa framework, the successor to the
popular Express framework, which takes advantage of experimental JavaScript
features such as generators.

The frontend uses AngularJS, a Google-maintained, declarative framework offering
some of the most breaking-edge web technology such as two-way data bindings
(removing a lot of work from the developer to make the visual page match the
underlying data). It communicates with the API using REST over HTTP.

Together these offer a very fast, reactive and simple aproach to web app
development and have done very well for us as a team in completing this project.

## Installation

1. `git clone git@github.com:alexcrooks/cpsc304.git`
2. `cd cpsc304`
3. `make install`
4. Start your MySQL server
5. Create an empty database (the app will auto-migrate)
6. Edit `config.js` and fill in your database info
7. `cd public`
8. `make server`

## Running the app

1. `make run`
2. Visit localhost:3000 in your favourite web browser
3. In another terminal window, `cd public`
4. `make server`

## Requirements

The following are required in your terminal to successfully run the app:

To check if you have these, you can usually test with `name --version` or
`name -v`, where name is one of the strings below (e.g. `mysql`).

make mysql node npm grunt bower ruby compass

## Credits

Lynsey Haynes
12686119
a4h8
lynseyahaynes@gmail.com

Alex Crooks
34144121
v4o8
alex@alexcrooks.com

Jonathan Kwok
31933120
l7p8
jonafunkwok@gmail.com
