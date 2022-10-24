async function CourseSearch(req, CourseSchema) {
    return await CourseSchema.find({ title: req }).exec();
}

module.exports = CourseSearch;