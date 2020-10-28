const getWordsFromFile = async function (filename) {

  const readline = require('readline');
  const fs = require('fs');

  if (!fs.existsSync(filename)) {
    throw ('File not found');
  }
  
  const fileStream = fs.createReadStream(filename);
    
  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  let words = [];
  for await (const line of lines) {
    words.push(line);
  }
  return words;
};

exports.getWords = getWordsFromFile;