var fs = require('fs'),
    path = require('path'),
    sidebar = require('../helpers/sidebar'),
    Models = require('../models');
module.exports = {
  index: function(req,res) {
    //res.send('The image:index controller ' + req.params.image_id);
    //res.render('image');
    var viewModel = {
      image: {},
      comments: []
    };
    /*
    var viewModel = {
      image: {
          uniqueId:       1,
          title:          'Sample Image 1',
          description:    'This is a sample.',
          filename:       'sample1.jpg',
          views:          3,
          likes:          5,
          timestamp:      Date.now()
      },
      comments: [
        {
            image_id:   1,
            email:      'test@testing.com',
            name:       'Test Tester',
            gravatar:   'http://lorempixel.com/75/75/animals/1',
            comment:    'This is a test comment...',
            timestamp:  Date.now()
        },{
            image_id:   1,
            email:      'test@testing.com',
            name:       'Test Tester',
            gravatar:   'http://lorempixel.com/75/75/animals/2',
            comment:    'Another followup comment!',
            timestamp:  Date.now()
        }
      ]
    };
    */
    //res.render('image', viewModel);
    Models.Image.findOne({ filename: { $regex: req.params.image_id } },
      function(err, image) {
        if (err) { throw err; }
        if (image) {
          // to do...
          image.views = image.views + 1;
          viewModel.image = image;
          image.save();
          Models.Comment.find({ image_id: image._id}, {}, { sort: { 'timestamp': 1 }},
            function(err, comments){
              if (err) { throw err; }
              viewModel.comments = comments;
              sidebar(viewModel, function(viewModel) {
                res.render('image', viewModel);
              });
            }
          );
        } else {
          res.redirect('/');
        }
      });

  //sidebar(viewModel, function(viewModel) {
    //res.render('image', viewModel);
  //});
  },

  create: function(req,res) {
  //  res.send('The image:create POST controller');
  var saveImage = function() {

    var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
        imageUrl = '';
    for (var i=0; i<6; i++) {
      imageUrl += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    Models.Image.find({filename: imageUrl }, function(err, images) {
      if (images.length > 0) {
        saveImage();
      } else {

    //var tempPath = req.files[0].path,
      //  orig_file_name = req.files[0].originalname,
      //  ext = path.extname(req.files[0].originalname).toLowerCase(),
      //  targetPath = path.resolve('./public/upload/' + imageUrl + ext);

    var tempPath = req.file.path,
        orig_file_name = req.file.originalname,
        ext = path.extname(req.file.originalname).toLowerCase(),
        targetPath = path.resolve('./public/upload/' + imageUrl + ext);

    //res.send('tempPath: ' + tempPath + ' orig_file_name: ' + orig_file_name + ' ext: ' + ext + 'imageUrl'  + imageUrl);
//res.send('body: ' + req.body.title);
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {

          fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;

            //res.redirect('/images/'+ imageUrl);
            var newImg = new Models.Image({
                title: req.body.title,
                description: req.body.description,
                filename: imageUrl + ext
            });
            newImg.save(function(err, image) {
              console.log('Successfully inserted image: ' + image.filename);
              res.redirect('/images/' + image.uniqueId);
            });
          });
        } else {
          fs.unlink(tempPath, function () {
            if (err) throw err;
            res.json(501, {error: 'Only image files are allowed.'});
          });
        }
     }
    });
  };

  saveImage();

    },
  like: function(req,res) {
    //res.send('The image:like POST controller');
        res.json({likes: 1});
  },
  comment: function(req,res) {
    res.send('The image:comment POST controller');
  }
};
