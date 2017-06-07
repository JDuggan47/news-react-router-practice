class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.string :url, null: false
    end
  end
end
