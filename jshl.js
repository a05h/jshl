'use strict';

const protoString = document.getElementById('code').innerHTML;
const colorset = { github: { color1: '#ee82ee',
                             color2: '#a52a2a'
                           }
                 };


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
    codeString = codeString.toString().replace(/,/g, '').replace(/&#x000a;/g, '<br>');

    document.getElementById('code').innerHTML = `${preCodeString} <br><span style="font-family:monospace;">${codeString}</span> <br>${postCodeString}`;
    
  } else {
    alert('/');
  }
  
} else {
  alert('//');
}
