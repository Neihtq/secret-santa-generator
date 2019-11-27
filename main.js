ADDRESS = " https://fusian.localtunnel.me/"

function fillDropDown() {
    httpAsync("names", (response) => {
        var data = JSON.parse(JSON.parse(response));
        var names = data["names"];
        var dropDown = document.getElementById("names");
        for (i in names) {
            var option = document.createElement("option");
            option.value = names[i];
            option.innerHTML = names[i];
            dropDown.appendChild(option);
        }
    }, "GET")
}


function buttonClick() {
    var dropList = document.getElementById("names");
    var name = dropList.options[dropList.selectedIndex].value;
    var secret = document.getElementById("secret").value;
    
    if (secret.replace(/^\s+/, '').replace(/\s+$/, '') == "" ) {
        alert("Please enter your secret code!")
    } else {
        var params = "name=" + name + "&secret=" + secret;
        httpAsync("assign" + "?" + encodeURI(params) , (response) => {
            if (response == "notMatching"){
                alert("Your entered code doesn't match with your name!")
            } else {
                document.getElementById("giftedLabel").innerHTML = response
            }
        }, "POST")
    }
}

function httpAsync(url, callback, method)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open(method, ADDRESS + url, true); // true for asynchronous 
    xmlHttp.send(null);
}

fillDropDown()