const Utility = {

  transpose(array) {
    return array[0].map((col, i) => array.map(row => row[i]));
  }

};

export default Utility;
