class Api::V1::GoalEntriesController < Api::V1::BaseController
  
  def index
    respond_with current_user.unarchived_goal_entries
  end
  
end