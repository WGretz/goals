class AddArchivedToGoal < ActiveRecord::Migration
  def change
    add_column :goals, :archived, :boolean, default: false
  end
end
