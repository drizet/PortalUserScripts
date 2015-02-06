function Random() { }

Random.getRandomCharacter = function (symbols) {
    return symbols.charAt(Math.floor(Math.random() * symbols.length));
};
Random.getUserName = function (symbolsCount) {
    return Random.getText({prefix: "test", hasNumbers: true, symbolsCount: symbolsCount });
};
Random.getEmail = function (symbolsCount, domain) {
    domain = domain || "bwin.com";
    return Random.getUserName(symbolsCount) + "@" + domain;
};

Random.getText = function (symbolsCount, prefix, hasNumbers){
    var settings = {
        prefix : "",
        symbolsCount : 5,
        hasNumbers : false
    };

    if (typeof symbolsCount === "number") {
        $.extend(settings, {
            prefix : prefix,
            hasNumbers : hasNumbers,
            symbolsCount : symbolsCount,
        });
    }
    else {
        $.extend(settings, symbolsCount);
    }

    var text = "";
    var symbols = "abcdefghijklmnopqrstuvwxyz";

    if (settings.hasNumbers) {
        symbols += "0123456789";
    }

    for (var i = 0; i < settings.symbolsCount; i++) {
        text += Random.getRandomCharacter(symbols);
    }

    return settings.prefix + text;
};

Random.getNumbers = function (symbolsCount) {
    var numbers = "";
    var symbols = "0123456789";
    
    numbers += Random.getRandomCharacter(symbols.substring(1));
    for (var i = 0; i < symbolsCount - 1; i++) {
        numbers += Random.getRandomCharacter(symbols);
    }

    return numbers;
};
