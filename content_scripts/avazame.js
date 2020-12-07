function updateStarStatus(starred) {
  document.querySelector('#project-header .fa-star').classList.remove('far', 'fa');
  let className = (starred) ? 'fa' : 'far';
  document.querySelector('#project-header .fa-star').classList.add(className);
}

function addStar() {
  let element = document.querySelector('#project-header .project-settings');

  let a = document.createElement('a');
  a.classList.add('star');
  a.classList.add('btn');
  a.classList.add('hidden-xs');
  let i = document.createElement('i');
  i.classList.add('far');
  i.classList.add('fa-star');
  a.appendChild(i);
  let text = document.createTextNode("Star");
  a.appendChild(text);

  a.addEventListener('click', function() {
    browser.runtime.sendMessage({id: projectId, name: projectName}).then((response) => {
      updateStarStatus(response.project.starred);
      updateBoardNavigationMenu(response.project);
    });
  });
  element.insertAdjacentElement('afterend', a);
}

function updateCurrentStar(projects) {
    let starred = projects[projectId] && projects[projectId].starred;
    updateStarStatus(starred);
}

var addFilter = function() {
  let element = document.querySelector('#project-header .star');

  let a = document.createElement('a');
  a.classList.add('filter');
  a.classList.add('btn');
  a.classList.add('hidden-xs');
  let i = document.createElement('i');
  i.classList.add('far');
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
  a.classList.add('hidden-xs');
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


function addBoardNavigationButton() {
  let element = document.querySelector('.right-header-list');
  let li = document.createElement('li');
  li.classList.add('hidden-xs');
  li.classList.add('icons');
  let a = document.createElement('a');
  a.title = 'Boards';
  a.addEventListener('click', function(el) {
    let boardList = document.querySelector('.section-boards');
    if(boardList.style.display == 'block') {
      boardList.style.display = 'none';
    }else {
      boardList.style.display = 'block';
    }
  });
  let i = document.createElement('i');
  i.classList.add('fab');
  i.classList.add('fa-trello');
  a.appendChild(i);
  li.appendChild(a);
  element.prepend(li);
}
function buildBoardNavigationMenuItem(project) {
  var li = document.createElement('li');
  li.setAttribute('data-id', project.id);
  var a = document.createElement('a');
  a.href = `/project/view/${project.id}`;
  a.innerText = project.name;
  li.appendChild(a);
  return li;
}


function addBoardNavigationMenu(dictionary) {
  let projects = [];
  for(const key in dictionary) {
    projects.push(dictionary[key]);
  }
  projects.sort((a,b) => a.name.localeCompare(b.name));

  let section = document.createElement('section');
  section.classList.add('section-boards');
  let div = document.createElement('div');
  div.innerText = 'Starred projects';
  let ul = document.createElement('ul');
  projects.forEach(project => {
   ul.appendChild(buildBoardNavigationMenuItem(project));
  });
  section.appendChild(div);
  section.appendChild(ul);
  document.querySelector('.scoop-header').appendChild(section);
}

function updateBoardNavigationMenu(project) {
  let item = document.querySelector('.section-boards li[data-id="' + project.id + '"]');
  let list = document.querySelector('.section-boards ul');
  if(project.starred && item) { item.style.display = 'list-item'; }
  if(project.starred && !item) { list.appendChild(buildBoardNavigationMenuItem(project)) };
  if(!project.starred && item) { item.style.display = 'none'; }
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

function fetchProjects() {
  return browser.runtime.sendMessage({code: 'fetch-starred-projects'}).then((response) => {
    return Promise.resolve(response.projects);
  });
}

const projectId = document.getElementById('ProjectID').value;
const projectName = document.getElementById('project-title').innerText;

declutterHeader();
addStar();
addFilter();
addCalendar();
addBoardNavigationButton();
fetchProjects().then(projects => {
  updateCurrentStar(projects);
  addBoardNavigationMenu(projects);
});

const area = document.querySelector('#task-area');
let mo = new MutationObserver(mutations => processTaskArea())
mo.observe(area, { childList: true })

