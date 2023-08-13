const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

//MiddleWare
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jur6pbr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const districtCollection = client.db("sportValy").collection("district_list");
    const academyCollection = client.db("sportValy").collection("academy_list");
    const categoryCollection = client
      .db("sportValy")
      .collection("category_list");
    const playerCollection = client.db("sportValy").collection("player_list");
    const videoCollection = client.db("sportValy").collection("video_list");
    const matchCollection = client.db("sportValy").collection("match_list");
    const productCollection = client.db("sportValy").collection("product_list");
    const variationCollection = client.db("sportValy").collection("variation_list");
    const cartCollection = client.db("sportValy").collection("cart");
    const orderCollection = client.db("sportValy").collection("order_list");

    app.get("/academies", async (req, res) => {
      const query = {};
      const cursor = academyCollection.find(query);
      const allAcademies = await cursor.toArray();
      res.send(allAcademies);
    });

    app.get("/academy/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const academy = await academyCollection.findOne(query);
      res.send(academy);
    });

    app.post("/academy", async (req, res) => {
      const newAcademy = req.body;
      const result = await academyCollection.insertOne(newAcademy);
      res.send(result);
    });

    //Distict
    app.get("/districts", async (req, res) => {
      const query = {};
      const cursor = districtCollection.find(query);
      const allDistrict = await cursor.toArray();
      res.send(allDistrict);
    });

    app.get("/district/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const district = await districtCollection.findOne(query);
      res.send(district);
    });

    app.post("/district", async (req, res) => {
      const newDistrict = req.body;
      const result = await districtCollection.insertOne(newDistrict);
      res.send(result);
    });

    //Videos
    app.get("/videos", async (req, res) => {
      const query = {};
      const cursor = videoCollection.find(query);
      const allVideos = await cursor.toArray();
      res.send(allVideos);
    });

    app.get("/video/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const video = await videoCollection.findOne(query);
      res.send(video);
    });

    app.post("/add-video", async (req, res) => {
      const addVideo = req.body;
      const result = await videoCollection.insertOne(addVideo);
      res.send(result);
    });

    //Get Player Profile
    app.get("/profile", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const cursor = playerCollection.find(query);
      const player = await cursor.toArray();
      res.send(player);
    });

    app.get("/players", async (req, res) => {
      const query = {};
      const cursor = playerCollection.find(query);
      const players = await cursor.toArray();
      res.send(players);
    });

    //Show Player Details
    app.get("/player/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const player = await playerCollection.findOne(query);
      res.send(player);
    });

    // Playe Profile Add
    app.post("/add-player", async (req, res) => {
      const newPlayer = req.body;
      const playerEmail = newPlayer.playerEmail;
    
      // Check if a player with the same email already exists
      const existingPlayer = await playerCollection.findOne({ playerEmail });
      if (existingPlayer) {
        return res.status(400).json({ message: "Player with the same email already exists" });
      }
    
      const result = await playerCollection.insertOne(newPlayer);
      res.send(result);
    });
    
    //Update Profile//////
    app.put("/update-total-matches/:id", async (req, res) => {
      const id = req.params.id;
      const updateProfile = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          totalMatches: updateProfile.totalMatches,
        },
      };

      const result = await playerCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.put("/update-total-runs/:id", async (req, res) => {
      const id = req.params.id;
      const updateProfile = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          totalRuns: updateProfile.totalRuns,
        },
      };

      const result = await playerCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    
    app.put("/update-total-wkts/:id", async (req, res) => {
      const id = req.params.id;
      const updateProfile = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          totalWickets: updateProfile.totalWickets,
        },
      };

      const result = await playerCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.put("/update-height-runs/:id", async (req, res) => {
      const id = req.params.id;
      const updateProfile = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          heightRuns: updateProfile.heightRuns,
        },
      };

      const result = await playerCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.put("/update-height-wkts/:id", async (req, res) => {
      const id = req.params.id;
      const updateProfile = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          heightWickets: updateProfile.heightWickets,
        },
      };

      const result = await playerCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.put("/edit-profile/:id", async (req, res) => {
      const id = req.params.id;
      const updateProfile = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          playerName: updateProfile.playerName,
          dateOfBirth: updateProfile.dateOfBirth,
          playerProfileImg: updateProfile.playerProfileImg,
          playerRole: updateProfile.playerRole,
          teamName: updateProfile.teamName,
          aboutPlayer: updateProfile.aboutPlayer,
        },
      };

      const result = await playerCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // Matchs
    app.post("/add-latest-match", async (req, res) => {
      const lastMatch = req.body;
      const result = await matchCollection.insertOne(lastMatch);
      res.send(result);
    });
    app.get("/matches", async (req, res) => {
      const query = {};
      const cursor = matchCollection.find(query);
      const matches = await cursor.toArray();
      res.send(matches);
    });

    app.get("/match/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const player = await matchCollection.findOne(query);
      res.send(player);
    });

    app.put("/match/:id", async (req, res) => {
      const id = req.params.id;
      const updatePlayer = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          total_matchs: updatePlayer.total_matchs,
        },
      };

      const result = await matchCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    //Get Practice Time List
    app.get("/practicetime", async (req, res) => {
      const query = {};
      const cursor = practiceCollection.find(query);
      const matchs = await cursor.toArray();
      res.send(matchs);
    });

    // Post Practice Time Set
    app.post("/practicetime", async (req, res) => {
      const newPractice = req.body;
      const result = await practiceCollection.insertOne(newPractice);
      res.send(result);
    });

    // Practice Time Get
    app.get("/practice", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const cursor = practiceCollection.find(query);
      const practice = await cursor.toArray();
      res.send(practice);
    });

    // Delete Practice
    app.delete("/practice/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await practiceCollection.deleteOne(query);
      res.send(result);
    });

    // Match Information
    app.post("/matchinfo", async (req, res) => {
      const newMatch = req.body;
      const result = await matchCollection.insertOne(newMatch);
      res.send(result);
    });

    app.get("/matchinfo", async (req, res) => {
      const query = {};
      const cursor = matchCollection.find(query);
      const matchs = await cursor.toArray();
      res.send(matchs);
    });

    app.get("/mymatchs", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const cursor = matchCollection.find(query);
      const match = await cursor.toArray();
      res.send(match);
    });

    app.post("/players", async (req, res) => {
      const newPlayer = req.body;
      const result = await playerCollection.insertOne(newPlayer);
      res.send(result);
    });

    //Academy Update
    app.put("/academy/:id", async (req, res) => {
      const id = req.params.id;
      const updateAcademy = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          name: updateAcademy.name,
          details: updateAcademy.details,
          admission_fee: updateAcademy.admission_fee,
          monthly_fee: updateAcademy.monthly_fee,
          practice_schedule: updateAcademy.practice_schedule,
          practice_time: updateAcademy.practice_time,
          address: updateAcademy.address,
        },
      };

      const result = await academyCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.put("/player/:id", async (req, res) => {
      const id = req.params.id;
      const updatePlayer = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          email: updatePlayer.email,
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
        },
      };

      const result = await playerCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    
    app.put("/player-last-match/:id", async (req, res) => {
      const id = req.params.id;
      const updateLastMatch = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          totalMatches: updateLastMatch.totalMatches,
          updated: updateLastMatch.updated,
          totalRuns: updateLastMatch.totalRuns,
          totalWickets: updateLastMatch.totalWickets
        },
      };

      const result = await playerCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    /***
     * Products and Categories
     * **/
    app.get("/categories", async (req, res) => {
      const query = {};
      const cursor = categoryCollection.find(query);
      const allCategories = await cursor.toArray();
      res.send(allCategories);
    });

    app.get("/category/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const category = await categoryCollection.findOne(query);
      res.send(category);
    });

    app.post("/add-category", async (req, res) => {
      const newCategory = req.body;
      const result = await categoryCollection.insertOne(newCategory);
      res.send(result);
    });

    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const allProducts = await cursor.toArray();
      res.send(allProducts);
    });

    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
    });

    app.post("/add-product", async (req, res) => {
      const newProduct = req.body;
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    });

    /***
     * Add to Cart
     * **/
    app.post("/add-to-cart", async (req, res) => {
      const product = req.body;
      const result = await cartCollection.insertOne(product);
      res.send(result);
    });

    app.get("/cart-items", async (req, res) => {
      const query = {};
      const cursor = cartCollection.find(query);
      const allProducts = await cursor.toArray();
      res.send(allProducts);
    });

    app.get("/cart/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const products = await cartCollection.findOne(query);
      res.send(products);
    });

    app.put("/cart/:id", async (req, res) => {
      const id = req.params.id;
      const cartUpdate = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          placedOrder: cartUpdate.placedOrder,
        },
      };

      const result = await cartCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.delete("/delete-cart-items", (req, res) => {
      const { customerEmail } = req.body;
      // Logic to delete cart items with the specified customerEmail from the database
      // Replace this with your own database logic

      // Example code using MongoDB and Mongoose
      CartItem.deleteMany({ customerEmail })
        .then(() => {
          res
            .status(200)
            .json({
              success: true,
              message: "Cart items deleted successfully",
            });
        })
        .catch((error) => {
          res.status(500).json({ success: false, error: error.message });
        });
    });

    /***
     * Orders
     * **/
    app.post("/new-order", async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.send(result);
    });

    app.get("/orders", async (req, res) => {
      const query = {};
      const cursor = orderCollection.find(query);
      const orders = await cursor.toArray();
      res.send(orders);
    });

     app.get("/order/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const order = await orderCollection.findOne(query);
      res.send(order);
    });

      app.put("/order/:id", async (req, res) => {
      const id = req.params.id;
      const status = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          orderStatus: status.orderStatus,
        },
      };

      const result = await orderCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

     /***
     * Product Variation
     * **/
     app.post("/add-variation", async (req, res) => {
      const newVariation = req.body;
      const result = await variationCollection.insertOne(newVariation);
      res.send(result);
    });

    app.get("/variations", async (req, res) => {
      const query = {};
      const cursor = variationCollection.find(query);
      const variations = await cursor.toArray();
      res.send(variations);
    });



  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("The Server is Working Fine");
});

app.listen(port, () => {
  console.log("Listing From This Port", port);
});
