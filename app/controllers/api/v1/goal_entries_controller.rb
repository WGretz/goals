class Api::V1::GoalEntriesController < Api::V1::BaseController
  
  skip_before_filter  :verify_authenticity_token
  
  def index
    respond_with current_user.unarchived_goal_entries
  end
  
  def show
    respond_with current_user.goal_entries.find( params[:goal_id] )
  end
  
  def create
    puts current_user.inspect
    goal = current_user.goals.find( params[:goal_id] )
    goal_entry = goal.goal_entries.create( occured_on: params[:occured_on])
    respond_with :api,:v1, goal_entry
  end
  
  def destroy
    ge = current_user.goal_entries.find( params[:id] )
    respond_with ge.destroy
  end
  
end