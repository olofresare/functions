function empty(mixed_var) {
	var undef, key, i, len;
	var emptyValues = [undef, null, false, 0, '', '0'];

	for (i = 0, len = emptyValues.length; i < len; i++) {
		if (mixed_var === emptyValues[i]) {
			return true;
		}
	}

	if (typeof mixed_var === 'object') {
		for (key in mixed_var) {
			return false;
		}
		return true;
	}

	return false;
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function trim(str, charlist) {
	var whitespace, l = 0,
		i = 0;
	str += '';

	if (!charlist) {
		// default list
		whitespace =
			' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
	} else {
		// preg_quote custom list
		charlist += '';
		whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
	}

	l = str.length;
	for (i = 0; i < l; i++) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(i);
			break;
		}
	}

	l = str.length;
	for (i = l - 1; i >= 0; i--) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(0, i + 1);
			break;
		}
	}

	return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}

function setCookie(key, value) {
	var expires = new Date();
	expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
	document.cookie = key + '=' + value +';path=/'+ ';expires=' + expires.toUTCString();
}

function getCookie(key) {
	var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
	return keyValue ? keyValue[2] : null;
}

function in_array(needle, haystack, argStrict) {
	var key = '',
		strict = !! argStrict;
	
	if (strict) {
		for (key in haystack) {
			if (haystack[key] === needle) {
				return true;
			}
		}
	} else {
		for (key in haystack) {
			if (haystack[key] == needle) {
				return true;
			}
		}
	}
	return false;
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function base64_encode(data) {
	var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
		ac = 0,
		enc = '',
		tmp_arr = [];

	if (!data) {
		return data;
	}

	data = unescape(encodeURIComponent(data));

	do {
		// pack three octets into four hexets
		o1 = data.charCodeAt(i++);
		o2 = data.charCodeAt(i++);
		o3 = data.charCodeAt(i++);

		bits = o1 << 16 | o2 << 8 | o3;

		h1 = bits >> 18 & 0x3f;
		h2 = bits >> 12 & 0x3f;
		h3 = bits >> 6 & 0x3f;
		h4 = bits & 0x3f;

		// use hexets to index into b64, and append result to encoded string
		tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	} while (i < data.length);

	enc = tmp_arr.join('');

	var r = data.length % 3;

	return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}


function number_format(number, decimals, dec_point, thousands_sep) {
	var that = this;
	
	number = (number + '')
		.replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function (n, prec) {
			var k = Math.pow(10, prec);
			return '' + (Math.round(n * k) / k)
				.toFixed(prec);
		};
	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
		.split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '')
		.length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1)
			.join('0');
	}
	return s.join(dec);
}

function array_keys(input, search_value, argStrict) {
	var search = typeof search_value !== 'undefined',
	tmp_arr = [],
	strict = !!argStrict,
	include = true,
	key = '';

	if (input && typeof input === 'object' && input.change_key_case) {
		// Duck-type check for our own array()-created PHPJS_Array
		return input.keys(search_value, argStrict);
	}

	for (key in input) {
		if (input.hasOwnProperty(key)) {
			include = true;
			if (search) {
				if (strict && input[key] !== search_value) {
					include = false;
				} else if (input[key] != search_value) {
					include = false;
				}
			}

			if (include) {
				tmp_arr[tmp_arr.length] = key;
			}
		}
	}

	return tmp_arr;
}

function array_diff(arr1) {
	var retArr = {},
		argl = arguments.length,
		k1 = '',
		i = 1,
		k = '',
		arr = {};

	arr1keys: for (k1 in arr1) {
		for (i = 1; i < argl; i++) {
			arr = arguments[i];
			for (k in arr) {
				if (arr[k] === arr1[k1]) {
					// If it reaches here, it was found in at least one array, so try next value
					continue arr1keys;
				}
			}
			retArr[k1] = arr1[k1];
		}
	}

	return retArr;
}

function array_values(input) {
	var tmp_arr = [],
		key = '';
	
	if (input && typeof input === 'object' && input.change_key_case) {
		// Duck-type check for our own array()-created PHPJS_Array
		return input.values();
	}
	
	for (key in input) {
		tmp_arr[tmp_arr.length] = input[key];
	}

	return tmp_arr;
}

function in_array(needle, haystack, argStrict) {
	var key = '',
		strict = !!argStrict;
	
	//we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] == ndl)
	//in just one for, in order to improve the performance 
	//deciding wich type of comparation will do before walk array
	if (strict) {
		for (key in haystack) {
			if (haystack[key] === needle) {
				return true;
			}
		}
	} else {
		for (key in haystack) {
			if (haystack[key] == needle) {
				return true;
			}
		}
	}

	return false;
}

function cloneObject(obj) {
	var clone = {};
	for (var i in obj) {
		if (typeof(obj[i]) == "object" && obj[i] != null) {
			clone[i] = cloneObject(obj[i]);
		} else {
			clone[i] = obj[i];
		}
	}
	return clone;
}

Object.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			size++; 
		}
	}
	return size;
}
