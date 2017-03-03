console.log("Hello World from main.js!");

//////////Higher Order Functions//////////

//Functions that take another function as parameters or return anotther function as their result

///////////To-Do App////////////


//Form
//Input
//Submit Button
//Check-Boxes to mark item as done
//Buttons to remove items
//Counter for how many items exist
//A counter for how many items are marked off done
//Ability to edit an item once it's made
//Ability to save the list (remotely, on server)
//Hide/Show completed
//Clear all completed

var itemText;
var listItem;

var createToDo = function () {
	//get info from the form
	itemText = document.querySelector ( "input[name=todo-input]" );			//use square brackets to grab whole css selectors

	if ( itemText.value  === "" ) {
		alert ("Please input a list item.");
	} else {
		createItems();
	}

	updateItemCount()
}

var form = document.querySelector ( "form" );

form.addEventListener ( "submit", function ( e ){
	e.preventDefault();
	createToDo();

	form.reset();

});

var createItems = function ( e ) {

	var orderedList = document.querySelector ( ".todo-list" );
	var markAllButton = document.querySelector ( ".mark-all-as-done");
	var deleteAllButton = document.querySelector ( ".delete-all" );
	var showCompletedButton = document.querySelector ( ".show-completed");

	listItem = document.createElement ( "li" );
	listItem.classList.add ( "list-item" );

	var checkBox = document.createElement ( "input" );
	checkBox.setAttribute ( "type", "checkbox" );

	var paragraph = document.createElement ( "p" );
	paragraph.classList.add ( "checkbox" );

	paragraph.innerHTML = itemText.value;

	var singleDeleteButton = document.createElement ( "button" );
	singleDeleteButton.setAttribute ( "type", "button" );
	singleDeleteButton.classList.add ( "single-delete" );
	singleDeleteButton.innerHTML = "X";

	orderedList.appendChild ( listItem );
	listItem.appendChild ( checkBox );
	listItem.appendChild ( paragraph );
	listItem.appendChild ( singleDeleteButton );

	var JSONData = JSON.stringify(listItem);
	localStorage.setItem(listItem.form, JSONData);
	console.log(localStorage);

	var deleteCheckedItems = function () {

	console.log( checkBox.checked );

		if ( checkBox.checked ) {
			paragraph.style.textDecoration = "line-through";
			checkBox.parentNode.classList.add ( "done" );


		} else if ( !checkBox.checked ) {

			paragraph.style.textDecoration = "none";
			checkBox.parentNode.classList.remove ( "done" );
		}

		updateItemCount();

	}

	var markAllAsDone = function () {

		if (markAllButton) {
			paragraph.style.textDecoration = "line-through";
			checkBox.parentNode.classList.add ( "done" );
		}

		updateItemCount();
	}

	var singleDelete = function () {

		singleDeleteButton.parentNode.parentNode.removeChild ( singleDeleteButton.parentNode );

		updateItemCount();

	}

	var deleteAllDone = function () {

		var allDoneItems = document.querySelectorAll ( ".done" );

		for ( var i = allDoneItems.length - 1; i >= 0; i-- ) {
			allDoneItems[i];
			allDoneItems[i].parentNode.removeChild ( allDoneItems[i] );
		}

		updateItemCount();

	}

	var createModule = function () {

		var overlay = document.createElement ( "div" );
		overlay.classList.add( "overlay" );
		document.body.appendChild ( overlay );

		var module = document.createElement ( "div" );
		module.classList.add( "module" );
		document.body.appendChild ( module );

		var hideCompletedButton = document.createElement ( "button" );
		hideCompletedButton.classList.add ( "hide-completed" );
		module.appendChild ( hideCompletedButton );
		hideCompletedButton.innerHTML = "Hide Completed";

		// var allDoneItems = document.querySelectorAll ( ".done" );
		// module.appendChild(allDoneItems);

		hideCompletedButton.addEventListener ( "click", hideCompleted );
	}

	var showCompleted = function () {

		createModule();

	}



	updateItemCount();


	listItem.addEventListener ( "click", deleteCheckedItems );
	markAllButton.addEventListener ( "click", markAllAsDone );
	singleDeleteButton.addEventListener ( "click", singleDelete );
	deleteAllButton.addEventListener ( "click", deleteAllDone );
	showCompletedButton.addEventListener ( "click", showCompleted );
}

var hideCompleted = function () {

	var overlay = document.querySelector( ".overlay" );
	var module = document.querySelector( ".module" );
	
	overlay.parentNode.removeChild( overlay );
	module.parentNode.removeChild( module );
}


var updateItemCount = function () {
	var doneCount = document.getElementsByClassName("done").length;
	var allCount = document.getElementsByClassName("checkbox").length;
	var doneContainer = document.getElementById("done-count");
	var allContainer = document.getElementById("all-count");

	doneContainer.innerHTML = doneCount;
	allContainer.innerHTML = allCount;

}

