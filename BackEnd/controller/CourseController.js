const Course = require('../models/CourseSchema');

async function CourseSearch(req, res) {
    var PriceFilter = req.query.price;
    var RatingFilter = req.query.rating;
    var SubjectFilter = req.query.subject;
    var userSearch = req.query.keyword;
    var CurrentPage = req.query.page ? req.query.page : 1;
    var queryCondition = {};
    var filterResults = null;
  
    if (PriceFilter == null && RatingFilter == null && SubjectFilter == null) {
      var searchResults = await Course.find({
        $or: [{ title: { $regex: userSearch, $options: "i" } },
        { subject: { $regex: userSearch, $options: "i" } },
        { instructorName: { $regex: userSearch, $options: "i" } }]
      }).skip((CurrentPage - 1) * 5).limit(5);
      res.send({ searchResults: searchResults });  }
    else {
      if (PriceFilter != null) {
        queryCondition.price = PriceFilter;
      }
      if (RatingFilter != null) {
        queryCondition.rating = RatingFilter;  
      }
      if (SubjectFilter != null) {
        if( typeof SubjectFilter === 'string') {
          queryCondition.subject = SubjectFilter;
          // console.log(queryCondition);
        }else{
          queryCondition.subject= {$in:SubjectFilter};
          // console.log(queryCondition); 
        }
      }
      filterResults = await Course.find({
        $or: [{ title: { $regex: userSearch, $options: "i" } },
        { subject: { $regex: userSearch, $options: "i" } },
        { instructorName: { $regex: userSearch, $options: "i" } }]
      }).
        and(queryCondition)
        .skip((CurrentPage - 1) * 5).limit(5);
      res.send(filterResults);
    }
}
async function GetPrice (req, res) {
  var y = await Course.find({ "_id": req.query.id }).select("price");
  console.log(y);
  res.send(y);
}

module.exports = {CourseSearch,GetPrice};