/*
 * Copyright 2020 Sergei Sovik <sergeisovik@yahoo.com>
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

import { CountryInfo } from "./modules/countryInfo.js"
import { ISO639_1 } from "./modules/iso639-1.js"
import { Locales } from "./globals/locale.js"

/** Build Language to Country Map */

/** @type {Object<string, string>} */
let oLang = {};

/** @type {Object<string, number>} */
let oPopulation = {};

for (let sKey in CountryInfo) {
	/** @type {Array<string>} */ let oCountryInfo = CountryInfo[sKey];
	/** @type {Array<string>} */ let aLanguages = oCountryInfo[14].split(',');
	/** @type {string} */ let sLang = aLanguages[0].substr(0, 2);
	/** @type {number} */ let iPopulation = oCountryInfo[6] | 0;
	if (sLang.length > 0) {
		if ((oLang[sLang] === undefined) || (oPopulation[sLang] < iPopulation)) {
			oLang[sLang] = sKey;
			oPopulation[sLang] = iPopulation;
		}
	}
}

oLang['en'] = 'US'; // Искусственное возвышение значимости, несмотря на то что большее число говорящих на англ в Индии :)

// Uncomment for update LanguageInfo
//platform.console.log(JSON.stringify(oLang));

/** Example Usage */
for (let iIndex in Locales) {
	let sLocale = Locales[iIndex | 0];
	let sLanguage = sLocale.substr(0, 2);
	let sCountry = sLocale.substr(-2);
	
	platform.console.log('[' + sLocale + '] ' + ISO639_1[sLanguage]['name'] + ' (' + CountryInfo[sCountry][3] + ')');
}
