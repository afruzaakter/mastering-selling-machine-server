const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

// ******************************************

const uri = "mongodb+srv://afruzaaktersonia1995:F999Aqtdj3IcJW3O@cluster0.xij4v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
 
    const userCollection = client.db("usersDB").collection('users');


    app.get('/users', async(req, res)=>{
        const cursor = userCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.post('/users', async(req, res) => {
       const user =  req.body
       console.log("new User", user);
       const result = await userCollection.insertOne(user);
       console.log(result);
       res.send(result);

     })
     
   

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// ******************************************


app.get('/', (req, res) => {
    res.send('User Management server is running');
})


app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
})