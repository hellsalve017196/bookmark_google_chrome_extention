# bookmark_google_chrome_extention
now you can store bookmarks on your own firebase server

# Install
```sh

git clone https://github.com/hellsalve017196/bookmark_google_chrome_extention/ save_bookmarks

cd save_bookmarks

nano app/controllers.js

go to line 20:
ref = new Firebase('https://urlamammia.firebaseio.com/'+localStorage.getItem("user"));

give your firebaseapp url

```
