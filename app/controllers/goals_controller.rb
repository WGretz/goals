class GoalsController < ApplicationController
  
  before_filter :authenticate_user!

  def index
    @goals = current_user.goals.includes(:goal_entries)
  end
  
  def new
    @goal = Goal.new
  end
  
  def create
    @goal = current_user.goals.build( params[:goal] )
    if @goal.save
      redirect_to goals_path
    else
      render action: :new
    end
  end
  
end