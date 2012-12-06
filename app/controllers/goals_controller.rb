class GoalsController < ApplicationController
  
  before_filter :find_goal
  before_filter :authenticate_user

  def index
    @goals = Goal.includes(:goal_entries)
  end
  
  def new
    @goal = Goal.new
  end
  
  def create
    @goal = Goal.new( params[:goal] )
    if @goal.save
      redirect_to goals_path
    else
      render action: :new
    end
  end

  private
  def find_goal
    @goal = Goal.find(params[:id]) if params[:id]
  end
end