class Goal < ActiveRecord::Base
  attr_accessible :name, :user_id
  
  has_many :goal_entries, :order => "occured_on", dependent: :destroy
  
  def longest_chain
    return goal_entries.count if [1,0].include?( goal_entries.count )
    cur_chain = 1
    max_chain = 0
    #Loop through the goals incrementing chains
    1.upto( goal_entries.count-1).each do |i|
      if  goal_entries[i].occured_on - 1 == goal_entries[i-1].occured_on
         cur_chain += 1
      else
        max_chain = cur_chain if cur_chain > max_chain
        cur_chain = 1
      end
    end
     max_chain = cur_chain if cur_chain > max_chain
    return max_chain
  end
  
  def entries_on_date?( date )
    !!goal_entries.group( :occured_on ).count()[ date ]
  end
  
end
