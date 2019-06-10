const express = require('express');
const router = express.Router();
const User = require('../db/user');
const Sticker = require('../db/sticker');

router.get('/:id', (req, res) => {
  if (!isNaN(req.params.id)) {
    res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    res.set('Access-Control-Allow-Credentials', 'true');
    User.getOne(req.params.id).then(user => {
      if (user) {
        delete user.password;
        res.json(user);
      } else {
        resError(res, 404, "User Not Found");
      }
    });
  } else {
    resError(res, 500, "Invalid ID");
  }
});

router.get('/:id/sticker', (req,res)=>{
  if (!isNaN(req.params.id)) {
    res.set('Access-Control-Expose-Headers', 'Access-Control-Allow-Origin');
    res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    res.set('Access-Control-Allow-Credentials', 'true');
    Sticker.getByUser(req.params.id).then(stickers => {
      res.json(stickers);
    });
  } else {
    resError(res, 500, "Invalid ID");
  }
})

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
