function projectController($scope) {
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

  $scope.handleHeaderCheckbox = function(checked) {
    angular.forEach($scope.projects, function(project) {
      project.checked = checked;
    });
  };

  $scope.getTotalBudget = function() {
    var sum = 0;
    angular.forEach($scope.projects, function(project) {
      sum += project.budget;
    });
    return sum;
  };
}
