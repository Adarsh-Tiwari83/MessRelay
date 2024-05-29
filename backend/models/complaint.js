const mongoose=require('mongoose');

const complaintSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  upvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  downvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  hostel:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Hostel'
  },
  comments: [
    {
      student: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports=new mongoose.model('Complaint',complaintSchema);