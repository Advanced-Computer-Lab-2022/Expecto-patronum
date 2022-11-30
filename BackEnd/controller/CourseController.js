const Course = require('../models/CourseSchema');

async function CourseSearch(req, res) {
  var PriceFilter = req.query.price;
  var RatingFilter = req.query.rating;
  var SubjectFilter = req.query.subject;
  var userSearch = req.query.keyword || "";
  var CurrentPage = req.query.page ? req.query.page : 1;
  var queryCondition = {};
  // var AllfilterResults = null;
  var FinalResult = null;

  function Filter() {
    if (PriceFilter != null) {
      queryCondition.discountPrice = { $lte: PriceFilter };
    }
    if (RatingFilter != null) {
      queryCondition.rating = RatingFilter;
    }
    if (SubjectFilter != null) {
      if (typeof SubjectFilter === 'string') {
        queryCondition.subject = SubjectFilter;
        // console.log(queryCondition);
      } else {
        queryCondition.subject = { $in: SubjectFilter };
        // console.log(queryCondition); 
      }
    }


  }

  Filter();
  console.log(Object.keys(queryCondition).length)
  console.log(userSearch);
  if (userSearch === "" && Object.keys(queryCondition).length === 0) {
    FinalResult = await Course.find().select({
      _id: 1,
      title: 1,
      courseHours: 1,
      price: 1,
      discount: 1,
      discountPrice: 1,
      courseImage: 1,
      rating: 1,
      instructorName: 1,
      subject: 1,
      summary: 1

    });;
  }
  else {
    if (userSearch !== "" && Object.keys(queryCondition).length !== 0) {
      FinalResult = await Course.find({
        $or: [{ title: { $regex: userSearch, $options: "i" } },
        { subject: { $regex: userSearch, $options: "i" } },
        { instructorName: { $regex: userSearch, $options: "i" } }]
      }).and(queryCondition).select({
        _id: 1,
        title: 1,
        courseHours: 1,
        price: 1,
        discount: 1,
        discountPrice: 1,
        courseImage: 1,
        rating: 1,
        instructorName: 1,
        subject: 1,
        summary: 1

      });


    } else {
      if (userSearch === "" && Object.keys(queryCondition).length !== 0) {
        FinalResult = await Course.find(queryCondition).select({
          _id: 1,
          title: 1,
          courseHours: 1,
          price: 1,
          discount: 1,
          discountPrice: 1,
          courseImage: 1,
          rating: 1,
          instructorName: 1,
          subject: 1,
          summary: 1

        });
      }
      else {
        if (userSearch !== "" && Object.keys(queryCondition).length === 0) {
          FinalResult = await Course.find({
            $or: [{ title: { $regex: userSearch, $options: "i" } },
            { subject: { $regex: userSearch, $options: "i" } },
            { instructorName: { $regex: userSearch, $options: "i" } }]
          }).select({
            _id: 1,
            title: 1,
            courseHours: 1,
            price: 1,
            discount: 1,
            discountPrice: 1,
            courseImage: 1,
            rating: 1,
            instructorName: 1,
            subject: 1,
            summary: 1

          });
        }
      }
    }
  }

  var TotalCount = FinalResult.length;
  var searchFilterResult = FinalResult.slice((CurrentPage - 1) * 5, CurrentPage * 5);
  //  var searchResults= ALLsearchResults.skip((CurrentPage - 1) * 5).limit(5);

  res.send({ FinalResult: searchFilterResult, TotalCount: TotalCount });

  // var TotalCount = ALLsearchResults.length;
  // var searchResults = ALLsearchResults.slice((CurrentPage - 1) * 5, CurrentPage * 5);
  //  var searchResults= ALLsearchResults.skip((CurrentPage - 1) * 5).limit(5);









  // if (PriceFilter == null && RatingFilter == null && SubjectFilter == null) {
  //   var ALLsearchResults = await Course.find({
  //     $or: [{ title: { $regex: userSearch, $options: "i" } },
  //     { subject: { $regex: userSearch, $options: "i" } },
  //     { instructorName: { $regex: userSearch, $options: "i" } }]
  //   }).select({
  //     _id: 1,
  //     title: 1,
  //     courseHours: 1,
  //     price: 1,
  //     discount: 1,
  //     discountPrice: 1,
  //     courseImage: 1,
  //     rating: 1,
  //     instructorName: 1,
  //     subject: 1,
  //     summary: 1
  //   });
  //   var TotalCount = ALLsearchResults.length;
  //   var searchResults = ALLsearchResults.slice((CurrentPage - 1) * 5, CurrentPage * 5);
  //   //  var searchResults= ALLsearchResults.skip((CurrentPage - 1) * 5).limit(5);

  //   res.send({ searchResults: searchResults, TotalCount: TotalCount });
  // }
  // else {
  //   if (PriceFilter != null) {
  //     queryCondition.discountPrice = { $lte: PriceFilter };
  //   }
  //   if (RatingFilter != null) {
  //     queryCondition.rating = RatingFilter;
  //   }
  //   if (SubjectFilter != null) {
  //     if (typeof SubjectFilter === 'string') {
  //       queryCondition.subject = SubjectFilter;
  //       // console.log(queryCondition);
  //     } else {
  //       queryCondition.subject = { $in: SubjectFilter };
  //       // console.log(queryCondition); 
  //     }
  //   }
  //   if (userSearch == null) {
  //     AllfilterResults = await Course.find(queryCondition).select({
  //       _id: 1,
  //       title: 1,
  //       courseHours: 1,
  //       price: 1,
  //       discount: 1,
  //       discountPrice: 1,
  //       courseImage: 1,
  //       rating: 1,
  //       instructorName: 1,
  //       subject: 1,
  //       summary: 1
  //     });
  //   }
  //   else {
  //     AlluserSearchfilterResults = await Course.find({
  //       $or: [{ title: { $regex: userSearch, $options: "i" } },
  //       { subject: { $regex: userSearch, $options: "i" } },
  //       { instructorName: { $regex: userSearch, $options: "i" } }]
  //     }).
  //       and(queryCondition).select({
  //         _id: 1,
  //         title: 1,
  //         courseHours: 1,
  //         price: 1,
  //         discount: 1,
  //         discountPrice: 1,
  //         courseImage: 1,
  //         rating: 1,
  //         instructorName: 1,
  //         subject: 1,
  //         summary: 1
  //       });
  //   }
  //   var TotalCount = AllfilterResults.length;
  //   var filterResults = AllfilterResults.slice((CurrentPage - 1) * 5, CurrentPage * 5);
  //   res.send({ filterResults: filterResults, TotalCount: TotalCount });
  // }
}

