class article < ActiveRecord::Base
  has_many :users


  validates :title, presence: true
  validates :description, presence: true
  validates :url, presence: true
end
