const express = require("express");
const { login, register, addComplaint, myComplaints, updateComplaint, deleteComplaint, myProfile, getAllComplaints, addUpdateComment, deleteComment, upvoteComplaint, downvoteComplaint, rateMeal, logout } = require("../controllers/StudentController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route('/logout').get(isAuthenticated,logout);
router.route("/profile").get(isAuthenticated, myProfile);
router.route('/complaint').post(isAuthenticated,addComplaint).get(isAuthenticated,myComplaints);
router.route("/complaint/:id").put(isAuthenticated,updateComplaint).delete(isAuthenticated,deleteComplaint);
router.route('/upvoteComplaint/:id').get(isAuthenticated,upvoteComplaint);
router.route('/downvoteComplaint/:id').get(isAuthenticated,downvoteComplaint);
router.route('/allComplaints').get(isAuthenticated,getAllComplaints);
router.route('/complaint/comment/:id').post(isAuthenticated,addUpdateComment).delete(isAuthenticated,deleteComment);
router.route('/rate-meal').post(isAuthenticated,rateMeal);
module.exports = router;
