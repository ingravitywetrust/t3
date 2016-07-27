var sidebar = require('../helpers/sidebar'),
    ImageModel = require('../models').Image; //could also be ('..models/image')
module.exports = {
  index: function(req, res) {
    //res.render('index');
    //res.send('The home:index controller');
    var viewModel = {
      images: []
    };
    ImageModel.find({}, {}, { sort: { timestamp: -1 }},
      function(err, images) {
        if (err) { throw err; }

    viewModel.images = images;
    sidebar(viewModel, function(viewModel) {
      res.render('index', viewModel);
          });
      });
    }
  };

    /*var viewModel = {
    images: [
        {
            uniqueId:       1,
            title:          'Sample Image 1',
            description:    'Nice pic',
            filename:       'sample1.jpg',
            views:          1,
            likes:          2,
            timestamp:      Date.now
        }, {
            uniqueId:       2,
            title:          'Sample Image 2',
            description:    'Another nice one',
            filename:       'sample2.jpg',
            views:          0,
            likes:          0,
            timestamp:      Date.now
        }, {
            uniqueId:       3,
            title:          'Sample Image 3',
            description:    '',
            filename:       'sample3.jpg',
            views:          0,
            likes:          0,
            timestamp:      Date.now
        }, {
            uniqueId:       4,
            title:          'Sample Image 4',
            description:    '',
            filename:       'sample4.jpg',
            views:          0,
            likes:          0,
            timestamp:      Date.now
        }
    ]
};
*/
//res.render('index', viewModel);
//  sidebar(viewModel, function(viewModel) {
  //  res.render('index', viewModel);
  //});
