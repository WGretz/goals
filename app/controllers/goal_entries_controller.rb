class GoalEntriesController < ApplicationController
  
  before_filter :authenticate_user!
  
  def update
    @goal = current_user.goals.find(params[:goal_id])
    @goal.goal_entries.find_or_create_by_occured_on( occured_on: params[:id ])
    render nothing: true
  end
  
  def destroy
    @goal = current_user.goals.find(params[:goal_id])
    @ge = @goal.goal_entries.find_by_occured_on( params[:id])
    @ge.destroy
    render nothing: true
  end
  
end