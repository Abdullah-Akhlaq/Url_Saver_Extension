// background.js

// Listen for tab URL changes
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        const url = tab.url;
        console.log('URL to be saved:', url);

        // Send the URL to your server (replace with your server URL)
        fetch('http://localhost:4001/api/entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        })
        .then((response) => response.json())
        .then((data) => {
            // Handle the response or display a success message
            console.log('URL saved successfully');
        })
        .catch((error) => {
            // Handle errors
            console.error('Error saving URL:', error);
        });
    }
});
