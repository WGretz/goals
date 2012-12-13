class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body
  has_many :goals
  has_many :goal_entries, through: :goals
  def unarchived_goals
    self.goals.where( archived: false )
  end
  
  def archived_goals
    self.goals.where( archived: true )
  end
  
  def unarchived_goal_entries
    self.goal_entries.where( goals: { archived: false })
  end
  
end
