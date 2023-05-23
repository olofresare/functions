<?php

# Return a single column from every rows in array
if (!function_exists('array_column')) {
	function array_column($array, $key) {
		$column = array();
		foreach ($array as $row) {
			$column[] = $row[$key];
		}
		return $column;
	}
}
# Usage: 
// $records = array(
// 	array(
// 		'id' => 2135,
// 		'first_name' => 'John',
// 		'last_name' => 'Doe',
// 	),
// 	array(
// 		'id' => 3245,
// 		'first_name' => 'Sally',
// 		'last_name' => 'Smith',
// 	),
// 	array(
// 		'id' => 5342,
// 		'first_name' => 'Jane',
// 		'last_name' => 'Jones',
// 	),
// 	array(
// 		'id' => 5623,
// 		'first_name' => 'Peter',
// 		'last_name' => 'Doe',
// 	)
// );
// $first_names = array_column($records, 'first_name');
// print "<br /><br /><br /><pre>"; print_r($first_names); print "</pre>";

# Sort a multidimensional array after sub value
function array_sort_subval($a, $subkey, $order = 'asc', $reset = true) {
	$b = [];
	$c = [];

	foreach ($a as $k => $v) {
		$b[$k] = mb_strtolower($v[$subkey]);
	}
	
	$order = ($order === 'desc') ? arsort($b) : asort($b);

	foreach ($b as $key => $val) {
		$c[$key] = $a[$key];
	}

	$c = $reset ? array_values($c) : $c;

	return $b;
}
# Usage:
// $companies = array();
// $companies[] = array('uid'=>5, 'name'=>'kalle', 'profile_company_name' => 'Kalles grill');
// $companies[] = array('uid'=>10, 'name'=>'oscar', 'profile_company_name' => 'Busstationen');
// $companies[] = array('uid'=>2, 'name'=>'robert', 'profile_company_name' => 'Möbelbutik');
// $companies[] = array('uid'=>4, 'name'=>'tjorven', 'profile_company_name' => 'Östra skolan');
//
// $profile_array = array_sort_subval($companies, 'profile_company_name', 'asc');
// $name_array = array_sort_subval($companies, 'name', 'asc');
// $uid_array = array_sort_subval($companies, 'uid', 'desc');
// print "<br /><br /><br /><pre>"; print_r($profile_array); print "</pre>";
// print "<br /><br /><br /><pre>"; print_r($name_array); print "</pre>";
// print "<br /><br /><br /><pre>"; print_r($uid_array); print "</pre>";

# Test if mail function in php works
function mail_test($to = 'olof@inthecold.se', $from ='olof@inthecold.se', $subject = 'My subject', $message = 'Hi there') {
	$headers = 'From: ' . $from . "\r\n" . 'Reply-To: ' . $from . "\r\n" . 'X-Mailer: PHP/' . phpversion();
	return mail($to, $subject, $message, $headers);
}

# Trim leading/trailing spaces from multibyte string
function mb_trim($str) {
	return preg_replace("/(^\s+)|(\s+$)/us", "", $str); 
}
# Usage: 
// $string = mb_trim('  Häjsan våd gör dö?  ');
// print "<br /><br /><br /><pre>"; print_r(mb_strlen($string)); print "</pre>";

# Uppercase first letter in multibyte word
function mb_ucfirst($str, $encoding = 'UTF-8', $lower_str_end = false) {
	$first_letter = mb_strtoupper(mb_substr($str, 0, 1, $encoding), $encoding);
	$str_end = "";
	
	if ($lower_str_end) {
		$str_end = mb_strtolower(mb_substr($str, 1, mb_strlen($str, $encoding), $encoding), $encoding);
	}
	else {
		$str_end = mb_substr($str, 1, mb_strlen($str, $encoding), $encoding);
	}
	
	$str = $first_letter . $str_end;
	return $str;
}
# Usage: 
// $string = mb_ucfirst('HäjsAn håPPsan', 'UTF-8', true);
// print "<br /><br /><br /><pre>"; print_r($string); print "</pre>";

# Transliterate filenames
function transliteration_clean_filename($filename) {
	if (is_array($filename)) {
		foreach ($filename as $key => $value) {
			$filename[$key] = transliteration_clean_filename($value);
		}
		return $filename;
	}

	# Replace whitespace.
	$filename = str_replace(' ', '_', $filename);
	# Remove remaining unsafe characters.
	$filename = preg_replace('![^0-9A-Za-z_.-]!', '', $filename);
	# Remove multiple consecutive non-alphabetical characters.
	$filename = preg_replace('/(_)_+|(\.)\.+|(-)-+/', '\\1\\2\\3', $filename);
	# Force lowercase to prevent issues on case-insensitive file systems.
	$filename = strtolower($filename);
	return $filename;
}
# Usage:
#$filename = transliteration_clean_filename('håppzAb hÄjsazan.mp3');
#print "<br /><br /><br /><pre>"; print_r($filename); print "</pre>";


# Render template
function render_template($template, $vars = null) {
	if (!empty($vars)) {
		extract($vars, EXTR_SKIP);
	}
	ob_start();
	include $template;
	return ob_get_clean();
}
# Usage:
# echo render_template('test', array('smurf' => 'gammelsmurfen', 'age' => 31));
