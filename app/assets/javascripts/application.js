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
//= require jquery.ui.all
//= require angular.min
//= require angular-resource.min
//= require angular-ui.min
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

goalsapp = angular.module('goalsapp',['ngResource','ui'])

goalsapp.controller('GoalsCtrl', function GoalsCtrl($scope,Goal,GoalEntry){
  $scope.dates = []
  $scope.date = new Date()
  $scope.showHide = false
  
  function generateDates(){
    var dates = []
    var date = $scope.date
    for (var i = 6; i >= 0; i--){
      d = new Date(date.getFullYear(),date.getMonth(),date.getDate()-i)
      dates.push( d )
    };
    $scope.dates = dates
  }
  
  generateDates();
  
  $scope.goals = Goal.query()
  
  $scope.goal_entries = GoalEntry.query()
  
  function pad(number, length) {
      var str = '' + number;
      while (str.length < length) {
          str = '0' + str;
      }
      return str;
  }
  
  $scope.pad = pad
  
  function decreaseDate(){
    $scope.date = new Date($scope.date.getFullYear(),$scope.date.getMonth(),$scope.date.getDate()-1)
    console.log( "test" )
    generateDates();
  }
  
  $scope.decreaseDate = decreaseDate
  
  function increaseDate(){
    $scope.date = new Date($scope.date.getFullYear(),$scope.date.getMonth(),$scope.date.getDate()+1)
    console.log( "test" )
    generateDates();
  }
  
  $scope.increaseDate = increaseDate
  
  function checkCount(goal){
    a = $scope.goal_entries.filter(function(el){
      return el.goal_id == goal.id
    })
    return a.length
  }
  
  $scope.checkCount = checkCount
  
  function longestChain( goal){
    a = $scope.goal_entries.filter(function(el){
      return el.goal_id == goal.id
    }).sort(function(a,b){
      return Date.parse(a.occured_on) - Date.parse(b.occured_on)
    })
    if (a == 1 || a == 0){
      return a.length
    }
    cur_chain = 1
    max_chain = 0
    //Loop through the goals incrementing chains
    for (var i=1; i < a.length; i++) {
      if ( Math.round((Date.parse(a[i].occured_on) - Date.parse(a[i-1].occured_on)) / (60*60*24*1000) ) == 1  ) {
        cur_chain += 1
      } else {
        if ( max_chain < cur_chain ){
          max_chain = cur_chain
        }
        cur_chain = 1
      }
    };
    if ( cur_chain > max_chain )
      max_chain = cur_chain
    return max_chain
  }
  
  $scope.longestChain = longestChain
  
  function currentChain( goal){
    a = $scope.goal_entries.filter(function(el){
      return el.goal_id == goal.id
    }).sort(function(a,b){
      return Date.parse(b.occured_on) - Date.parse(a.occured_on)
    })
    i = 0
    c = 1
    while ( a[i+1] && (Date.parse(a[i].occured_on) - Date.parse( a[i+1].occured_on )) / (60*60*24*1000) == 1 ){
      c += 1
      i += 1
    }
    
    return c;
  }
  
  $scope.currentChain = currentChain
  
  function goalEntriesForDate (goal, date) {
    d = Date.UTC( date.getFullYear(), date.getMonth(), date.getDate() )
    return $scope.goal_entries.filter(function(el){
      el_date = Date.parse( el.occured_on )
      return el.goal_id == goal.id && d == el_date
    })
  }
  
  function goalEntryIconsForDate( goal, date){
    if (goalEntriesForDate(goal,date).length > 0){
      return "<i class='icon-ok'></i>"
    } else {
      return "&nbsp;"
    }
  }
  
  $scope.goalEntryIconsForDate = goalEntryIconsForDate
  
  function goalEntryClick( goal, date ) {
    if ( goalEntriesForDate(goal,date).length > 0 ) {
      ge = goalEntriesForDate(goal,date)[0]
      GoalEntry.delete( {id: ge.id } )
      $scope.goal_entries = $scope.goal_entries.filter(function(entry){
        return entry.id != ge.id
      })
    } else {
      GoalEntry.save({goal_id: goal.id, occured_on: date}, function(data ) {
        $scope.goal_entries.push( data )
      })
    }
  }
  
  $scope.goalEntryClick = goalEntryClick
  
  $scope.selectDate = function ( value, picker) {
    $scope.showHide = false
    $scope.date = new Date( Date.parse( value ) )
    generateDates();
  }
  
})

goalsapp.factory('Goal', function ($resource) {
    return $resource('api/v1/goals/:goalId', {}, {
        update: {method:'PUT'}
    });
});

goalsapp.factory('GoalEntry', function ($resource) {
    return $resource('api/v1/goal_entries/:id', {}, {
        update: {method:'PUT'}
    });
});

