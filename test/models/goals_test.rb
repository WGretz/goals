require 'minitest_helper'

describe Goal do
  before do
    @it = Factory :goal
  end
  describe "longest_chain" do
    it "should return 0 if there are no goal entries" do
      @it.longest_chain.must_equal 0
    end
    it "should return 1 if there is only one goal" do
      @it.goal_entries << Factory( :goal_entry )
      @it.longest_chain.must_equal 1
    end
    it "should return 2 if there are 2 goals in a row" do
      @it.goal_entries << Factory( :goal_entry, occured_on: Date.today )
      @it.goal_entries << Factory( :goal_entry, occured_on: Date.today + 1)
      @it.longest_chain.must_equal 2
    end
    it "should return 1 if the goals are not concurrent" do
      @it.goal_entries << Factory( :goal_entry, occured_on: Date.today )
      @it.goal_entries << Factory( :goal_entry, occured_on: Date.today + 2)
      @it.longest_chain.must_equal 1
    end
  end
  
  describe "entries_on_date?" do
    it "should return 0 if no goal entries exist" do
      @it.entries_on_date?( Date.today ).must_equal false
    end
    it "should return 1 if a goal entry exists" do
      @it.goal_entries << Factory( :goal_entry )
      @it.entries_on_date?( Date.today ).must_equal true
    end
  end
  
end
