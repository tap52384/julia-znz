;(function(irn, $, window, document, undefined ) {

// this allows for javascript that should work pretty consistently across browsers and platforms.
'use strict';


/* returns true if enter was pressed */
function wasEnterPressed(e) {

    var ButtonKeys = {
        'EnterKey': 13,
        'iPhoneEnter': 10,
        'T': 84,
        'Y': 89,
        'CTRL': 17,
        'F3': 114,
        'F5': 116

    };


    return !isNullOrEmpty(e) && (e.which === ButtonKeys.EnterKey || e.which === ButtonKeys.iPhoneEnter || e.keyCode === ButtonKeys.EnterKey || e.keyCode === ButtonKeys.iPhoneEnter);


}

/* function for preventing the default action given the event
e - the keyup or keydown or any event really
*/
function preventDefaultAction(e, override) {

    if (wasEnterPressed(e) || override === true) {

        if (!isNullOrEmpty(e)) {

            if (e.stopPropagation) { e.stopPropagation(); }
            else { e.cancelBubble = true; }

            if (e.preventDefault) { e.preventDefault(); }

        }

        // if all else fails, return false
        return false;

    }


} // end of function


/* scrolls the window to the top */
function hide_address_bar() {

    window.scrollTo(0, 1);
    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 0);

} // end of hide_address_bar function


/* private utility functions */

    function isNullOrEmpty(x) {

    return x === undefined || x === '' || x === null;

}


/*
Returns true if the specified property exists in the specified object.
obj - a DOM element only to prevent endless recursion
prop - a string name of a property
*/
function hasProperty(obj, prop) {

if (isNullOrEmpty(obj) || isNullOrEmpty(prop))
{
	return false;
}

return Object.prototype.hasOwnProperty.call(obj, prop) || obj.hasOwnProperty(prop) || obj.prop !== undefined || 'undefined' !== typeof obj[prop]; // || prop in obj; // doesn't like this when with PHP


} // end of function


/* from a string id, dom object, or jQuery object, get the DOM object. */
function getDOMObject(obj) {

    var elem = null,
        jqueryobj = null;


    if (isNullOrEmpty(obj) || isNullOrEmpty(document)) {
        return null;
    }

    if (isValidStringObject(obj)) {

		// replace all pound signs in the element name
        elem = document.getElementById(obj.replace(/#/g,''));

        // if the element already exists, return the text content using pure javascript if supported
        // otherwise, use jQuery
        if (!isNullOrEmpty(elem)) {

            return elem;

        }

        // if we cannot get the DOM element this way, try doing so using jQuery
        jqueryobj = $(obj);

        if (isValidjQueryObject(jqueryobj) && jqueryobj.length > 0) {
            return jqueryobj[0];
        }

    }
    else if (isValidjQueryObject(obj) && obj.length > 0) {
        return obj[0];
    }
    else if (hasProperty(obj, 'tagName') ) { return obj; }

    return null;

}


// returns true if the specified object is a jQuery object
// 2013.10.01 - makes sure jQuery is defined first
function isValidjQueryObject(elem) {

    return !isNullOrEmpty(elem) && typeof jQuery !== 'function' && elem instanceof jQuery;

}


// if the specified object is a string, return true.
function isValidStringObject(s) {

    return !isNullOrEmpty(s) && Object.prototype.toString.call(s) === '[object String]';

}

/* logs the specified text to the console, if there is access. */
function log(text) {

    if (window.console && window.console.log && isValidStringObject(text)) {
        window.console.log(text);
    }

}


/* returns a value if the element has one. */
function getValue(obj) {

    var elem = getDOMObject(obj);

    // get the value if the textcontent property does not exist
    if (hasProperty(elem, 'value')) { return elem.value; }

    // make this work a little smarter (id, dom element, or jquery element
    if (hasProperty(elem, 'textContent')) { return elem.textContent; }

	// default value to be returned
	return '';

}




function isValidName(str) {

	if (isNullOrEmpty(str)) { return false; }

	return (/^[a-z][a-z\-\'\ ]+$/gi).test(str);

}

// from here: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
function isValidEmail(email) {

	if (isNullOrEmpty(email)) { return false; }

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function isValidPhoneNumber(p) {
  var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/,
  digits = p.replace(/\D/g, '');
  return (digits.match(phoneRe) !== null);
}


// ready
$(function() {

	// hide the address bar on mobile devices
	hide_address_bar();

	// prevent the phone support from clicking
	var phonesupport = getDOMObject('#phone-support'),
		footersignup = getDOMObject('#footer-signup'),
		orientationsignup = getDOMObject('#orientation-signup'),
		mainsignup = getDOMObject('#main-signup');

	if (!isNullOrEmpty(mainsignup)) {

		mainsignup.onclick = function(e) {

			var fname = getValue('#fname'),
			lname = getValue('#lname'),
			email = getValue('#email'),
			phone = getValue('#phone'),
			alerttext = '';

			if (!isValidName(fname)) {

				alerttext = 'Please enter a valid first name.';

			}
			else if (!isValidName(lname)) {

				alerttext = 'Please enter a valid last name.';

			}
			else if (!isValidEmail(email)) {

				alerttext = 'Please enter a valid email address.';
			}
			else if (!isValidPhoneNumber(phone)) {

				alerttext = 'Please enter a valid phone number.';
			}

			// prevent form submission if there is an error
			if (!isNullOrEmpty(alerttext)) {
				preventDefaultAction(e, true);

				alert(alerttext);

			}

		};


	}

	if (!isNullOrEmpty(phonesupport)) {

		phonesupport.onclick = function(e) {

			preventDefaultAction(e, true);

		};

	} // end of if statement

	if (!isNullOrEmpty(footersignup)) {

		footersignup.onclick = function() {

			window.location.href = 'http://www.starter.instantrewards.net/index.php?ref=184860';

		};
	}

	if (!isNullOrEmpty(orientationsignup)) {

		orientationsignup.onclick = function() {

			window.location.href = 'http://www.starter.instantrewards.net/index.php?ref=184860';

		};
	}


}); // end of ready function





} ( window.irn = window.irn || {}, jQuery, window, document ));
// down here is the code the defines the parameters used at the top of this self-executing function. undefined is not defined so it is undefined. LOL