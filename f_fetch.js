// Does not support Internet Explorer
// FetchAsync('get', 'https://jsonplaceholder.typicode.com/posts', [{"a": 1}, {"asdasdads": 123232}]).then(res => console.log(res));
const FetchAsync = async (method, url, returnType = "json", headers, data = {}, cors = "cors", cache = "no-cache", credentials = "same-origin", redirect = "follow", referrerPolicy = "no-referrer") => {
    returnType = returnType.toString().toLowerCase();
    method = method.toString().toUpperCase();
    const reqHeaders = new Headers();
    if (returnType != "text" && returnType != "json" && returnType != "blob")
        throw "Return Type must be Text, JSON, or Blob. Your requested return type was: " + returnType;
    // headers type
    if (headers) {
        Array.isArray(headers) ? 
        (
            headers.forEach(el => {
                reqHeaders.append(Object.keys(el), Object.values(el))
            })
        ) 
        : 
        (
            reqHeaders.append(Object.keys(headers), Object.values(headers))
        )
    }
    // Default options are marked with *
    const response = method == "GET" || method == "HEAD"? 
    (
        await fetch(url, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            mode: cors, // no-cors, *cors, same-origin
            cache: cache, // *default, no-cache, reload, force-cache, only-if-cached
            credentials: credentials, // include, *same-origin, omit
            headers: reqHeaders,
            redirect: redirect, // manual, *follow, error
            referrerPolicy: referrerPolicy, // no-referrer, *client
        })
        .then((response) => {
            if (!response.ok) {
                return {Status: "Error", Message: "Server or Network might be not ok. Make sure you're connected to internet and the requested URL was right"}
            }
            if (returnType == "json") return response.json();
            else if (returnType == "text") return response.text();
            else if (returnType == "blob") return response.blob();
        })
        .catch(e => {
            return e;
        })
    ) : 
    (
        await fetch(url, {
            method: method,
            mode: cors,
            cache: cache,
            credentials: credentials,
            headers: reqHeaders,
            redirect: redirect,
            referrerPolicy: referrerPolicy,
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (!response.ok) {
                return {Status: "Error", Message: "Server or Network might be not ok. Make sure you're connected to internet and the requested URL was right"}
            }
            if (returnType == "json") return response.json();
            else if (returnType == "text") return response.text();
            else if (returnType == "blob") return response.blob();
        })
        .catch(e => {
            return e;
        })
    );
    return await response; // parses JSON response into native JavaScript objects
}

//Slower
const FetchSync = (method, url, returnType = "json", headers, data = {}, cors = "cors", cache = "no-cache", credentials = "same-origin", redirect = "follow", referrerPolicy = "no-referrer") => {
    method = method.toString().toUpperCase();
    returnType = returnType.toString().toLowerCase();
    const reqHeaders = new Headers();
    if (returnType != "text" && returnType != "json" && returnType != "blob")
        throw "Return Type must be Text, JSON, or Blob. Your requested return type was: " + returnType;
    if (headers) {
        Array.isArray(headers) ? 
        (
            headers.forEach(el => {
                reqHeaders.append(Object.keys(el), Object.values(el))
            })
        ) 
        : 
        (
            reqHeaders.append(Object.keys(headers), Object.values(headers))
        )
    }
    const response = method == "GET" || method == "HEAD" ?
    (
        fetch(url, {
                method: method,
                mode: cors,
                cache: cache,
                credentials: credentials,
                headers: reqHeaders,
                redirect: redirect,
                referrerPolicy: referrerPolicy
            })
            .then((response) => {
                if (!response.ok) {
                    return {Status: "Error", Message: "Server or Network might be not ok. Make sure you're connected to internet and the requested URL was right"}
                }
                if (returnType == "json") return response.json();
                else if (returnType == "text") return response.text();
                else if (returnType == "blob") return response.blob();
            })
            .catch(e => {
                return e;
            })
    )
    :
    (
        fetch(url, {
            method: method,
            mode: cors,
            cache: cache,
            credentials: credentials,
            headers: reqHeaders,
            redirect: redirect,
            referrerPolicy: referrerPolicy,
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (!response.ok) {
                return {Status: "Error", Message: "Server or Network might be not ok. Make sure you're connected to internet and the requested URL was right"}
            }
            if (returnType == "json") return response.json();
            else if (returnType == "text") return response.text();
            else if (returnType == "blob") return response.blob();
        })
        .catch(e => {
            return e;
        })
    )
    return response;
}

window.addEventListener("DOMContentLoaded", function(e) {
    // Store a copy of the fetch function
    var _oldFetch = fetch; 

    // Create our new version of the fetch function
    window.fetch = function()
    {
        // Create hooks
        var fetchStart = new Event( 'fetchStart', { 'view': document, 'bubbles': true, 'cancelable': false } );
        var fetchEnd = new Event( 'fetchEnd', { 'view': document, 'bubbles': true, 'cancelable': false } );

        // Pass the supplied arguments to the real fetch function
        var fetchCall = _oldFetch.apply(this, arguments);

        // Trigger the fetchStart event
        document.dispatchEvent(fetchStart);

        fetchCall.then(function(){
            // Trigger the fetchEnd event
            document.dispatchEvent(fetchEnd);
        })
        .catch(function(){
            // Trigger the fetchEnd event
            document.dispatchEvent(fetchEnd);
        })

        return fetchCall;
    };
});