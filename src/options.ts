console.log('Options')

const CREDENTIALS_KEY = 'credentials'

async function loadConfigs() {
  const credentials = (await chrome.storage.sync.get(CREDENTIALS_KEY)) as {
    credentials: {
      username: string;
      apiKey: string;
    };
  };
  console.log(credentials)
  const usernameResult = <HTMLElement> document.getElementById('savedUsername')
  const apiKeyResult = <HTMLElement> document.getElementById('savedApiKey')
  
  if (usernameResult && apiKeyResult && credentials.credentials) {
    const results = <HTMLElement>document.querySelector('.savedOptions')
    results.style.display = "block"
    usernameResult.innerHTML = credentials.credentials.username;
    apiKeyResult.innerHTML = credentials.credentials.apiKey;
  }
}

document.addEventListener('DOMContentLoaded', loadConfigs)

document.querySelector('button')?.addEventListener('click', async () => {
  console.log('Button was clicked')
  const username = <HTMLInputElement> document.getElementById('username')
  const apiKey = <HTMLInputElement> document.getElementById('apiKey')
  const credentials = {
    username: username.value,
    apiKey: apiKey.value
  }
  await chrome.storage.sync.set({
    [CREDENTIALS_KEY]: credentials
  })
  console.log(credentials);
  await chrome.notifications.create("", {
    title: "Saved Credentials",
    message: "Hello this is a notification",
    type: "basic",
    iconUrl: "/assets/icon_32.png",
    requireInteraction: true,
    buttons: [
      {
        title: 'Open Kimai'
      }
    ]
  });
  await loadConfigs()
})
