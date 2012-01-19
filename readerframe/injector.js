var injected = false;

function injectFrame(params)
{
    var url = params["url"];
    var size = params["size"];
    if (!url || !size)
        return;

    var topBarDiv = document.getElementById("top-bar");
    topBarDiv.style.display = "none";

    var frameDiv;
    var mainDiv = document.getElementById("main");
    if (!injected)
    {
        frameDiv = document.createElement("div");
        frameDiv.id = "readerframe";
        frameDiv.style.float = "right";
        mainDiv.style.float = "left";
        mainDiv.parentNode.appendChild(frameDiv, mainDiv);
        injected = true;
    }
    else
        frameDiv = document.getElementById("readerframe");

    mainDiv.style.width = (100 - parseInt(size, 10)) + "%";
    frameDiv.style.width = size + "%";
    frameDiv.style.height = "100%";
    frameDiv.innerHTML = "<iframe src=\"" + url + "\" style=\"border: none; margin: 0px; padding: 0px; height: 100%; width: 100%;\"></iframe>";
}

function onRequest(request, sender, sendResponse)
{
    if (request["what"] == "reload")
        document.location.reload(true);
    else
        chrome.extension.sendRequest({}, injectFrame);
}

chrome.extension.onRequest.addListener(onRequest);
chrome.extension.sendRequest({}, injectFrame);
