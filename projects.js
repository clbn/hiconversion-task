function projectController($scope, $http) {
  $scope.projects = [];

  $scope.loading = false;

  $scope.notification = {};

  $scope.headerChecked = false;

  $scope.handleHeaderCheckbox = function(checked) {
    angular.forEach($scope.projects, function(project) {
      project.checked = checked;
    });
  };

  $scope.buttonDisabled = function() {
    var someChecked = false;
    angular.forEach($scope.projects, function(project) {
      if (project.checked) {
        someChecked = true;
      }
    });
    if (someChecked && !$scope.loading) {
      return false;
    } else {
      return true;
    }
  };

  $scope.getTotalBudget = function() {
    var sum = 0;
    angular.forEach($scope.projects, function(project) {
      sum += project.budget;
    });
    return sum;
  };

  $scope.loadProjects = function() {
    $scope.loading = true;
    $scope.notification = { 'result': 'loading', 'message': 'Loading projects...' };
    $http
      .get(
        './api/project/getRecent/'
      )
      .success(function(data) {
        $scope.loading = false;
        $scope.notification = { 'result': 'Ok', 'message': 'Projects successfully loaded' };
        $scope.headerChecked = false;
        $scope.projects = data.result;
      })
      .error(function(data, status) {
        $scope.loading = false;
        $scope.notification = { 'result': 'Error', 'message': 'Can\'t load projects: ' + status };
      });
  };

  $scope.deleteCheckedProjects = function() {
    var cleanedList = $scope.getCleanedList();
    $scope.loading = true;
    $scope.notification = { 'result': 'loading', 'message': 'Deleting projects...' };
    $http
      .post(
        './api/project/delete/',
        cleanedList
      )
      .success(function(data) {
        $scope.loading = false;
        $scope.notification = { 'result': data.result, 'message': data.message };
        if (data.result == 'Ok') {
          $scope.hideCheckedProjects();
        }
      })
      .error(function(data, status) {
        $scope.loading = false;
        $scope.notification = { 'result': 'Error', 'message': 'Can\'t delete projects: ' + status };
      });
  };

  $scope.hideCheckedProjects = function() {
    var oldProjects = $scope.projects;
    $scope.projects = [];
    angular.forEach(oldProjects, function(project) {
      if (!project.checked) {
        $scope.projects.push(project);
      }
    });
    $scope.headerChecked = false;
  }

  $scope.getCleanedList = function() {
    var cleanedList = [];
    angular.forEach($scope.projects, function(project) {
      var item = {
        "id": project.id,
        "title": project.title,
        "budget": project.budget
      };
      if (project.checked) {
        item.delete = 1;
      }
      cleanedList.push(item);
    });
    return cleanedList;
  }
}
