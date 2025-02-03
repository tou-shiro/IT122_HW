import mongoose from 'mongoose';
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git
//const connectionString = "mongodb+srv://dbuser:P@ssword@cluster0.mongodb.net/test?retryWrites=true";
const connectionString = "mongodb+srv://dbuser:P%40ssword@cluster0.0ukns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


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