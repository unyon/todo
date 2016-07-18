require 'rails_helper'

RSpec.describe TasksController, type: :controller do
	describe "tasks#index" do
		it "should list the tasks in the database" do
			task1 = FactoryGirl.create(:task)
			task2 = FactoryGirl.create(:task)
			task1.update_attributes(title: "Something Else")
			get :index
			expect(response).to have_http_status :success
			response_value = ActiveSupport::JSON.decode(@response.body)
			expect(response_value.count).to eq(2)
			response_ids =  response_value.collect do |task|
				task["id"]
				# response_ids = []		#creates an array for each task
				# response_value.each do |task| #loops through the response values
				# 	response_ids << task 	#adds each task to response_ids array in order
			end
			expect(response_ids).to eq([task1.id, task2.id])
		end
	end

	describe "tasks#update" do 
		it "should allow tasks to be marked as done" do
			task = FactoryGirl.create(:task, done: false)
			put :update, id: task.id, task: {done: true}
			expect(response).to have_http_status :success
			task.reload
			expect(task.done).to eq(true)
		end
	end

end
