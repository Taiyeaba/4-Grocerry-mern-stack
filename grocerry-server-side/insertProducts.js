import { dummyProductsForMongo } from "./dummyProductsForMongo.js";
import axios from "axios";

const axiosSecure = axios.create({ baseURL: "http://localhost:3000" });

const insertAllProducts = async () => {
  for (const p of dummyProductsForMongo) {
    const res = await axiosSecure.post("/products", p);
    console.log("Inserted:", res.data.insertedId || res.data);
  }
};

insertAllProducts();
