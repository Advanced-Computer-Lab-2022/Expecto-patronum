const Course = require('../models/CourseSchema');

async function CourseSearch(req, res) {
    var PriceFilter = req.query.price;
    var RatingFilter = req.query.rating;
    var SubjectFilter = req.query.subject;
    var userSearch = req.query.keyword;
    var CurrentPage = req.query.page ? req.query.page : 1;
    var queryCondition = {};
    var AllfilterResults = null;
 
    if (PriceFilter == null && RatingFilter == null && SubjectFilter == null) {
      var ALLsearchResults = await Course.find({
        $or: [{ title: { $regex: userSearch, $options: "i" } },
        { subject: { $regex: userSearch, $options: "i" } },
        { instructorName: { $regex: userSearch, $options: "i" } }]
      }).select({
        _id: 1,
        title: 1,
        courseHours: 1,
        price: 1 ,
        courseImage: 1,
        rating: 1,
        instructorName: 1,
        subject: 1,
        summary:1
      });
     var TotalCount=ALLsearchResults.length;
     var searchResults= ALLsearchResults.slice((CurrentPage - 1) * 5, CurrentPage * 5);
    //  var searchResults= ALLsearchResults.skip((CurrentPage - 1) * 5).limit(5);
      
      res.send({ searchResults: searchResults ,TotalCount:TotalCount});  }
    else {
      if (PriceFilter != null) {
        queryCondition.price = {$lte:PriceFilter};
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
      AllfilterResults = await Course.find({
        $or: [{ title: { $regex: userSearch, $options: "i" } },
        { subject: { $regex: userSearch, $options: "i" } },
        { instructorName: { $regex: userSearch, $options: "i" } }]
      }).
        and(queryCondition).select({
          _id: 1,
          title: 1,
          courseHours: 1,
          price: 1 ,
          courseImage: 1,
          rating: 1,
          instructorName: 1,
          subject: 1,
          summary:1
        });
        
        var TotalCount=AllfilterResults.length;
        var filterResults= AllfilterResults.slice((CurrentPage - 1) * 5, CurrentPage * 5);
      res.send({filterResults:filterResults,TotalCount:TotalCount});
    }
}
async function GetPrice (req, res) {
  var y = await Course.find({ "_id": req.query.id }).select("price");
  console.log(y);
  res.send(y);
}
async function GetCourse (req, res) {
  var y = await Course.find({ "_id": req.query.id });
  console.log(y);
  res.send(y);
}
module.exports = {CourseSearch,GetPrice,GetCourse};
