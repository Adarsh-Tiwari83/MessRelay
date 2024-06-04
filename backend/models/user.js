const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    select:false,
  },
  role: {
    type: String,
    enum: ["Student", "Admin", "Warden"],
    required: [true,"Please provide a role"],
  },
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hostel",
  },
  complaints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if(this.isModified('password')){
    this.password=await bcrypt.hash(this.password,12);
  }
  next();
});

userSchema.methods.matchPassword=async function(password){
  return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken=function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET);
}

const User=new mongoose.model('User',userSchema);

module.exports=User;