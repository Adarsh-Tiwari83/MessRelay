const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middlewares/auth");

const { createHostel, getAllHostels, updateHostel, deleteHostel } = require('../controllers/AdminController');

router
  .route("/hostel")
  .get(isAuthenticated, isAdmin, getAllHostels)
  .post(isAuthenticated, isAdmin, createHostel);
router.route('/hostel/:id').put(isAuthenticated,isAdmin,updateHostel).delete(isAuthenticated,isAdmin,deleteHostel);

module.exports = router;