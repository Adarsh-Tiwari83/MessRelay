const mongoose = require("mongoose");


const mealSchema = new mongoose.Schema({
  items: [{ type: String, required: true }],
  rating: [{
    student: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    value:{type: String, required: true, enum: ["good", "average", "bad"]},
  }],
});

const daySchema = new mongoose.Schema({
  breakfast: mealSchema,
  lunch: mealSchema,
  snacks: mealSchema,
  dinner: mealSchema,
});


// Define the mess menu schema
const messMenuSchema = new mongoose.Schema({
  sunday: { type: daySchema, required: true },
  monday: { type: daySchema, required: true },
  tuesday: { type: daySchema, required: true },
  wednesday: { type: daySchema, required: true },
  thursday: { type: daySchema, required: true },
  friday: { type: daySchema, required: true },
  saturday: { type: daySchema, required: true },
});

// Define the hostel schema
const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  warden:{
    type: String,
  },
  accountant:{
    type: String,
  },
  messMenu: { type: messMenuSchema},
  complaints:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
    }
  ],
});

module.exports = mongoose.model("Hostel", hostelSchema);