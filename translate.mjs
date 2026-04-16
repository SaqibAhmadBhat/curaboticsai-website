import fs from 'fs';
import path from 'path';

const langs = ['de', 'es', 'ar', 'ur', 'hi', 'fr', 'zh'];
const __dirname = path.resolve();

const enDict = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/i18n/locales/en.json'), 'utf8'));

function flattenObj(ob) {
  let result = {};
  for (const i in ob) {
    if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i]);
      for (const j in temp) {
        result[i + '.' + j] = temp[j];
      }
    } else {
      result[i] = ob[i];
    }
  }
  return result;
}

function unflattenObj(ob) {
  let result = {};
  for (const i in ob) {
    let keys = i.split('.');
    keys.reduce((r, e, j) => {
      if (j === keys.length - 1) {
        r[e] = ob[i];
      } else {
        r[e] = r[e] || {};
      }
      return r[e];
    }, result);
  }
  return result;
}

const flatEn = flattenObj(enDict);
const keys = Object.keys(flatEn);
const values = keys.map(k => flatEn[k].replace(/\|/g, ""));
const textToTranslate = values.join(" ||| ");

async function translateChunk(text, targetLang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  const json = await res.json();
  return json[0].map(item => item[0]).join('');
}

async function run() {
  console.log("Starting batched translation...");
  for (const lang of langs) {
    try {
      console.log(`Translating to ${lang}...`);
      const transStr = await translateChunk(textToTranslate, lang);
      const transVals = transStr.split(/\\s*\\|\\|\\|\\s*/);
      
      const newFlat = {};
      for (let i = 0; i < keys.length; i++) {
         newFlat[keys[i]] = transVals[i] ? transVals[i].replace(/^ | $/g, '') : values[i];
      }
      const newObj = unflattenObj(newFlat);
      const writePath = path.join(__dirname, `src/i18n/locales/${lang}.json`);
      fs.writeFileSync(writePath, JSON.stringify(newObj, null, 2));
      console.log(`Finished ${lang}. Saved to ${writePath}`);
    } catch(err) {
       console.error("Failed on " + lang, err.message);
    }
  }
  console.log("All translations completed!");
}

run();
