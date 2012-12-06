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
          that.html( "X" )
          that.data("action", "delete")
        } else {
          that.html( "&nbsp;" )
          that.data("action", "put")
        }
    })
  })
  
})