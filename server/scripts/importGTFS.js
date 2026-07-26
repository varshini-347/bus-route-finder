const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Route = require("../models/Route");
const Stop = require("../models/Stop");
const Trip = require("../models/Trip");
const StopTime = require("../models/StopTime");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

async function importFile(fileName, Model) {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "../gtfs", fileName))
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          await Model.deleteMany({});
          await Model.insertMany(results);
          console.log(`✅ Imported ${results.length} records into ${Model.modelName}`);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
  });
}

async function importGTFS() {
  try {
    await importFile("routes.txt", Route);
    await importFile("stops.txt", Stop);
    await importFile("trips.txt", Trip);
    await importFile("stop_times.txt", StopTime);

    console.log("🎉 All GTFS data imported successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

importGTFS();