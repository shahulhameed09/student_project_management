const express = require('express');
const router = express.Router();
const multer = require('multer');
let empmodel = require('../models/model')
let evaluatemodel = require('../models/evaluate')
const alert = require('alert')

const {
  ensureAuthenticated,
  forwardAuthenticated
} = require('../config/auth');

// Welcome Page

const products = [];

router.get('/', forwardAuthenticated, (req, res) => {
  res.render("login");
});


// Dashboard
router.get('/home', ensureAuthenticated, (req, res) =>
  empmodel.find({}, (err, data) => {
    if (err) {
      console.log("Error");
    } else {
      res.render('home', {
        user: req.user,
        data
      })
    }
  })
);

router.get('/staff_home', ensureAuthenticated, (req, res) =>
  empmodel.find({}, (err, data) => {
    if (err) {
      console.log("Error");
    } else {
      res.render('staff_home', {
        user: req.user,
        data
      })
    }
  })
);

router.get('/add-details', (req, res) => {
  res.render('add-file')
})

router.get('/staff_evaluate',ensureAuthenticated, (req, res) => {
  evaluatemodel.find({}, (err, data) => {
    if (err) {
      console.log("Error");
    } else {
      res.render('staff_evaluate', {
        user: req.user,
        data
      })
    }
  })
})

router.get('/project_details', (req, res) => {
  evaluatemodel.find({}, (err, data) => {
    if (err) {
      console.log("Error");
    } else {
      res.render('project_details', {
        user: req.user,
        data
      })
    }
  })
})

router.post('/project_details', async (req, res) => {
  let data = {
    BID: req.body.BID,
    Domain: req.body.Domain,
    Achievement: req.body.Achievement,
    PO: req.body.PO,
    PSO: req.body.PSO,
    Justification: req.body.Justification,
    user: req.user
  }
  evaluatemodel.create(data)
    .then((x) => {
      alert('Your Data has created on Database')
      res.redirect('/staff_evaluate')
    })
    .catch((y) => {
      alert('Your Data has not created on Database')
      res.redirect('/staff_evaluate')

    })
})

router.post('/delete_evaluate/:id', (req, res) => {
  evaluatemodel.deleteOne({ BID: req.params.id })
    .then((x) => {
      alert('Your Data has delete')
      res.redirect('/staff_evaluate')
    })
    .catch((y) => {
      console.log(y)
    })
})


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post('/add-details', upload.single('Operation'), async (req, res) => {
  let data = {
    BID: req.body.BID,
    USN: req.body.USN,
    Type: req.body.Type,
    Subject: req.body.Subject,
    Name: req.body.Name,
    Title: req.body.Title,
    Guide: req.body.Guide,
    user: req.user
  }
  if (req.file) {
    data.Operation = req.file.path
  }

  const BIDexist = await empmodel.findOne({ BID: data.BID })

  if (BIDexist) {
    alert('BID Already Exist')
  } else {
    empmodel.create(data)
      .then((x) => {
        alert('Your Data has created on Database')
        res.redirect('/home')
      })
      .catch((y) => {
        alert('Your Data has not created on Database')
        res.redirect('/home')

      })
  }
})


router.get('/edit/:id', (req, res) => {
  let readquery = req.params.id;

  empmodel.findOne({ Name: readquery })
    .then((x) => {
      res.render('update-file', { x })
    })

})


router.post('/edit/:id',ensureAuthenticated, upload.single('Operation'), (req, res) => {
  let readquery = req.params.id;
  let paath
  if (req.file) {
    paath = req.file.path
  } else {
    paath = req.body.Operation
  }
  empmodel.updateOne({ Name: readquery }, {
    $set: {
      BID: req.body.BID,
      USN: req.body.USN,
      Type: req.body.Type,
      Subject: req.body.Subject,
      Name: req.body.Name,
      Title: req.body.Title,
      Guide: req.body.Guide,
      Operation: paath
    }
  })
    .then((x) => {
      alert('Your Data has update')
      res.redirect('/home')
    })
    .catch((y) => {
      console.log(y)
    })
})
router.post('/delete/:id', (req, res) => {
  empmodel.deleteOne({ Name: req.params.id })
    .then((x) => {
      alert('Your Data has delete')
      res.redirect('/home')
    })
    .catch((y) => {
      console.log(y)
    })
})
module.exports = router;
