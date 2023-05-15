class CreateFeedbacks < ActiveRecord::Migration[7.0]
  def change
    create_table :feedbacks do |t|
      t.string :author
      t.string :message

      t.timestamps
    end
  end
end
