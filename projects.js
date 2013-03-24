function projectController($scope, $http) {
  $scope.projects = [
    {
      "id": 1,
      "title": "Violent Mummy Training",
      "budget": 20123
    }, {
      "id": 21,
      "title": "My Little Pirate DS",
      "budget": 41266
    }, {
      "id": 37,
      "title": "Regal Bazooka Dystopia",
      "budget": 21214
    }, {
      "id": 44,
      "title": "Intellectual Train Pro",
      "budget": 66243
    }, {
      "id": 50,
      "title": "John Romero's Bass Maniac",
      "budget": 22999
    }, {
      "id": 12,
      "title": "Wrath of the Weight Loss - The Dark Project",
      "budget": 20000
    }
  ];

  $scope.loading = false;

  $scope.notification = {};

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

  $scope.deleteCheckedProjects = function() {
    var cleanedList = $scope.getCleanedList();
    $scope.loading = true;
    $scope.notification = { 'result': 'loading', 'message': 'Loading...' };
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
      .error(function(data, status, header) {
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
