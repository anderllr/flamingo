//function to create new empty elements in a flat list to make objects with the same size
export const createRows = (data, columns) => {
  const rows = Math.floor (data.length / columns); // [A]

  let lastRowElements = data.length - rows * columns; // [B]

  if (data.length === 0 || data.length === columns || lastRowElements === 0)
    return data;

  while (lastRowElements !== columns) {
    // [C]
    data.push ({
      // [D]
      id: `empty-${lastRowElements}`,
      name: `empty-${lastRowElements}`,
      empty: true,
    });
    lastRowElements += 1; // [E]
  }
  return data; // [F]
};

export const onlyNumbers = text => {
  let newText = '';
  let numbers = '0123456789';

  for (var i = 0; i < text.length; i++) {
    if (numbers.indexOf (text[i]) > -1) {
      newText = newText + text[i];
    }
  }

  return newText === '' ? 0 : parseInt (newText);
};

export const returnValueMasked = (value, decimal) => {
  if (value > 0) {
    const div = decimal === 1 ? 10 : decimal === 2 ? 100 : 1000;
    let vlDivided = (value / div).toString ().split ('.');
    const vlInt = vlDivided[0];
    let vlDecimal = returnZeros ('', decimal);
    if (vlDivided.length > 1) {
      vlDecimal = returnZeros (vlDivided[1], decimal);
    }

    return `${vlInt},${vlDecimal}`;
    //colocar aqui se for length igual a 1 tem que colocar todas as casas decimais senao só as duas ultimas
  } else return '';
};

const returnZeros = (value, qtDec) => {
  let newValue = value;
  for (var i = 0; i < qtDec - value.length; i++) {
    newValue = newValue + '0';
  }
  return newValue;
};
