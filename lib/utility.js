const Utility = {

  transpose(array) {
    return array[0].map((col, i) => array.map(row => row[i]));
  },

  removeA(arr) {
    let what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
      what = a[--L];
      while ((ax= arr.indexOf(what)) !== -1) {
        arr.splice(ax, 1);
      }
    }
    return arr;
  }
};

export default Utility;
