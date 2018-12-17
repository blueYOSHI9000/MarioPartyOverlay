/*
* Calls a function for the main site and the settings popout (if activated).
* 
* @param {string} functionName The function that shoudl be called (without the '()').
* @param {array} attributes The attributes that the function should use.
*/
function changeSettings (functionName, attributes) {
	//console.log('functionName: '  + functionName + ', attributes: ' + attributes)
	if (popout == true) {
		if (attributes) {
			sendMessage(functionName + ',' + attributes.join(','))
		} else {
			sendMessage(functionName)
		}
	}
	executeFunctionByName(functionName, attributes)
}

/*
* Changes Themes incl. greenscreen.
* 
* @param {number} theme Which theme should be used.
*/
var bgColor = '#0000ff'
var curTheme = 1
function changeTheme (theme) {
	bgColor = document.getElementById('bgColor').value
	styleExtra = 'no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;"'

	if (theme) {} else {
		theme = curTheme
	}

	if (document.getElementById('greenscreen').checked == true) {
		document.getElementById('bodyElement').style.background = bgColor
	} else {
		switch (theme) {
			case 2:
				document.getElementById('bodyElement').style = 'background: url(img/MP9-bg.jpg)' + styleExtra
				curTheme = 2
				break;
			case 3:
				document.getElementById('bodyElement').style = 'background: url(img/NSMBW-bg.jpg)' + styleExtra
				curTheme = 3
				break;
			default:
				document.getElementById('bodyElement').style = 'background: url(img/background.jpg)' + styleExtra
				curTheme = 1
				break;
		}
	}
	document.getElementById('themeB1').style = ''
	document.getElementById('themeB2').style = ''
	document.getElementById('themeB3').style = ''
	document.getElementById('themeB1').disabled = ''
	document.getElementById('themeB2').disabled = ''
	document.getElementById('themeB3').disabled = ''
	switch (theme) {
		case 2:
			document.getElementById('themeB2').style = 'border-color: green;'
			document.getElementById('themeB2').disabled = 'true'
			curTheme = 2
			break;
		case 3:
			document.getElementById('themeB3').style = 'border-color: green;'
			document.getElementById('themeB3').disabled = 'true'
			curTheme = 3
			break;
		default:
			document.getElementById('themeB1').style = 'border-color: green;'
			document.getElementById('themeB1').disabled = 'true'
			curTheme = 1
			break;
	}
}

/*
* Changes the icon style.
* 
* @param {string} id Where it got called from.
* @param {string} selected Which icons should be used.
*/
function changeIcons (id, selected) {
	if (selected) {} else {
		selected = document.querySelector('input[name=' + id + ']:checked').value
	}
	var charImg = document.querySelectorAll('.characterImg')

	document.getElementById(selected).checked = true
	document.getElementById(selected + '2').checked = true

	for (var num = 0; num < charImg.length; num++) {
		var charImgSrc = charImg[num].src

		charImgSrc = charImgSrc.split('')
		var result = []
		for (var num2 = charImgSrc.length; num2 > 0; num2--) {
			if (charImgSrc[num2] == '/') {
				break;
			} else {
				result.push(charImgSrc[num2])
			}
		}
		charImgSrc = charImgSrc.join('')
		result = charImgSrc.substring(charImgSrc.length - result.length)
		charImg[num].src = ['img/', selected, '/', result].join('')
	}
	coinStarTie()
}

/*
* Changes background color if greenscreen is used.
* 
* @param {string} id Id of the input element that changed its value.
*/
function changeBGColor (id) {
	bgColor = document.getElementById(id).value
	if (document.getElementById('greenscreen').checked == true) {
		document.getElementById('bodyElement').style.background = bgColor
	}
	document.getElementById('bgColor').value = bgColor
	document.getElementById('bgColorPick').value = bgColor

	document.getElementById('colorPickerBG').style = 'background-color: ' + bgColor + ';'
}


/*
* Resets the Greenscreen color.
*/
function resetBGColor () {
	document.getElementById('bgColor').value = '#0000FF'
	changeBGColor('bgColor')
}

/*
* Changes text color for everything outside of settings.
* 
* @param {string} id Id of the input element that changed its value.
*/
function changeTextColor (id) {
	var whiteText = document.querySelectorAll(".whiteText")
	var counterText = document.querySelectorAll(".counterText")
	var turns = document.querySelectorAll(".turns")
	var mobile = document.querySelectorAll(".mobileTypeLabel")
	var border = document.querySelectorAll(".changesBorder")

	var color = document.getElementById(id).value

	for (var num = 0; num < whiteText.length; num++) {
		whiteText[num].style.color = color
	}
	for (var num = 0; num < counterText.length; num++) {
		counterText[num].style.color = color
	}
	for (var num = 0; num < turns.length; num++) {
		turns[num].style.color = color
	}
	for (var num = 0; num < mobile.length; num++) {
		mobile[num].style.color = color
	}
	for (var num = 0; num < border.length; num++) {
		border[num].style.borderColor = color
	}

	document.getElementById('textColor').value = color
	document.getElementById('textColorTest').value = color
	callHighlight()
}

/*
* Resets the Text color.
*/
function resetTextColor () {
	document.getElementById('textColor').value = '#FFFFFF'
	changeTextColor('textColor')
}

// === INTERACT.JS ===
// target elements with the "draggable" class
interact('.draggable')
	.draggable({
		// enable inertial throwing
		inertia: true,
		// keep the element within the area of it's parent
		/* restrict: {
			restriction: "parent",
			endOnly: true,
			elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		},*/ 
		// enable autoScroll
		autoScroll: true,

		// call this function on every dragmove event
		onmove: dragMoveListener,
		// call this function on every dragend event
		onend: function (event) {
		var textEl = event.target.querySelector('p');

		textEl && (textEl.textContent =
			'moved a distance of '
			+ (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
				Math.pow(event.pageY - event.y0, 2) | 0))
				.toFixed(2) + 'px');
	}
});

function dragMoveListener (event) {
	if (document.getElementById('enableInteract').checked == true) {
		var target = event.target,
			// keep the dragged position in the data-x/data-y attributes
			x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
			y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

		// translate the element
		target.style.webkitTransform =
		target.style.transform =
			'translate(' + x + 'px, ' + y + 'px)';

		// update the posiion attributes
		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
	}
}
// === INTERACT.JS END ===