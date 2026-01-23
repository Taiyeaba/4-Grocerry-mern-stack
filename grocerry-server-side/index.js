const { MongoClient, ServerApiVersion } = require('mongodb');
const admin = require("firebase-admin");
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000;

const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Multer setup (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });


require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());


const serviceAccount = require("./firebase.key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});




const uri = process.env.MONGODB_URI;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();
    const database = client.db('grocerryBD');
    const productcollection = database.collection('products');
    const addresscollection = database.collection('address');
    const orderscollection = database.collection('orders');
    const userscollection = database.collection('users');
     const reviewcollection = database.collection('review');


    
    // Cloudinary config (for img)
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    // Upload route
    app.post("/upload", upload.single("image"), async (req, res) => {
      try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const fileStr = req.file.buffer.toString("base64");
        const uploadResponse = await cloudinary.uploader.upload(
          `data:${req.file.mimetype};base64,${fileStr}`,
          { folder: "products" }
        );

        res.json({ url: uploadResponse.secure_url }); // frontend এর জন্য
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    });


    //custom middleware
    const verifyFBToken = async (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).send({ message: 'authorizedaccess' })
      }
      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).send({ message: 'authorizedaccess' })
      }
      //verify the token
      try {
        const decoded = await admin.auth().verifyIdToken(token);
        console.log("DECODED TOKEN 👉", decoded);
        req.decoded = decoded;
        next();
      }
      catch (error) {
        return res.status(403).send({ message: 'forbiddenaccess' })
      }


    }

    //admin middleware
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const user = await userscollection.findOne({ email });


      if (user?.role !== "admin") {
        return res.status(403).send({ message: "admin access only" });
      }
      next();
    };



   

   //  PUBLIC → All Products (no login needed)
app.get("/products/public", async (req, res) => {
  const products = await productcollection.find({ inStock: true }).toArray();
  res.send(products);
});



app.get("/products", verifyFBToken, async (req, res) => {
  try {
    const email = req.decoded.email;
    const dbUser = await userscollection.findOne({ email });

    if (!dbUser) {
      return res.status(403).send({ message: "User not found" });
    }

    let query = {};

    // 🟡 seller → only own products
    if (dbUser.role === "seller") {
      query = { sellerEmail: email };
    }

    // 🔴 admin → all products (query empty)

    const products = await productcollection.find(query).toArray();
    res.send(products);

  } catch (err) {
    res.status(500).send({ error: "Failed to fetch products" });
  }
});


     



    // GET → single product 
    const { ObjectId } = require('mongodb');

    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;

      const product = await productcollection.findOne({
        _id: new ObjectId(id)
      });

      res.send(product);
    });

    // POST → new product add
    app.post('/products', verifyFBToken, async (req, res) => {
      const product = req.body;

      const newProduct = {
        name: product.name,
        price: product.price,
        offerPrice: product.offerPrice,
        image: product.image,
        category: product.category,
        description: product.description,
        

        // ✅ THIS IS THE FIX
        addedBy: {
          role: product.addedBy?.role || "admin",
          storeName: product.addedBy?.storeName || "GroceryBD Official",
          
        },

        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        sellerEmail: product.sellerEmail || req.decoded.email,

      };

      const result = await productcollection.insertOne(newProduct);
      res.send({ insertedId: result.insertedId });
    });



    app.patch("/products/:id", async (req, res) => {
      const id = req.params.id;
      const { inStock } = req.body;

      const result = await productcollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { inStock } }
      );

      res.send(result);
    });

//new product patch.................
app.patch("/products/price/:id", verifyFBToken, async (req, res) => {
  const { id } = req.params;
  const { price, offerPrice } = req.body;

  const email = req.decoded.email;

  const product = await productcollection.findOne({
    _id: new ObjectId(id),
  });

  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }

  const dbUser = await userscollection.findOne({ email });

  //  security check
  if (
    dbUser.role !== "admin" &&
    product.sellerEmail !== email
  ) {
    return res.status(403).send({ message: "Forbidden" });
  }

  await productcollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        price,
        offerPrice,
        updatedAt: new Date(),
      },
    }
  );

  res.send({ success: true });
});



    // POST → Add new address
    app.post('/address', verifyFBToken, async (req, res) => {
      try {
        const address = req.body;
        const result = await addresscollection.insertOne({
          ...address,
          createdAt: new Date(),
        });
        // ✅ Return insertedId
        res.send({ insertedId: result.insertedId });
      } catch (error) {
        console.error("Add address error:", error);
        res.status(500).send({ error: "Failed to add address" });
      }
    });

    // GET → Fetch all addresses
    app.get('/address', verifyFBToken, async (req, res) => {
      try {
        const result = await addresscollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Fetch address error:", error);
        res.status(500).send({ error: "Failed to fetch addresses" });
      }
    });


    // POST → Add new order

    app.post("/orders", verifyFBToken, async (req, res) => {
      try {
        const order = req.body;


        order.userEmail = req.decoded.email;

        const result = await orderscollection.insertOne({
          ...order,
          createdAt: new Date(),
        });

        res.send({ insertedId: result.insertedId });
      } catch (error) {
        res.status(500).send({ error: "Failed to add order" });
      }
    });


    // GET → fetch all orders

