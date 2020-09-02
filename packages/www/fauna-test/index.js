const faunadb = require('faunadb')
const q = faunadb.query

console.log('emv:' + process.env.FAUNA)
var client = new faunadb.Client({ sercret: process.env.FAUNA})

async function run() {
    const results = await client.query(
        q.Create(q.Collection('todos'), {
            data: {
                text: 'whatever',
                done: false,
                owner: 'user-test'
            }
        })
    )
    console.log(results)
}

run()