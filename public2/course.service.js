/**
 * Created by bharathdn on 10/28/15.
 */
(function(){
    angular
        .module("CourseApp")
        .factory("CourseService", courseService);

    function courseService($http){
        //create an interface for anyone to use this

        var service = {
            createCourse: createcourse,
            readAllCourses: readAllCourses,
            readCourseById: readCourseById,
            deleteCourseById: deleteCourseById,
            updateCourseById: updateCourseById
        };

        return service;

        function readAllCourses(callback) {
            $http.get("/rest/course")
                .success(callback);
        }


        function createcourse() {

        }

        function readCourseById(id,callback){
            $http.get("/rest/course/"+id)
                .success(callback);

        }

        function deleteCourseById(){

        }

        function updateCourseById(){

        }
    }

})();