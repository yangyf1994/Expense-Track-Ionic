angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,fireBaseData,$firebase) {
   $scope.expenses = $firebase(fireBaseData.refExpenses()).$asArray();
   $scope.user = fireBaseData.ref().getAuth();

    $scope.addExpense = function(e) {
        $scope.expenses.$add({
            by: $scope.user.password.email,
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

.controller('FriendsCtrl', function($scope,fireBaseData, $firebase) {
    $scope.user = fireBaseData.ref().getAuth();
    $scope.expenses = $firebase(fireBaseData.refExpenses()).$asArray();
    $scope.roomies = $firebase(fireBaseData.refRoomMates()).$asArray();
    $scope.roomies.$loaded().then(function(array) {
        //array = [[set1_rm1_email, set1_rm2_email], [set2_rm1_email, set2_rm2_email] ...]
        for (var i = 0; i < array.length; i++) {
            if (array[i][0] === $scope.user.password.email) {
                $scope.roomiesEmail = array[i][1];
            } else if (array[i][1] === $scope.user.password.email) {
                $scope.roomiesEmail = array[i][0];
            }
        }
        console.log($scope.roomiesEmail);
        $scope.$apply();
        // NOTE: For simplicity, this demo only supports the 2-roommate use case
    });

    $scope.addExpense = function(e) {
        $scope.expenses.$add({
            by: $scope.roomiesEmail ,
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

.controller('AccountCtrl', function($scope,fireBaseData) {

  $scope.showLogin = false;
  $scope.user = fireBaseData.ref().getAuth();
  if(!$scope.user){
      $scope.showLogin = true;
  }

  $scope.login = function (em,pwd) {
    fireBaseData.ref().authWithPassword({
      email: em,
      password: pwd
    },function (err,authData) {
      if(err){
        console.log('cannot authenticate user '+err);
      }
      else
      {
        console.log("User ID: " + authData.uid +", Provider: " + authData.provider);
        $scope.user = fireBaseData.ref().getAuth();
        $scope.showLogin = false;
        $scope.$apply();
      }
    })
  }


    $scope.logout = function () {
        fireBaseData.ref().unauth();
        $scope.showLogin = true;
    };

});
