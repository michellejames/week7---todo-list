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

var createToDo = function (itemText, doneState) {
	//get info from the form
				//use square brackets to grab whole css selectors

	if ( itemText.value  === "" ) {
		alert ("Please input a list item.");
	} else {
		createItems(itemText, doneState);
	}
	console.log(JSON.parse(localStorage.storageArray));
	updateItemCount();
}

var createItems = function ( itemText, doneState ) {

	var orderedList = document.querySelector ( ".todo-list" );
	var markAllButton = document.querySelector ( ".mark-all-as-done");
	var deleteAllButton = document.querySelector ( ".delete-all" );
	var showHideButton = document.querySelector ( ".show-hide-completed");

	listItem = document.createElement ( "li" );
	listItem.classList.add ( "list-item" );

	var checkBox = document.createElement ( "input" );
	checkBox.setAttribute ( "type", "checkbox" );

	var paragraph = document.createElement ( "p" );
	paragraph.classList.add ( "checkbox" );

	console.log(itemText);
	paragraph.innerHTML = itemText;

	var singleDeleteButton = document.createElement ( "button" );
	singleDeleteButton.setAttribute ( "type", "button" );
	singleDeleteButton.classList.add ( "single-delete" );
	singleDeleteButton.innerHTML = "X";

	orderedList.appendChild ( listItem );
	console.log(orderedList.children);
	listItem.appendChild ( checkBox );
	listItem.appendChild ( paragraph );
	listItem.appendChild ( singleDeleteButton );

	var todoItems = document.querySelectorAll(".list-item");
	console.log(todoItems);

	var storageArray = [];
	for (var i = 0; i < todoItems.length; i++) {
		console.dir(todoItems[i]);
		storageArray.push ( {
			text: todoItems[i].children[1].innerHTML,
			done: todoItems[i].classList.contains("done")
		});
	}

	var JSONData = JSON.stringify(storageArray);
	console.log(JSONData);
	localStorage.setItem("storageArray", JSONData);
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
			checkBox.checked = true;
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

	var hideCompleted = function () {

		var allDoneItems = document.querySelectorAll ( ".done" );

		if (allDoneItems && checkBox.checked) {
			checkBox.parentNode.style.display = "none";
		} else {
			checkBox.parentNode.style.display = "contents";
		}




		updateItemCount();
	}

	updateItemCount();


	listItem.addEventListener ( "click", deleteCheckedItems );
	markAllButton.addEventListener ( "click", markAllAsDone );
	singleDeleteButton.addEventListener ( "click", singleDelete );
	deleteAllButton.addEventListener ( "click", deleteAllDone );
	showHideButton.addEventListener ( "click", hideCompleted );

}


var updateItemCount = function () {
	var doneCount = document.getElementsByClassName("done").length;
	var allCount = document.getElementsByClassName("checkbox").length;
	var doneContainer = document.getElementById("done-count");
	var allContainer = document.getElementById("all-count");

	doneContainer.innerHTML = doneCount;
	allContainer.innerHTML = allCount;

}

var onLoad = function () {
	var form = document.querySelector ( "form" );

	form.addEventListener ( "submit", function ( e ){
		e.preventDefault();
		itemText = document.querySelector( "input[name=todo-input]" ).value;
		console.log("itemtext = " + itemText.value);
		createToDo(itemText, false);

		form.reset();


	});
	// console.log(JSON.parse(localStorage.storageArray));
	loadStorage();
}


var loadStorage = function () {
	//get localStorage
	//turn it back into an Object
	//loop through the object
	//abend those list items to the OL

	var todoList = document.getElementsByClassName("todo-list")[0];
	var storageItem = localStorage.getItem("storageArray");
	console.log(storageItem);
	var storageArray = JSON.parse(storageItem);
	console.log(storageArray);

	if (storageArray) {
		console.log("running if statement");
		for (var i= 0; i < storageArray.length; i++) {
			console.log("runing for loop");
			console.log(storageArray[i].text, storageArray[i].done);
			createToDo(storageArray[i].text, storageArray[i].done);
		}
	}
}




window.onload = onLoad();
