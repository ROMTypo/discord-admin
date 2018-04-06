# Discord Bot Admin Page
Allows you to see stats for your Discord Bot. Works with all Discord Bot API's.

## How to use
1. Require the package
```js
var DiscordAdmin=require("discord-admin");
```
2. Create the class & run the webserver on port 3000
```js
var DiscordAdmin=require("discord-admin");
var Admin=new DiscordAdmin(3000);
```
3. Add actions
```js
// ... command `a` ...
Admin.addCommand("a");
// ... joins guild ...
Admin.addGuild();
// ... leaves guild ...
Admin.removeGuild();
```
4. Run & Visit localhost:3000
