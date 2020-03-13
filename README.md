=======================================
Fetch untuk pengganti AJAX dari JQUERY
Tidak Support untuk Internet Explorer !
=======================================

Usage :
1. FetchAsync(method, url, headers, data = {}, cors = "cors", cache = "no-cache", credentials = "same-origin", redirect = "follow", referrerPolicy = "no-referrer").then(res => console.log(res));
	Ex :
	FetchAsync('get', 'https://jsonplaceholder.typicode.com/posts', [{"a": 1}, {"asdasdads": 123232}]).then(res => console.log(res));
2. FetchSync(method, url, headers, data = {}, cors = "cors", cache = "no-cache", credentials = "same-origin", redirect = "follow", referrerPolicy = "no-referrer").then(res => console.log(res));
	Ex :
	FetchSync('get', 'https://jsonplaceholder.typicode.com/posts', [{"a": 1}, {"asdasdads": 123232}]).then(res => console.log(res));

More :
	https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch