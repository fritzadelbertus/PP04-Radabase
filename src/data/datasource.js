class DataSource {
  static async getDataSoal() {
    const thecsv = (csv) => {
      const raw = csv.replace(/Punya soal-soal atau solusinya namun belum tercantum di tabel ini\? Bantu sesama mahasiswa dengan isi form https:\/\/forms.gle\/FfKV1EhL8rY9nC238 /g, '');
      const clean = raw.replace(/"/g, '').replace(/, /g, '&ini koma&');
      const lines = clean.split('\n');

      let result = [];

      // NOTE: If your columns contain commas in their values, you'll need
      // to deal with those before doing the next step
      // (you might convert them to &&& or something, then covert them back later)
      // jsfiddle showing the issue https://jsfiddle.net/
      const headers = lines[0].split(',');

      for (let i = 1; i < lines.length; i += 1) {
        const obj = {};
        const currentline = lines[i].split(',');
        for (let j = 2; j < headers.length; j += 1) {
          if (j === 2 || j === 3 || j === 4 || j === 5 || j === 7 || j === 8 || j === 11) {
            obj[headers[j]] = currentline[j];
          }
        }
        result.push(obj);
      }
      const finalized = JSON.stringify(result).replace(/&ini koma&/g, ', ');
      result = JSON.parse(finalized);
      return Promise.resolve(result);
    };
    const spreadsheetsId = '1Y93SgMKxvJIfSoTJOQVtuLNASYVqjEVc7z61nmC8re0';
    const sheets = 'digitalisasi%20soal';
    const baseURL = `https://docs.google.com/spreadsheets/d/${spreadsheetsId}/gviz/tq?tqx=out:csv&sheet=${sheets}`;
    const result = await fetch(baseURL)
      .then((response) => response.text())
      .then((responseText) => thecsv(responseText));
    return result;
  }
}

export default DataSource;
