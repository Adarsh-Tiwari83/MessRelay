const Hostel = require("../models/hostel"); 



exports.createHostel = async (req, res) => {
  try {
    const { name, warden, accountant, messMenu } = req.body;

    // Create a new hostel document
    const newHostel = new Hostel({
      name,
      warden,
      accountant,
      messMenu,
    });

    // Save the hostel to the database
    await newHostel.save();

    // Send a success response with the saved hostel
    res.status(201).json({
      success: true,
      newHostel,
      message: "Hostel created successfully",
    });
  } catch (error) {
    console.error("Error creating hostel:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the hostel",
      error: error.message,
    });
  }
};

exports.getAllHostels = async (req, res) => {
    try{
        const hostels = await Hostel.find();

        // Send a success response with the hostels
        res.status(200).json({
            success: true,
            hostels,
            message: "Hostels fetched successfully",
        });
    }
    catch(error){
        console.error("Error fetching hostels:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching hostels",
            error: error.message,
        });
    }
}

exports.updateHostel = async (req, res) => {
    try{
        const {name, warden, accountant, messMenu} = req.body;
        const hostelId = req.params.id;

        // Find the hostel by id
        const hostel = await Hostel.findById(hostelId);

        // Update the hostel document
        hostel.name = name;
        hostel.warden = warden;
        hostel.accountant = accountant;
        hostel.messMenu = messMenu;

        // Save the updated hostel document
        await hostel.save();

        // Send a success response with the updated hostel
        res.status(200).json({
            success: true,
            hostel,
            message: "Hostel updated successfully",
        });
    }
    catch(error){
        console.error("Error updating hostel:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the hostel",
            error: error.message,
        });
    }
}

exports.deleteHostel = async (req, res) => {
    try{
        const hostelId = req.params.id;

        await Hostel.findByIdAndDelete(hostelId);

        // Send a success response with the deleted hostel
        res.status(200).json({
            success: true,
            hostel,
            message: "Hostel deleted successfully",
        });
    }catch(error){
        console.error("Error deleting hostel:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the hostel",
            error: error.message,
        });
    }
}