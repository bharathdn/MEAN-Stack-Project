(function(){
    angular
        .module("CourseApp",[])
        .controller("courseController",courseController);

    function courseController($scope,$http,CourseService){
        //call the service
        CourseService.readAllCourses(renderCourses);
        //CourseService.readSingleCourseByID

        function renderCourses(response){
            $scope.courses = response;
        }

        $scope.selectCourse = selectCourse;

        function selectCourse(index)
        {
            $scope.selectedCourseIndex = index;
            CourseService.readCourseById(index,function(response){
                $scope.course = response;
            })
        }
    }
})();