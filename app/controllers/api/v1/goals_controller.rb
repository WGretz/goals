class Api::V1::GoalsController < Api::V1::BaseController
  
  def index
    respond_with current_user.unarchived_goals
  end
  
  def update
    @goal = Goal.find(params[:id])
  end
  
end