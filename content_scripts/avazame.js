var addStar = function () {
  let element = document.querySelector('#project-header .project-settings');

  let a = document.createElement('a');
  a.classList.add('star');
  a.classList.add('btn');
  let i = document.createElement('i');
  i.classList.add('far');
  i.classList.add('fa-star');
  a.appendChild(i);
  let text = document.createTextNode("Star");
  a.appendChild(text);

  a.addEventListener('click', function() {
    console.log('clicked!');
  });
  element.insertAdjacentElement('afterend', a);
}

var addFilter = function() {
  let element = document.querySelector('#project-header .star');

  let a = document.createElement('a');
  a.classList.add('filter');
  a.classList.add('btn');
  let i = document.createElement('i');
  i.classList.add('fa');
  i.classList.add('fa-filter');
  a.appendChild(i);
  let text = document.createTextNode("Filter");
  a.appendChild(text);

  a.addEventListener('click', function() {
    document.querySelector('#display-filter').click();
  });
  element.insertAdjacentElement('afterend', a);
}

var addCalendar = function() {
  let element = document.querySelector('#project-header .filter');

  let a = document.createElement('a');
  a.classList.add('calendar');
  a.classList.add('btn');
  let i = document.createElement('i');
  i.classList.add('far');
  i.classList.add('fa-calendar');
  a.appendChild(i);
  let text = document.createTextNode("Calendar");
  a.appendChild(text);

  a.addEventListener('click', function() {
    document.querySelector('.cal-sync-button').click();
  });
  element.insertAdjacentElement('afterend', a);
}


var declutterHeader = function() {
  document.getElementById('project-estimate-actual-totals').style.display = 'none';
  document.getElementById('second-nav-items').style.display = 'none';
  document.getElementById('display-group').style.display = 'none';
  document.getElementById('task-search-zone').nextElementSibling.style.display = 'none';
  document.getElementById('task-search-zone').style.display = 'none';
  document.getElementsByClassName('global-timer-desktop desktop')[0].style.display = 'none';
  document.querySelector('div.hidden-xs:nth-child(3) > a:nth-child(1)').style.display = 'none';
  document.getElementById('project-filter-area').style.display = 'none';
}

var processTaskArea = function() {
  document.getElementById('collapse-expand-all').style.display = 'none';
  document.getElementById('display-filter').style.display = 'none';
  document.getElementById('project-filter-area').style.display = 'none';


  var addTask = document.getElementsByClassName('add-task-inline-link');
  for(var i=0; i<addTask.length; i=i+1) { addTask[i].innerText = "+ Add another card"; }
}


declutterHeader();
addStar();
addFilter();
addCalendar();

const area = document.querySelector('#task-area');
let mo = new MutationObserver(mutations => processTaskArea())
mo.observe(area, { childList: true })

