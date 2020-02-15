/*
 * Copyright 2020 Sergio Rando <segio.rando@yahoo.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *		http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

import { LanguageInfo } from "./../modules/countryInfo.js"

const reLOCALE = /^([a-z]{2})(-([a-zA-Z]{2}))?$/i

function parseLocale(sLocale) {
	let reaLocale = reLOCALE.exec(sLocale);
	let sLanguage = reaLocale[1] || null;
	let sCountry = reaLocale[3] || null;
	
	if (sLanguage === null) {
		return 'en_US';
	} else if (sCountry === null) {
		if (LanguageInfo[sLanguage] === undefined) {
			return 'en_US';
		}
		sCountry = LanguageInfo[sLanguage];
	}

	return sLanguage + '_' + sCountry;
}

function detectLocales() {
	let aList = (platform['navigator'] === undefined) ? [ 'ru', 'en', 'en-US' ] : (navigator.languages || [ navigator.language ]);

	let aLocales = [];

	for (let iIndex in aList) {
		let sLocale = aList[iIndex | 0];
		sLocale = parseLocale(sLocale);
		if (aLocales.indexOf(sLocale) < 0)
			aLocales.push(sLocale);
	}

	return aLocales;
}

/** @type {Array<string>} */
export const Locales = detectLocales();
