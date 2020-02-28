const db = require('../database/dbConfig.js')
// export helpers
module.exports = {
    // helpers
    find,
    findById,
    add,
    findBy,
    remove
}

function find() {
    return db('users').select('id', 'username')
}

function findById(id) {
    return db('users').where({ id }).first()
}

function add(user) {
    return db('users').insert(user, 'id')
        .then((ids) => {
            const [id] = ids
            return findById(id)
        })
}

function findBy(filter) {
    return db('users').select('id', 'username', 'password').where(filter)
}

function remove(id) {
    return db('users').where({ id }).first().delete()
}

