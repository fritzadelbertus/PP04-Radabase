import database from './database';
import DataSource from './datasource';

class DataControl {
  static initDataSoal() {
    if (database.fullDataSoal !== null) return Promise.resolve(false);
    return DataSource.getDataSoal()
      .then((response) => {
        database.fullDataSoal = response;
        database.noCategoryData = response.filter((item) => (
          !item.Jenis.match(/kuis \d/i) && !item.Jenis.match(/uts/i) && !item.Jenis.match(/uas/i)
        ));
      })
      .then(() => false);
  }

  static getFullDataSoal() {
    return database.fullDataSoal;
  }

  static searchDataSoal(soal = null, jenis = null) {
    if (jenis === 'Lainnya') {
      return database.noCategoryData;
    }
    const paramSoal = new RegExp(soal, 'i');
    const paramJenis = new RegExp(jenis, 'i');
    const result = database.fullDataSoal
      .filter((data) => data['Nama MK'].match(paramSoal) || data.Group.match(paramSoal))
      .filter((data) => data.Jenis.match(paramJenis));
    return result;
  }
}

export default DataControl;
