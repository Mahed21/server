const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const cors=require('cors');
const ObjectId=require('mongodb').ObjectId;
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(express.json());
app.use(cors());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pszjp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
      await client.connect();
      const database = client.db("yourhome");
      const userCollection = database.collection("home");
      const userMemberCollection = database.collection("member");
      
     console.log('connected');
    
     //get api
     app.get('/homes',async (req,res)=>
     {
       const cursor=userCollection.find ({})
       const users=await cursor.toArray();
       res.send(users);
     })

     //get single details of rent
     app.get('/homes/:id', async (req,res)=>
     {
       const id =req.params.id;
       const query={_id: ObjectId(id)};
       const user =await userCollection.findOne(query);
       res.send(user);
     })
    //post rent from client side to database
     app.post('/homes', async (req,res)=>
     {
       
       const newUser = req.body;
       const result = await userCollection.insertOne(newUser);
        console.log('hitting the post',req.body);
        res.json(result);
     })
     //get all member from database
     app.get('/member',async (req,res)=>
     {
       const cursor=userMemberCollection.find ({})
       const users=await cursor.toArray();
       res.send(users);
     })
     //post member from client side by admin
     app.post('/member', async (req,res)=>
     {
       
       const newUser = req.body;
       const result = await userMemberCollection.insertOne(newUser);
        console.log('hitting the post',req.body);
        res.json(result);
     })
    
  
     
  
    
  
     
  
      //console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      //await client.close();
    }
  }
  run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//YourHome
//8yBoPCyYoZZKli2v