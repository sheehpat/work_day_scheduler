
//Waits til DOM is ready prior to running
$(document).ready(function () {

  var currentDay = dayjs().format('MMM / DD / YYYY');

  console.log(currentDay);
//Adds current day to the top of the page
 $('#currentDay').html(currentDay);

 //Event listener to save tasks to time block slots
  $('.saveBtn').on("click", function (){
      var task = $(this).siblings('.description').val();
      var hour = $(this).parent().attr('id');
      console.log(hour + " " + task);
      localStorage.setItem(hour, task);
  });

//Current hour (24h), updates timbeblock formatting based on past, present, or future
  function timeNow(){
    var currentTime = dayjs().hour();
    $('.time-block').each(function () {

      //Takes the number for the id, (ie. "hour9" = 9) and compares to current hour of the day
      var timeBlock = parseInt($(this).attr('id').split("hour")[1]);

      if (timeBlock < currentTime ){
        $(this).removeClass('present future');
        $(this).addClass('past');
      }
      else if (timeBlock == currentTime) {
        $(this).removeClass('past future');
        $(this).addClass('present');
      }
      else {
        $(this).removeClass('present past');
        $(this).addClass('future');
      }
    });
  }

 //Retrieves the saved tasks from local storage and adds them to the corresponding time block
  function savedTasks(){
    $('.time-block').each( function (){
      var timeBlock = $(this).attr('id');
      $(this).children('.description').val(localStorage.getItem(timeBlock))});
  }
    
  timeNow();
  savedTasks();
  });

