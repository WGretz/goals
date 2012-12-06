class CreateGoalEntries < ActiveRecord::Migration
  def change
    create_table :goal_entries do |t|
      t.integer :goal_id
      t.date :occured_on

      t.timestamps
    end
  end
end
