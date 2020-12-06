let projects = {};
browser.storage.local.get('starred-projects').then((res) => {
  projects = res['starred-projects'] || {};
});

function onError(e) {
  console.error(e);
}

function handleMessage(request, sender, sendResponse) {
  if(request.code === 'fetch-starred-projects') return sendResponse({ projects });
  return toggleStarred(request, sender, sendResponse);
}

function toggleStarred(request, sender, sendResponse) {
  let project = projects[request.id] || {};
  project[request.id] = request.id;
  project['name'] = request.name;
  project['starred'] = !project['starred'];
  projects[request.id] = project;
  browser.storage.local.set({'starred-projects': projects});
  sendResponse({project});
};


/*
function sendMessageToTabs(tabs) {
  for (let tab of tabs) {
    browser.tabs.sendMessage(
      tab.id,
      {greeting: "Hi from background script"}
    ).then(response => {
      console.log("Message from the content script:");
      console.log(response.response);
    }).catch(onError);
  }
}

browser.tabs.onActivated.addListener(() => {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(sendMessageToTabs).catch(onError);
});
*/

browser.runtime.onMessage.addListener(handleMessage);

