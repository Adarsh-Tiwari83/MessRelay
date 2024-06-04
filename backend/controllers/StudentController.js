const User = require("../models/user");
const Hostel = require("../models/hostel");
const Complaint = require("../models/complaint");


exports.register = async (req, res) => {
  try {
    const { name, email, password, role, hostel } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    if(role==='Admin'){
      if(email!==process.env.ADMIN_EMAIL){
        return res.status(400).json({ success:false,message: "Only admin can register as Admin" });
      }
      let user = await User.create({
        name,
        email,
        password,
        role,
      });
      const token = await user.generateToken();
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      return res.status(201).cookie("token", token, options).json({
        success: true,
        user,
        token,
      });
    }
    const userhostel = await Hostel.findOne({ name: hostel });
    console.log(userhostel);
    const user = await User.create({
      name,
      email,
      password,
      role,
      hostel: userhostel._id,
    });
    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "hostel complaints"
    );
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    console.log(user.hostel);
    const complaints = await Complaint.find({ hostel: user.hostel }).populate(
      "student comments.student"
    );
    console.log(complaints);
    res.status(200).json({ success: true, complaints });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addComplaint = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const newComplaint = new Complaint({
      title: req.body.title,
      description: req.body.description,
      image: "image_url",
      student: req.user._id,
      hostel: user.hostel,
    });
    await newComplaint.save();
    const hostel = await Hostel.findById(user.hostel);
    hostel.complaints.push(newComplaint._id);
    await hostel.save();
    user.complaints.push(newComplaint._id);
    await user.save();
    res.status(200).json({
      success: true,
      message: "Complaint added successfully",
      newComplaint,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.myComplaints = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("complaints");
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const hostel = await Hostel.findById(user.hostel);
    hostel.complaints = hostel.complaints.filter(
      (complaint) => complaint._id.toString() !== req.params.id
    );
    await hostel.save();
    user.complaints = user.complaints.filter(
      (complaint) => complaint._id.toString() !== req.params.id
    );
    await user.save();
    await Complaint.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    complaint.title = req.body.title;
    complaint.description = req.body.description;
    await complaint.save();
    res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.upvoteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (complaint.downvotes.includes(req.user._id)) {
      complaint.downvotes = complaint.downvotes.filter((user) => {
        console.log(user);
        user.toString() !== req.user._id;
      });
      await complaint.save();
    }

    if (complaint.upvotes.includes(req.user._id)) {
      complaint.upvotes = complaint.upvotes.filter((user) => {
        console.log(user);
        user.toString() !== req.user._id;
      });
      await complaint.save();
      res
        .status(200)
        .json({ success: true, message: "Upvote removed", complaint });
    } else {
      complaint.upvotes.push(req.user._id);
      await complaint.save();
      res
        .status(200)
        .json({ success: true, message: "Upvoted successfully", complaint });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.downvoteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (complaint.upvotes.includes(req.user._id)) {
      complaint.upvotes = complaint.upvotes.filter((user) => {
        console.log(user);
        user.toString() !== req.user._id;
      });
      await complaint.save();
    }

    if (complaint.downvotes.includes(req.user._id)) {
      complaint.downvotes = complaint.downvotes.filter((user) => {
        console.log(user);
        user.toString() !== req.user._id;
      });
      await complaint.save();
      res
        .status(200)
        .json({ success: true, message: "Downvote removed", complaint });
    } else {
      complaint.downvotes.push(req.user._id);
      await complaint.save();
      res
        .status(200)
        .json({ success: true, message: "Downvoted successfully", complaint });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.commentOnComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    complaint.comments.push({ text: req.body.text, student: req.user._id });
    await complaint.save();
    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addUpdateComment = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "post not found",
      });
    }
    let commentIndex = -1;

    complaint.comments.forEach((item, index) => {
      if (item.student.toString() === req.user._id.toString()) {
        commentIndex = index;
      }
    });

    if (commentIndex != -1) {
      complaint.comments[commentIndex].text = req.body.text;
      await complaint.save();
      return res.status(200).json({
        success: true,
        message: "comment updated",
        complaint,
      });
    } else {
      compalaint.comments.push({ student: req.user._id, text: req.body.text });
      await post.save();
      return res.status(200).json({
        success: true,
        message: "comment added",
        complaint,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "post not found",
      });
    }
    complaint.comments = complaint.comments.filter(
      (item) => item.student.toString() !== req.user._id.toString()
    );
    await complaint.save();
    return res.status(200).json({
      success: true,
      message: "comment deleted",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.rateMeal = async (req, res) => {
  try{
    const user=await User.findById(req.user._id);
    const hostel=await Hostel.findById(user.hostel);
    const day=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    const dayNumber=new Date().getDay();
    const meals=hostel.messMenu[day[dayNumber]];
    const mealType=req.body.mealType;
    const rating=req.body.rating;
  if (meals[mealType].rating.some(item => item.student.toString() === req.user._id.toString()) && meals[mealType].rating.some(item => item.value === rating)) {
      meals[mealType].rating=meals[mealType].rating.filter(item=>item.student.toString()!==req.user._id.toString());
      console.log(meals[mealType].rating);
      await hostel.save();
      return res.status(200).json({success:true,message:"Rating removed successfully"});
    }
    else if(meals[mealType].rating.some(item => item.student.toString() === req.user._id.toString())){
      meals[mealType].rating=meals[mealType].rating.map(item=>item.student.toString()===req.user._id.toString()?{student:req.user._id,value:rating}:item);
      console.log(meals[mealType].rating);
      await hostel.save();
      return res.status(200).json({success:true,message:"Rating updated successfully"});
    }
    else{
      meals[mealType].rating.push({student:req.user._id,value:rating});
      console.log(meals[mealType].rating);
      await hostel.save();
      res
        .status(200)
        .json({ success: true, message: "Meal rated successfully"});
    }
  }catch(error){
    res.status(500).json({ success: false, message: error.message });
  }
}