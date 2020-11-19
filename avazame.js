

var declutterHeader = function() {
  document.getElementById('project-estimate-actual-totals').style.display = 'none';
  document.getElementById('second-nav-items').style.display = 'none';
  document.getElementById('display-group').style.display = 'none';
  document.getElementById('task-search-zone').nextElementSibling.style.display = 'none';
  document.getElementById('task-search-zone').style.display = 'none';
  document.getElementsByClassName('global-timer-desktop desktop')[0].style.display = 'none';

}

var processTaskArea = function() {
  document.getElementById('collapse-expand-all').style.display = 'none';

  var addTask = document.getElementsByClassName('add-task-inline-link');
  for(var i=0; i<addTask.length; i=i+1) { addTask[i].innerText = "+ Add another card"; }
}


declutterHeader();

const area = document.querySelector('#task-area');
let mo = new MutationObserver(mutations => processTaskArea())
mo.observe(area, { childList: true })

