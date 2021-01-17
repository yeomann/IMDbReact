const keyToValue = (text: string) => {
  let convertedKey: string = text[0].toUpperCase();

  for (let i = 1; i < text.length; i++) {
    if (text[i] === '.') {
      convertedKey += ` - ${text[i + 1].toUpperCase()}`;
      i++;
      continue;
    }
    // put a space before
    else if (text[i] === text[i].toUpperCase()) {
      convertedKey += ` ${text[i]}`;
    } else {
      convertedKey += text[i];
    }
  }
  return convertedKey;
};

export { keyToValue };