async function GetPrice(req, res) {
  var y = await Course.find({ "_id": req.query.id }).select("price");
  console.log(y);
  res.send(y);
}

async function GetCourse(req, res) {
  var y = await Course.find({ "_id": req.query.id });
  console.log(y);
  res.send(y);
}

async function CreateCourse(req, res) {

    const result = await Course.create({
      title: req.body.courseInfo.title,
      subject: req.body.courseInfo.subject,
      instructorName: 'Rodin Salem',
      price: req.body.courseInfo.price,
      level: req.body.courseInfo.level,
      courseHours: req.body.courseHours,
      summary: req.body.courseInfo.summary,
      subtitles: req.body.subtitles,
    });
    res.send(result);


  // const result = await Course.create({
  //   title: req.body.title,
  //   subject: req.body.subject,
  //   instructorName: req.body.instructorName,
  //   price: req.body.price,
  //   level: req.body.level,
  //   courseHours: req.body.courseHours,
  //   summary: req.body.summary,
  //   // skills: req.body.skills,
  //   // rating: req.body.rating,
  //   subtitles: req.body.subtitles,
  // }).then(result => { return result });
  // res.send(result);
}

async function GetAllCourses(req, res) {
  var result = await Course.find({});

  console.log(result);

  res.send(result);
}

async function GenerateCourses(req, res) {

  // for(var i = 0; i < courses.length; i++) {
  //   var subtitles = courses[i].subtitles;
  //   var courseHours = 0;

  //   subtitles.map((subtitle) => {
  //       subtitle.totalMinutes = 0;
  //       subtitle.contents.map((content) => {
  //           subtitle.totalMinutes += content.duration;
  //       })
  //       courseHours += subtitle.totalMinutes / 60;
  //   });

  //   var currency = courses[i].price;
  //   var number = Number(currency.replace(/[^0-9.-]+/g,""));

  //   await Course.create({
  //     title: courses[i].title,
  //     subject: courses[i].subject,
  //     instructorName: courses[i].instructorName,
  //     courseVideo: courses[i].courseVideo,
  //     discount: {
  //       discount: courses[i].discount.discount,
  //       startDate: courses[i].discount.startDate,
  //       endDate: courses[i].discount.endDate,
  //     },
  //     price: number,
  //     level: courses[i].level,
  //     courseHours: courseHours,
  //     summary: courses[i].summary,
  //     subtitles: courses[i].subtitles,
  //     rating: {
  //       one: courses[i].rating.one,
  //       two: courses[i].rating.two,
  //       three: courses[i].rating.three,
  //       four: courses[i].rating.four,
  //       five: courses[i].rating.five,
  //       avg: (courses[i].rating.one + courses[i].rating.two*2 + courses[i].rating.three*3 + courses[i].rating.four*4 + courses[i].rating.five*5) / (courses[i].rating.one + courses[i].rating.two + courses[i].rating.three + courses[i].rating.four + courses[i].rating.five),
  //     },
  //     review: courses[i].review,
  //     courseImage: courses[i].courseImage,
  //   });
  // }

  // res.send("success: " + courses.length);

  res.send("uncomment first an comment this line");
}

module.exports = { CourseSearch, GetPrice, GetCourse, CreateCourse, GetAllCourses, GenerateCourses };
