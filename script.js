const upgraded = document.getElementById("yes");
const notupgraded = document.getElementById("no");

// Get the nft_symbol (CoC+ / CoC) from the metadata of the cet 
function CetsData(TokenAddress) {
    // Get all the data about a cet from the solscan API
    return fetch('https://pro-api.solscan.io/v1.0/nft/token/info/' + TokenAddress, {
        method: 'Get',
        headers: {
            'Accept': 'application/json',
            'token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOjE2OTAwNTE0NjUzMDksImVtYWlsIjoiamloYWRoeWFkaTAxQGdtYWlsLmNvbSIsImFjdGlvbiI6InRva2VuLWFwaSIsImlhdCI6MTY5MDA1MTQ2NX0.MGmBWnL0k87qJTKngBIHf9Vn-dzUyWCOdn84GImjUXg'
            }
        })
        .then(response => response.json())
        .then(data => {
            var nft_symbol = data['data']['0']['nft_symbol'];
            if(nft_symbol == 'CoC+'){
                // change the rectangle color to green = Cet upgraded
                upgraded.classList.add("green");
                notupgraded.classList.remove("red");
                return true;
            }
            else{
                // change the rectangle color to red = Cet not upgraded
                upgraded.classList.remove("green");
                notupgraded.classList.add("red");
                return true;
            }
        })
        .catch(error => {
          console.log('error', error);
          return false;
    });
  }

  
function GetCets(){

    // Get Cet Address from user input
    const mintaddress = document.getElementById('cet_address').value;

    // Display Loading icon
    document.getElementById("loading-icon").style.display = "block";

    // Check if Cet is upgraded
    CetsData(mintaddress)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });

    // Get the versions of the cet from server
    const E1_version = "https://shdw-drive.genesysgo.net/3tPEmShThSrDVM364dUJPLjKCQMGScdPEP3XxgWgN2Xo/" + encodeURIComponent(mintaddress) + "+e1.png";
    const OG_version = "https://shdw-drive.genesysgo.net/3tPEmShThSrDVM364dUJPLjKCQMGScdPEP3XxgWgN2Xo/" + encodeURIComponent(mintaddress) + ".png";
    const E2_version = "https://shdw-drive.genesysgo.net/3tPEmShThSrDVM364dUJPLjKCQMGScdPEP3XxgWgN2Xo/" + encodeURIComponent(mintaddress) + "+e2.png";

    // Create new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Open request to the url
    xhr.open('GET', E1_version);

    // Function to handle the response status
    xhr.onload = function(){
        if(xhr.status >= 200 && xhr.status < 300){
            document.getElementById("error_message").textContent = ""; // clear error message

            document.getElementById('E1').src = E1_version;
            document.getElementById('OG').src = OG_version;
            document.getElementById('E2').src = E2_version;
            // Hide the loading icon
            document.getElementById("loading-icon").style.display = "none";          
        }
        else{
            // If mintaddress is invalid => bad response status from server => display error message
            document.getElementById("error_message").textContent = "Invalid Address.. u pessy!!";

            document.getElementById("loading-icon").style.display = "none";
        }
    };

    // Send request
    xhr.send();
}

document.getElementById("search-btn").addEventListener("click", function() {
    GetCets();
  });


// Refresh the page on click of the logo/header
const header = document.getElementById('head');
const logo = document.getElementById('logo');

header.onclick = () => {
  location.reload();
};

logo.onclick = () => {
  location.reload();
};


// Display the answer after the user hover over the question
const question = document.getElementById('question');
const answer = document.getElementById('answer');

question.addEventListener('mouseover', () => {
    answer.style.display = 'block';
});

question.addEventListener('mouseout', () => {
    answer.style.display = 'none';
});
