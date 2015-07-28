angular.module('starter.services', [])

.factory('fireBaseData', function($firebase) {
   var ref = new Firebase('https://expensetrackionic.firebaseio.com/'),
   expenseRef = new Firebase('https://expensetrackionic.firebaseio.com/expenses'),
   roomimeRef = new Firebase('https://expensetrackionic.firebaseio.com/room-mates');

   return {
    ref: function () {
      return ref;
    },
    refExpenses: function () {
      return expenseRef;
    },
    refRoomMates: function () {
      return roomimeRef;
    }
   };
});
