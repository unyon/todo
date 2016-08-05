$(function() {

    // The taskHtml method takes in a JavaScript representation
    // of the task and produces an HTML representation using
    // <li> tags
    	function taskHtml(task) {   //function taskHtml takes a parameter of a task...
         var checkedStatus = task.done ? "checked" : "";
         var liElement = '<li><div class="view"><input class="toggle" type="checkbox"' +
	         "data-id='" + task.id + "'" +
	         checkedStatus + 
	         '><label>' +
	       	 task.title +
	       	 '</label></div></li>';
	     return liElement;
      }
    // toggleTask takes in an HTML representation of the
    // an event that fires from an HTML representation of
    // the toggle checkbox and  performs an API request to toggle
    // the value of the `done` field
    	function toggleTask(e) {
   			var itemId = $(e.target).data("id");
        	//console.log(itemId);

        	var doneValue = Boolean($(e.target).is(':checked'));
        	//console.log("done:", doneValue);

        	$.post("/tasks/" + itemId, {   //updates done attribute when checkbox is checked or unchecked
        		_method: "PUT", 
        			task: {
        				done: doneValue
        			}
        	});
        }


       $.get("/tasks").success( function( data ) {
        var htmlString = "";

        $.each(data, function(index, task) {
          htmlString += taskHtml(task);    //
   	   });
   		var ulTodos = $('.todo-list');
   		ulTodos.html(htmlString);

   		$('.toggle').change(toggleTask);  //runs toggleTasks code when there is a change to toggle

    });
 
        $('#new-form').submit(function(event) {
  		event.preventDefault();
  		var textbox = $('.new-todo');
  		var payload = {
        	task: {
          		title: textbox.val()
        	}
      	};
      	console.log(payload);
	  	$.post("/tasks", payload).success(function(data) {
	  		var htmlString = taskHtml(data);
	  		var ulTodos = $(".todo-list");
	  		ulTodos.append(htmlString); //appends new item to todo-list ul
	  		$(".toggle").click(toggleTask) //so new tasks will respond to toggleTask functions
	  	});
  	});
  });