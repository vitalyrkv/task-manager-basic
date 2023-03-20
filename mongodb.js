const { MongoClient, ObjectId } = require('mongodb')

//define connection url and database to connect to 
const url = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if(error) return console.log('Unable to connect ot database')

    console.log('Connected')
    const db = client.db(databaseName)


    db.collection('users').deleteOne({
        name: 'new name for Yasya'
    }).then(result => {
        console.log(result)
    }).catch(e => {
        console.log('Error: '+e)
    })

    db.collection('tasks').insertMany([
        {
            description: 'Clean the house',
            completed: false
        }, {
            description: 'Do laundry',
            completed: false
        }, {
            description: 'Do grocery',
            completed: true
        }],(error, result) => {
        if(error) return console.log('Unable to insert documents')
    })

    db.collection('users').insertOne({
        _id: id,
        name: 'Rohit',
        age: 28,
    }, (error, result) => {
        if(error) return console.log('Operation failed')
        console.log(result.insertedId) 
    })



    db.collection('users').findOne({ _id: new ObjectID('641248298d8d5df04ce73570') }, (error, user) => {
        if(error) return console.log('Unable to fetch')
        console.log(user)
    })

    db.collection('tasks').find({completed: false}).count((error, count)=>{
        console.log(count)
    })

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then(result => {
        console.log(result.modifiedCount)
    }).catch(e => {
        console.log('Error: '+e)
    })

    db.collection('tasks').updateOne({
        _id: new ObjectId('6412473a5fc69097a3742c9a')
    }, {
        $inc:{
            age: 1
        },
        $set:{
            name: 'new name for Yasya'
        }
    }).then(result => {
        console.log(result)
    }).catch(e => {
        console.log(e)
    })
})

