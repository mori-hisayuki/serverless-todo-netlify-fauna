const faunadb = require('faunadb')
const q = faunadb.query

var client = new faunadb.Client({
    secret: process.env.FAUNA
})

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