const faunadb = require('faunadb')
const q = faunadb.query

var client = new faunadb.Client({ sercret: process.env.FAUNA})