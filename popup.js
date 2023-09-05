document.addEventListener('DOMContentLoaded', function () {
    // var myButton = document.getElementById('my-button');

    // myButton.addEventListener('click', function () {
    //     // Get the current tab's URL using chrome.tabs API
       
    // });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs && tabs[0] && tabs[0].url) {
            const url = tabs[0].url;
            console.log('URL to be saved:', url); // Log the URL to the console

            // Send the URL to your server
            fetch('http://localhost:4001/api/entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }), // Include the URL data
            })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response or display a success message
                // alert('URL saved successfully');
            })
            .catch((error) => {
                // Handle errors
                alert('Error saving URL: ' + error);
            });
        } else {
            console.log('Unable to retrieve tab URL.');
        }
    });
});
