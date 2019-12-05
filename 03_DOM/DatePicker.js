"use-strict";

// Class declaration
function DatePicker(div_id, callback){
    this.div_id = div_id;
    this.fixedDate =null;
    this.callback = callback;
	this.date = new Date(); // variable to keep track of current date
}

// Function to toggle going back a month
DatePicker.prototype.prevMonth = function() {
	var month = this.date.getMonth();
	var year = this.date.getFullYear();
	month = (month-1) % 12;
	if (month === 11) {
		year -= 1;
	}
	this.date.setDate(1);
	this.date.setMonth(month);
	this.date.setFullYear(year);
	this.render(this.date);
};

// Function to toggle going forward a month
DatePicker.prototype.nextMonth = function() {
	var month = this.date.getMonth();
	var year = this.date.getFullYear();
	month = (month+1)%12;
	if (month === 0) {
		year += 1;
    }
	this.date.setDate(1);
	this.date.setMonth(month);
	this.date.setFullYear(year);
	this.render(this.date);
};

// Function to select Date from the calendar
DatePicker.prototype.selectDate = function(selectedDate) {
	this.date.setDate(selectedDate);
	this.fixedDate = {"month": this.date.getMonth() + 1, 
					 "day": this.date.getDate(),
					 "year": this.date.getFullYear()};
	this.callback(this.div_id, this.fixedDate);
};

// Calendar rendering function
DatePicker.prototype.render = function(date){
    var that = this; // capturing context
    this.date = date;
    var currentDate = 1;
    var element = document.getElementById(this.div_id);
    element.innerHTML = ""; // wipe the contents and recreate them each time the month is changed

    // Extract date
	var rDate = this.date.getDate();
	var rMonth = this.date.getMonth();
	var rYear = this.date.getFullYear();

    // Set display date
	var displayDate = new Date();
	displayDate.setFullYear(rYear);
    displayDate.setMonth(rMonth);
	displayDate.setDate(currentDate);

	// Define days of the week, months of the year and header
	var daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
				  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var header = months[rMonth] + ' ' + rYear;

    // ------------- CREATE THE ACTUAL CALENDAR -------------
	var tableElem, tableRow, tableData;
	tableElem = document.createElement('TABLE');
	tableElem.setAttribute("class", "datepickertable");
	element.appendChild(tableElem);
    
    // table rows
    tableRow = document.createElement('TR');
	tableElem.appendChild(tableRow);
    
    // ------------- TOP ROW ----------------
    // previous month button
    var prevButton = document.createElement('TD');
	prevButton.setAttribute("class", "monthbutton");
	prevButton.onclick = function () { 
		that.prevMonth();
	};
	prevButton.innerHTML = "<";
    tableRow.appendChild(prevButton);
    
    // header detailing current month and year
	var datepickerheader = document.createElement('TD');
	datepickerheader.setAttribute("colspan", "5");
	datepickerheader.innerHTML = header;
    tableRow.appendChild(datepickerheader);
    
    // next month button
	var nextButton = document.createElement('TD');
	nextButton.setAttribute("class", "monthbutton");
	nextButton.onclick = function () { 
		that.nextMonth();
	};
	nextButton.innerHTML = ">";
	tableRow.appendChild(nextButton);

    /*------------- SECOND ROW ----------------    
          The days of the week headers         */
	tableRow = document.createElement('TR');
	tableRow.setAttribute("class", "daysoftheweek");
	tableElem.appendChild(tableRow);
	for (var i=0; i < daysOfTheWeek.length; i++) {
		tableData = document.createElement('TD');
		tableData.innerHTML = daysOfTheWeek[i];
		tableRow.appendChild(tableData);
    }
    // ----------- DAYS AND WEEKS --------------
    // FIRST WEEK - backfill the final days of the previous month 
	var firstDay = displayDate.getDay();
	if (firstDay !== 0) {
		tableRow = document.createElement('TR');
		tableElem.appendChild(tableRow);
		displayDate.setDate(1-firstDay);
		for (i=0; i < firstDay; i++) {
			tableData = document.createElement('TD');
			tableData.setAttribute("class", "inactivedate");
			tableData.innerHTML = displayDate.getDate();
			tableRow.appendChild(tableData);
			displayDate.setDate(displayDate.getDate() + 1);
		}
	}
    
    // BODY OF THE CALENDAR - DAYS OF THE CURRENT MONTH
	while (currentDate === displayDate.getDate()) {
		var currentDay = displayDate.getDay();
		if (currentDay === 0) {
			tableRow = document.createElement('TR');
			tableElem.appendChild(tableRow);
		}
		tableData = document.createElement('TD');
		tableRow.appendChild(tableData);
		if (this.fixedDate && 
			rMonth === this.fixedDate.month-1 && 
			rYear === this.fixedDate.year && 
			currentDate === this.fixedDate.day) {
			tableData.setAttribute("class", "selectdate");
        }
        
		tableData.innerHTML = currentDate;
		tableData.onclick = (function (selectedDate) {
			return function() {
				that.selectDate(selectedDate);
			};
		})(currentDate);
		currentDate += 1;
		displayDate.setDate(currentDate);
    }

    // LAST WEEK - forwardfill the first days of the next month
	var lastDay = displayDate.getDay();
	if (lastDay !== 0) {
		for (i=0; i < 7-lastDay; i++) {
			tableData = document.createElement('TD');
			tableData.setAttribute("class", "inactivedate");
			tableData.innerHTML = i + 1;
			tableRow.appendChild(tableData);
		}
	}
};