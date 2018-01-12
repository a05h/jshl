'use strict';

const protoString = document.getElementById('code').innerHTML;
const fontFamily = 'monospace';
const colorset = { github: { color1: '#728bf5',
                             color2: '#a52a2a'
                           }
                 };

const tags = { for: '&#x0066;&#x006f;&#x0072;', while: '&#x0077;&#x0068;&#x0069;&#x006c;&#x0065;'};


function unicodeSf(string) {
  let line = string.toString(),
      lineEntries = line.split('');
  lineEntries = lineEntries.map((element) => {
    return element.charCodeAt(0).toString(16);
  });
  for (let i = 0; i < lineEntries.length; i++) {
    while (lineEntries[i].length < 4) {
      lineEntries[i] = '0' + lineEntries[i];
    }
    lineEntries[i] = '&#x' + lineEntries[i] + ';';
  }
  return lineEntries;
};



if (protoString.includes('[code]') && protoString.includes('[/code]')) {
  const opnTag = protoString.indexOf('[code]') + 6, 
        clsTag = protoString.indexOf('[/code]', opnTag + 1);
  
  if (opnTag < clsTag) {
    alert(`${opnTag} ${clsTag}`);
    const preCodeString = protoString.substr(0, protoString.indexOf('[code]')),
          postCodeString = protoString.substr(clsTag + 7, protoString.length);
    let codeString = protoString.substring(opnTag, clsTag);
    codeString = unicodeSf(codeString);
    codeString = codeString.toString().replace(/,/g, '').replace(/&#x000a;/g, '<br>'); //new line
    
    codeString = codeString.replace(/&#x006c;&#x0065;&#x0074;/g, `<span style="color: ${colorset.github.color2}">let</span>`); //let
    codeString = codeString.replace(/&#x0066;&#x0075;&#x006e;&#x0063;&#x0074;&#x0069;&#x006f;&#x006e;/g, `<span style="color: ${colorset.github.color1}">function</span>`); //function
    
    
    codeString = codeString.replace(/&#x0020;/g, '&nbsp;'); //spaces
    

    document.getElementById('code').innerHTML = `${preCodeString} <br><span style="font-family:${fontFamily};">${codeString}</span> <br>${postCodeString}`;
    
  } else {
    alert('/');
  }
  
} else {
  alert('//');
}
