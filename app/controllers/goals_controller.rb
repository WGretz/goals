class GoalsController < ApplicationController
  
  before_filter :authenticate_user!

  def index
    @goals = current_user.unarchived_goals.includes(:goal_entries)
  end
  
  def new
    @goal = Goal.new
  end
  
  def edit
    @goal = current_user.unarchived_goals.find params[:id]
  end
  
  def update
    @goal = current_user.unarchived_goals.find params[:id]
    if @goal.update_attributes( params[:goal] )
      redirect_to goals_path
    else
      render action: :new
    end
  end
  
  def create
    @goal = current_user.unarchived_goals.build( params[:goal] )
    if @goal.save
      redirect_to goals_path
    else
      render action: :new
    end
  end
  
  def destroy
    @goal = current_user.unarchived_goals.find params[:id]
    @goal.delete
    redirect_to goals_path
  end
  
  def archive
    @goal = current_user.unarchived_goals.find params[:id]
    @goal.archive!
    redirect_to goals_path
  end
  
  def archived
    @goals = current_user.archived_goals
  end
  
end