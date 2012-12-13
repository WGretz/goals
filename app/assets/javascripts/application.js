// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(function(){
  
  $(".goal-available").click(function(){
    that = $(this)
    var url = '/goals/'+that.data("goal-id")+"/goal_entries/"+that.data("date")
    $.post(url, 
      { _method: that.data("action"), authenticity_token: window.token },
      function(data){
        if (that.data("action") == "put") {
          that.html( $("<i>").addClass("icon-ok") )
          that.data("action", "delete")
        } else {
          that.html( "&nbsp;" )
          that.data("action", "put")
        }
    })
  })
  
})

function pad(number, length) {
   
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    console.log( str )
   
    return str;

}

goalsapp = angular.module('goalsapp',['ngResource'])

goalsapp.controller('GoalsCtrl', function GoalsCtrl($scope,Goal,GoalEntry){
  dates = []
  date = new Date()
  for (var i = 6; i >= 0; i--){
    d = new Date(date.getFullYear(),date.getMonth(),date.getDate()-i)
    dates.push( d )
  };
  $scope.dates = dates
  
  $scope.goals = Goal.query()
  
  $scope.goal_entries = GoalEntry.query()
  
  function checkCount(goal){
    a = $scope.goal_entries.filter(function(el){
      return el.goal_id == goal.id
    })
    return a.length
  }
  
  $scope.checkCount = checkCount
  
  function longestChain( goal){
    
    return 0
  }
  
  $scope.longestChain = longestChain
  
  function currentChain( goal){
    
    return 0
  }
  
  $scope.currentChain = currentChain
  
  function goalEntriesForDate( goal, date){
    d = Date.UTC( date.getFullYear(), date.getMonth(), date.getDate() )
    if ( $scope.goal_entries.filter(function(el){
      el_date = Date.parse( el.occured_on )
      return el.goal_id == goal.id && d == el_date
    }).length > 0 ){
      return "<i class='icon-ok'></i>"
    } else {
      return "&nbsp;"
    }
  }
  
  $scope.goalEntriesForDate = goalEntriesForDate
  
  function goalEntryClick( goal, date ) {
    console.log( goal, date )
  }
  
  $scope.goalEntryClick = goalEntryClick
  
})

goalsapp.factory('Goal', function ($resource) {
    return $resource('api/v1/goals/:goalId', {}, {
        update: {method:'PUT'}
    });
});

goalsapp.factory('GoalEntry', function ($resource) {
    return $resource('api/v1/goal_entries/:goalId', {}, {
        update: {method:'PUT'}
    });
});

