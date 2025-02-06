import mongoose from 'mongoose';
const { Schema } = mongoose;

import { connectionString } from "./credential.js";



mongoose.connect(connectionString, {
    dbName: 'sccdata',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const carSchema = new Schema({
 model: { type: String, required: true },
 make: String,
 year: Number,
 color: String,
 mileage: Number
});

export const Car = mongoose.model('Car', carSchema); 