/*
••••••••••••••••••••••••••••••••••••••••••••••••
Copyright (C) 2015 Codesse. All rights reserved.
••••••••••••••••••••••••••••••••••••••••••••••••
*/

WordGame = function(baseString) {
     
    const baseLetterMap = getLetterMap(baseString);
    let validWords = [];
    let highscores = [];

    function getLetterMap (word) {
        const letterMap = {};
        for (letter of word.split('')) {
            if (!letterMap[letter]) {
                letterMap[letter] = 1;
            } else {
                letterMap[letter] = letterMap[letter] + 1;
            }
        }

      return letterMap;
    }

    this.setValidator = async function (validatorFile) {
        const getWords = require('./getWordsFromFile.js').getWords;
        validWords = await getWords(validatorFile);
    }


this.submitWord = function (word) {
    
    const isInWordList = validWords.includes(word);

    const letterMap = getLetterMap(word);

    let isInBaseString;
    for (const [key, value] of Object.entries(letterMap)) {
        if (baseLetterMap[key] && baseLetterMap[key] >= value) {
            isInBaseString = true;
        } else {
            isInBaseString = false;
            break;
        }
    }

    let success = isInWordList & isInBaseString;

    if (success) {
        const entry = { word, score: word.length };
        insertHighScore(entry);
    } 
 };

 function insertHighScore (entry) {
    
    if (highscores.filter(x => x.word === entry.word).length > 0) {
        return;
    }

    if (highscores.length === 10) {
        return;
    }

    let added = false;
    for (i = 0; i < highscores.length; i++) {
        if (entry.score > highscores[i].score) {
            highscores.splice(i, 0, entry);
            added = true;
            break;
        }
    }

    if (!added) {
        highscores.splice(highscores.length, 0, entry); 
    }
 }
 
 this.getWordEntryAtPosition = function (position) {
    return highscores[position] ? highscores[position].word : null;
 };
 
/*
What is your favourite color? Please put your answer in your submission (this is for testing if you have read the comments).
**CHECK README** 
*/
 this.getScoreAtPosition = function (position) {
    return highscores[position] ? highscores[position].score : null;
 };
 
};

exports.game = WordGame;
