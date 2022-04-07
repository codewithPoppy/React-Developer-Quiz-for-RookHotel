### The Answer for Quiz 4

1. The variable **json** should be as following since it's a json variable.
```
    var json = {
        json: {
            a: 1,
            b: 2
        },
        delay: 3
    };
```

2. And the body of the post request should be:
```
    fetch('/echo/', {
        ...
        body: JSON.stringify(json);
    })
```
3. **fetch** is an asynchronous function
```
server_echo.forEach(
    element => console.log(element)
)
```
- This code will be executed not after the fetch request receives the response as it's a asynchronous function.
- The compiler meets the fetch function and it puts it to event queue (javascript is event-driven using event queue and event loop) and executes the next statement.
- So it will always get **undefined**
- **What we can do is**
    
    ```
    .then(function (response) {
        server_echo = response.json().echo
        server_echo.forEach(
            element => console.log(element)
        )
        return response.json();
    })
    ```
    or we can use **async/await** for fetch function.
