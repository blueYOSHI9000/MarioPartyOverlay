// === USER WHITELIST ===
//All mods and the streamer got automatically access to all normal and admin commands, these lists are only in case others should have access too
//Add users like this: ['user1', 'user2', 'user3', 'etc'] (just replace "['']")
var userWhitelist = [''] //Add users that should acces the normal commands here
var adminlist = [''] //Add users that should acces the admin command here


/*
=== DISABLE MESSAGES ===
Scroll past this tutorial and you should find another note that says "DISABLE MESSAGES", theres the tutorial for that.

=== SYNTAX ===
In case you want to edit the messages, you need to know the syntax of it which is quite easy actually. There's more text explaining where you need to edit what below, always starting with "//".

Basic text output needs to be between '', example: If you want to say " hi ", writing " hi " won't work, you need to write " 'hi' "
If you want to write the users name, you need to write " user " without the '' (if you include the '' it will write "user" and not the users name!)
In case your writing a error message, you can inlcude the mistake they did with " error " (again, without '', else it writes "error" and not the mistake they did!)

If you want to use ' inside a message (for "doesn't" as a example), you need to put a \ before it. Example: doesn't => doesn\'t
The same may apply to other special characters too (not " or () ), either try playing a \ for it or try to find another way without using the special character

Now the important part, between basic text and "user"/"error" you need to write a + to combine them, else it won't work. If something doesn't work it's likely that you either misspeled "user"/"error" or forgot a +

=== EXAMPLES ===
Code: send('hi @' + user)
Output: hi @*username*

User Input: "!mpo p1 happeng +1"
Code: send(error + 'doesn\'t exist, @' + user)
Output: happeng doesn't exist, @*username*

*/

function sendMsg (action, user, error) {
	if (action == 'connected') {

		// = Connected message = Shows up when MPO is connected to twitch | Can't use "user" or "error"
		send('MPO has succesfully connected to Twitch, please use the offline version of this, link is on the github page, else it could slow down due to Twitch API limit.')
	}

	// === DISABLE MESSAGES ===
	//If you want to disable messages (connected message will still appear), remove the "\\" before "return;" one line below this, readd them to activate messages again
	//return;

	switch (action) {
		case 'help':

			// = Help command = Shows up when someone executes the help command | Can only use "user"
			send('Correct usage: "!mpo *player* *counter* *action*"; "!mpo p1 happening +1", more help avaible at: https://blueyoshi9000.github.io/MarioPartyOverlay/commands.html')
			break;
		case 'completed':

			// = Command completed = Shows up when a command has been completed | Can only use "user"
			send('@' + user + ', action completed.')
			break;
		case 'invalid':

			// = Invalid Argument = Shows up when someone used a invalid argument (example: happeng instead of happening) | Can use both "user" and "error"
			send('@' + user + ', "' + error + '" is a invalid argument, check "!mpo commands" for help.')
			break;
		case 'lastMissing':

			// = Argument missing = Shows up when the last argument is missing | Can only use "user"
			send('@' + user + ', your last argument is missing, check "!mpo commands" for help.')
			break;
		case 'noPermission':

			// = No permission = Shows up when the user doesn't have the permission to use the command | Can only use "user"
			send('@' + user + ', you don\'t have the permission to use that command.')
			break;
	}
}

function send (text) {
	TAPIC.sendChat(text)
}