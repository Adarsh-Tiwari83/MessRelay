const cron = require("node-cron");
const Hostel = require("../models/hostel");
// Function to reset ratings
const resetRatings = async () => {
  try {
    const hostels = await Hostel.find();
    hostels.forEach((hostel) => {
      hostel.messMenu.forEach((day) => {
        day.breakfast.ratings = [];
        day.lunch.ratings = [];
        day.snacks.ratings = [];
        day.dinner.ratings = [];
      });
      hostel.save();
    });
    console.log("Ratings reset successfully.");
  } catch (err) {
    console.error("Error resetting ratings:", err);
  }
};

const resetRatingsCronJob = () => {
  // Schedule the cron job to reset ratings at midnight every day
  cron.schedule("0 0 * * *", () => {
    resetRatings();
  });
};

module.exports = resetRatingsCronJob;