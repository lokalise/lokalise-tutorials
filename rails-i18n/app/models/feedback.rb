class Feedback < ApplicationRecord
  validates :author, presence: true
  validates :message, presence: true, length: { minimum: 5 }
end
