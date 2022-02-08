const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const cors=require('cors');
const port = process.env.PORT || 5000

app.use(express.json());
app.use(cors());



const uri = "mongodb+srv://YourHome:8yBoPCyYoZZKli2v@cluster0.pszjp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
      await client.connect();
      const database = client.db("yourhome");
      const userCollection = database.collection("home");
     console.log('connected');
    
     //get api
     app.get('/homes',async (req,res)=>
     {
       const cursor=userCollection.find ({})
       const users=await cursor.toArray();
       res.send(users);
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