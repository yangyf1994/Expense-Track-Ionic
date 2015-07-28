angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
   $scope.expenses = [{
        by: 'me',
        label: 'test',
        cost: 10
    }];

    $scope.addExpense = function(e) {
        $scope.expenses.push({
            by: 'test',
            label: $scope.label,
            cost: $scope.cost
        });
        $scope.label = "";
        $scope.cost = 0;
    };

     $scope.getTotal = function() {
        var rtnTotal = 0;
        for (var i = 0; i < $scope.expenses.length; i++) {
            rtnTotal += $scope.expenses[i].cost;
        }
        return rtnTotal;
    };
})

.controller('FriendsCtrl', function($scope) {

    $scope.expenses = [{
        by: 'me',
        label: 'test',
        cost: 10
    }];

    $scope.getTotal = function() {
        var rtnTotal = 0;
        for (var i = 0; i < $scope.expenses.length; i++) {
            rtnTotal += $scope.expenses[i].cost;
        }
        return rtnTotal;
    };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
