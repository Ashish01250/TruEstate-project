const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const Sale = require("../models/Sale");

const MONGO_URI = process.env.MONGO_URI;
const CSV_PATH = path.join(__dirname, "..", "..", "data", "sales.csv");
const BATCH_SIZE = 1000;

function parseNumber(value) {
  if (value === undefined || value === null || value === "") return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
}

function parseDate(value) {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  return d;
}

function mapRowToDoc(row) {
  const doc = {
    customerId: row["Customer ID"] || row["customerId"],
    customerName: row["Customer Name"] || row["customerName"],
    phoneNumber: row["Phone Number"] || row["phoneNumber"],
    gender: row["Gender"] || row["gender"],
    age: parseNumber(row["Age"] || row["age"]),
    customerRegion: row["Customer Region"] || row["customerRegion"],
    customerType: row["Customer Type"] || row["customerType"],
    productId: row["Product ID"] || row["productId"],
    productName: row["Product Name"] || row["productName"],
    brand: row["Brand"] || row["brand"],
    productCategory: row["Product Category"] || row["productCategory"],
    tags:
      row["Tags"] || row["tags"]
        ? String(row["Tags"] || row["tags"])
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    quantity: parseNumber(row["Quantity"] || row["quantity"]),
    pricePerUnit: parseNumber(
      row["Price Per Unit"] || row["pricePerUnit"]
    ),
    discountPercentage: parseNumber(
      row["Discount Percentage"] || row["discountPercentage"]
    ),
    totalAmount: parseNumber(row["Total Amount"] || row["totalAmount"]),
    finalAmount: parseNumber(row["Final Amount"] || row["finalAmount"]),
    date: parseDate(row["Date"] || row["date"]),
    paymentMethod: row["Payment Method"] || row["paymentMethod"],
    orderStatus: row["Order Status"] || row["orderStatus"],
    deliveryType: row["Delivery Type"] || row["deliveryType"],
    storeId: row["Store ID"] || row["storeId"],
    storeLocation: row["Store Location"] || row["storeLocation"],
    salespersonId: row["Salesperson ID"] || row["salespersonId"],
    employeeName: row["Employee Name"] || row["employeeName"],
  };

  Object.keys(doc).forEach((k) => {
    if (doc[k] === undefined || doc[k] === null || doc[k] === "") {
      delete doc[k];
    }
  });

  return doc;
}

async function importCsv() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  await Sale.deleteMany({});
  console.log("Old data cleared");

  let batch = [];
  let totalInserted = 0;

  await new Promise((resolve, reject) => {
    const stream = fs.createReadStream(CSV_PATH).pipe(csv());

    stream
      .on("data", async (row) => {
        stream.pause();

        const doc = mapRowToDoc(row);
        batch.push(doc);

        if (batch.length >= BATCH_SIZE) {
          try {
            await Sale.insertMany(batch);
            totalInserted += batch.length;
            console.log("Inserted so far:", totalInserted);
            batch = [];
          } catch (err) {
            reject(err);
          }
        }

        stream.resume();
      })
      .on("end", async () => {
        try {
          if (batch.length > 0) {
            await Sale.insertMany(batch);
            totalInserted += batch.length;
          }
          console.log("Import completed. Total inserted:", totalInserted);
          resolve();
        } catch (err) {
          reject(err);
        }
      })
      .on("error", (err) => {
        reject(err);
      });
  });

  await mongoose.disconnect();
  process.exit(0);
}

importCsv().catch((err) => {
  console.error("Import failed", err);
  mongoose.disconnect().then(() => process.exit(1));
});
