const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

//MiddleWare
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u9gmist.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const academyCollection = client.db('sportValy').collection('academy_list');
        const userCollection = client.db('sportValy').collection('user_list');
        const playerCollection = client.db('sportValy').collection('player_list');
        const matchCollection = client.db('sportValy').collection('user_matchs');
        const practiceCollection = client.db('sportValy').collection('practice_time');
       
        app.get('/academis', async(req, res) =>{
            const query = {};
            const cursor = academyCollection.find(query);
            const academis = await cursor.toArray();
            res.send(academis);
        });

        app.get('/academy/:id', async(req, res) =>{
            const id = req.params.id;
            const query={_id: ObjectId(id)};
            const academy = await academyCollection.findOne(query);
            res.send(academy);

        });

        app.post('/academis', async(req, res) =>{
            const newAcademy = req.body;
            const result = await academyCollection.insertOne(newAcademy);
            res.send(result);
        });

    
        
        //Get Player Profile
        app.get('/profile', async(req, res) =>{ 
            const email = req.query.email;
            const query = {email: email};
            const cursor = playerCollection.find(query);
            const player = await cursor.toArray();
            res.send(player);
        });
    
        

        app.get('/players', async(req, res) =>{ 
            const query = {};
            const cursor = playerCollection.find(query);
            const players = await cursor.toArray();
            res.send(players);
        });

        //Show Player Details
        app.get('/player/:id', async(req, res) =>{
            const id = req.params.id;
            const query={_id: ObjectId(id)};
            const player = await playerCollection.findOne(query);
            res.send(player);

        });


        // Playe Profile Add
        app.post('/players', async(req, res) =>{
            const newPlayer = req.body;
            const result = await playerCollection.insertOne(newPlayer);
            res.send(result);
        });

        //Update Profile
        app.put('/player/:id', async(req, res) =>{
            const id = req.params.id;
            const updatePlayer = req.body;
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true};
            const updatedDoc = {
                $set: {
                    total_matchs: updatePlayer.total_matchs
                    
                }
            };

            const result = await playerCollection.updateOne(filter, updatedDoc, options);
            res.send(result);


        });

        //Get Practice Time List 
        app.get('/practicetime', async(req, res) =>{ 
            const query = {};
            const cursor = practiceCollection.find(query);
            const matchs = await cursor.toArray();
            res.send(matchs);
        });


       // Post Practice Time Set 
       app.post('/practicetime', async(req, res) =>{
        const newPractice = req.body;
        const result = await practiceCollection.insertOne(newPractice);
        res.send(result);
    });

    // Practice Time Get
    app.get('/practice', async(req, res) =>{ 
        const email = req.query.email;
        const query = {email: email};
        const cursor = practiceCollection.find(query);
        const practice = await cursor.toArray();
        res.send(practice);
    });

    // Delete Practice
    app.delete('/practice/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await practiceCollection.deleteOne(query);
        res.send(result);

    })


        // Match Information
        app.post('/matchinfo', async(req, res) =>{
            const newMatch = req.body;
            const result = await matchCollection.insertOne(newMatch);
            res.send(result);
        });

        app.get('/matchinfo', async(req, res) =>{ 
            const query = {};
            const cursor = matchCollection.find(query);
            const matchs = await cursor.toArray();
            res.send(matchs);
        });

        app.get('/mymatchs', async(req, res) =>{ 
            const email = req.query.email;
            const query = {email: email};
            const cursor = matchCollection.find(query);
            const match = await cursor.toArray();
            res.send(match);
        });
    

        app.post('/players', async(req, res) =>{
            const newPlayer = req.body;
            const result = await playerCollection.insertOne(newPlayer);
            res.send(result);
        });

        //Academy Update
        app.put('/academy/:id', async(req, res) =>{
            const id = req.params.id;
            const updateAcademy = req.body;
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true};
            const updatedDoc = {
                $set: {
                    name: updateAcademy.name,
                    details: updateAcademy.details,
                    admission_fee: updateAcademy.admission_fee,
                    monthly_fee: updateAcademy.monthly_fee,
                    practice_schedule: updateAcademy.practice_schedule,
                    practice_time: updateAcademy.practice_time,
                    address: updateAcademy.address
                    
                }
            };

            const result = await academyCollection.updateOne(filter, updatedDoc, options);
            res.send(result);


        });


        app.put('/player/:id', async(req, res) =>{
            const id = req.params.id;
            const updatePlayer = req.body;
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true};
            const updatedDoc = {
                $set: {
                    email:updatePlayer.email,
                    name: updatePlayer.name,
                    team: updatePlayer.team,
                    date_of_birth: updatePlayer.date_of_birth,
                    role: updatePlayer.role,
                    batting_style: updatePlayer.batting_style,
                    bowling_style: updatePlayer.bowling_style,
                    total_matchs: updatePlayer.total_matchs,
                    total_runs: updatePlayer.total_runs,
                    total_wickets: updatePlayer.total_wickets,
                    highest_runs: updatePlayer.highest_runs,
                    highest_wickets: updatePlayer.highest_wickets,
                    profile_picture: updatePlayer.profile_picture,
                    photo1: updatePlayer.photo1,
                    photo2: updatePlayer.photo2,
                    photo3: updatePlayer.photo3,
                    
                }
            };

            const result = await playerCollection.updateOne(filter, updatedDoc, options);
            res.send(result);


        });
          

        app.post('/users', async(req, res) =>{
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        });


    }

    finally{


    }

}
run().catch(console.dir);


app.get('/' , (req, res)=>{
    res.send('The Server is Working Fine')
});

app.listen(port, () =>{
    console.log('Listing From This Port', port)
});