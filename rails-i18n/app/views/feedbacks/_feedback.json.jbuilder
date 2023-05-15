json.extract! feedback, :id, :author, :message, :created_at, :updated_at
json.url feedback_url(feedback, format: :json)
