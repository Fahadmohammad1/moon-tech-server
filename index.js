require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://moonUser:AaTvo4cRtHhGNdtH@cluster0.uxnvnzb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("product");
    const productCollection = db.collection("productCollection");

    const blogDb = client.db("blogCollection");
    const blogCollection = blogDb.collection("blogs");

    // GET
    app.get("/products", async (req, res) => {
      const cursor = productCollection.find({});
      const product = await cursor.toArray();

      res.send({ status: true, data: product });
    });

    app.get("/blogs", async (req, res) => {
      const cursor = blogCollection.find({});
      const blog = await cursor.toArray();

      res.send({ status: true, data: blog });
    });

    //POST
    app.post("/product", async (req, res) => {
      const product = req.body;

      const result = await productCollection.insertOne(product);

      res.send(result);
    });

    app.post("/blog", async (req, res) => {
      const blog = req.body;

      const result = await blogCollection.insertOne(blog);

      res.send(result);
    });

    //DELETE
    app.delete("/blog/:id", async (req, res) => {
      const id = req.params.id;

      const result = await blogCollection.deleteOne({ _id: ObjectId(id) });

      res.send(result);
    });

    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;

      const result = await productCollection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello Juboraj vai server ashce deken");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
