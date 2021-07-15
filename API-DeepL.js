/*
	Author: Alexandru Edward Balaj
	Date: 15/07/2021
	Project: Simple DeepL API Integration
	License: MIT License
	File name: API-DeepL.js
	File description: JavaScript algorithm that parses the input, sends it using the DeepL API, 
					  and then parses the output to display it.
*/

var AUTH_KEY = "5652c0b9-adcf-7f2e-f6a2-3a577f700dc9:fx";

var SOURCE_LANG = "EN";

var READYSTATE_DONE = 4;
var STATUS_OK = 200;

var xmlHTMLRequest = new XMLHttpRequest();

function setup() {
	xmlHTMLRequest.open("POST", "https://api-free.deepl.com/v2/translate", true);

	xmlHTMLRequest.setRequestHeader("Accept", "*/*");
	xmlHTMLRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
}

function prepareText(original_text) {
	return original_text.split("\n");
}

function translateText() {
	setup();
	
	var target_language = document.getElementById("destionation-language").value;
	
	var original_text = document.getElementById("original-text").value;
	
	original_text_lines = prepareText(original_text);
	
	var request = "";
	for(var i = 0; i < original_text_lines.length; i++) {
		request += "&text=" + original_text_lines[i];
	}
	
	xmlHTMLRequest.onload = function () {
		if (xmlHTMLRequest.readyState === xmlHTMLRequest.DONE) {
			if (xmlHTMLRequest.status === 200) {
				var result = JSON.parse(xmlHTMLRequest.responseText);
				
				var translated_text = "";
				for(var i = 0; i < result.translations.length; i++) {
					translated_text += result.translations[i].text;
					translated_text += "\n";
				}
		
				document.getElementById("translated-text").value = translated_text;
			}
		}
	};
	
	xmlHTMLRequest.send("auth_key=" + AUTH_KEY + request + "&source_lang=" + SOURCE_LANG + "&target_lang=" + target_language);
}