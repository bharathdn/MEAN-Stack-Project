(function(){
    angular
        .module("CourseApp",[])
        .controller("courseController",courseController);

    function courseController($scope,$http,CourseService){
        //call the service
        CourseService.readAllCourses(renderCourses);
        //CourseService.readSingleCourseByID
        $scope.selectCourse = selectCourse;
        $scope.removeCourse = removeCourse;

        function selectCourse(index){
            $scope.selectedCourseIndex = index;
            CourseService.readCourseById(index,function(response){
                $scope.course = response;
            })
        }

        function removeCourse(index){
            CourseService.deleteCourseById(index,renderCourses);
        }

        function renderCourses(response){
            $scope.courses = response;
        }
    }
})();