app.get("/orders", verifyFBToken, async (req, res) => {
  try {
    const email = req.decoded.email;

    // 🔹 1. DB user খোঁজা
    const dbUser = await userscollection.findOne({ email });

    // 🔴 MUST GUARD
    if (!dbUser) {
      return res.status(403).send({ message: "User not found in DB" });
    }

    // 🟢 USER → শুধু নিজের order
    if (dbUser.role === "user") {
      const orders = await orderscollection
        .find({ userEmail: email })
        .toArray();
      return res.send(orders);
    }

    // 🟡 SELLER → নিজের product এর order
    if (dbUser.role === "seller") {
      const sellerProducts = await productcollection
        .find({ sellerEmail: email })
        .project({ _id: 1 })
        .toArray();

      const productIds = sellerProducts.map(p => p._id.toString());

      const orders = await orderscollection
        .find({ "items._id": { $in: productIds } })
        .toArray();

      return res.send(orders);
    }

    // 🔴 ADMIN → সব order (NO FILTER)
    if (dbUser.role === "admin") {
      const orders = await orderscollection.find().toArray();
      return res.send(orders);
    }

    // fallback
    res.send([]);

  } catch (error) {
    console.error("Orders error:", error);
    res.status(500).send({ error: "Failed to fetch orders" });
  }
});




    //was it logged in before
    app.post('/users', async (req, res) => {
      try {
        const { email, firstName, lastName, role } = req.body;

        const userExists = await userscollection.findOne({ email });

        if (userExists) {
          // 🔁 Update lastLogin + firstName/lastName if missing
          await userscollection.updateOne(
            { email },
            {
              $set: {
                lastLogin: new Date().toISOString(),
                firstName: firstName || userExists.firstName,
                lastName: lastName || userExists.lastName,
                role: role || userExists.role
              }
            }
          );
          return res.send({ message: "user already exists, updated", inserted: false });
        }

        // 🆕 New user insert
        const result = await userscollection.insertOne({
          email,
          firstName: firstName || "",
          lastName: lastName || "",
          role: role || "user",
          createdAt: new Date(),
          lastLogin: new Date().toISOString(),
        });

        res.send({ message: "user created", inserted: true, insertedId: result.insertedId });

      } catch (error) {
        console.error("User save error:", error);
        res.status(500).send({ error: "Failed to save user" });
      }
    });



  app.get("/users/:email", verifyFBToken, async (req, res) => {
  const email = req.params.email;

  // 🔐 SECURITY CHECK (MOST IMPORTANT)
  if (req.decoded.email !== email) {
    return res.status(403).send({ message: "Forbidden access" });
  }

  const user = await userscollection.findOne({ email });

  if (!user) {
    return res.status(404).send({ message: "User not found in DB" });
  }

  res.send(user);
});




  //profile
   app.patch("/users/:email", verifyFBToken, async (req, res) => {
  const email = req.params.email;
  const { firstName, lastName } = req.body;

  if (req.decoded.email !== email) {
    return res.status(403).send({ message: "forbidden" });
  }

  const result = await userscollection.updateOne(
    { email },
    {
      $set: {
        firstName,
        lastName,
        updatedAt: new Date(),
      },
    }
  );

  res.send({ success: true });
});

//dlt
app.delete("/users/:email", verifyFBToken, async (req, res) => {
  if (req.decoded.email !== req.params.email) {
    return res.status(403).send({ message: "forbidden" });
  }

  await userscollection.deleteOne({ email: req.params.email });
  res.send({ success: true });
});


    //reviews collection
     app.post("/reviews", verifyFBToken, async (req, res) => {
  const review = req.body;
  const email = req.decoded.email;

  const dbUser = await userscollection.findOne({ email });

  if (!dbUser) {
    return res.status(403).send({ message: "User not found" });
  }

  const newReview = {
    productId: new ObjectId(review.productId),
    productName: review.productName,
    reviewerEmail: email,
    reviewerRole: dbUser.role,
    rating: review.rating || 5,
    comment: review.comment,
    createdAt: new Date(),
  };

  const result = await reviewcollection.insertOne(newReview);
  res.send({ insertedId: result.insertedId });
});

  
app.get("/reviews/:productId", async (req, res) => {
  const productId = req.params.productId;

  const reviews = await reviewcollection
    .find({ productId: new ObjectId(productId) })
    .sort({ createdAt: -1 })
    .toArray();

  res.send(reviews);
});








    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('grocerry is getting!')
})

app.listen(port, () => {
  console.log(`grocerry server is running ${port}`)
})

