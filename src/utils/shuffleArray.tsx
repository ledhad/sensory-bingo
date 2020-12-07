const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (j !== 12 && i !== 12) {
      [array[i], array[j]] = [array[j], array[i]]; // Thank you ES6
    }
  }
};

export default shuffleArray;
