import React, { useState, useEffect } from 'react';
import DataControl from '../data/datacontrol';

function TabelSoal() {
  // States
  const itemPerTab = 10;
  const [database, setDatabase] = useState(DataControl.getFullDataSoal());
  const [currentData, setCurrentData] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [inputSearch, setInputSearch] = useState('');
  const [inputJenis, setInputJenis] = useState('');

  // Functions
  const searchSoal = () => {
    setCurrentTab(0);
    setDatabase(DataControl.searchDataSoal(inputSearch, inputJenis));
  };
  const handlePrevClick = () => {
    if (currentTab <= 0) {
      setCurrentTab(Math.floor(database.length / itemPerTab));
    } else {
      setCurrentTab(currentTab - 1);
    }
  };
  const handleNextClick = () => {
    if (currentTab + 1 > database.length / itemPerTab) {
      setCurrentTab(0);
    } else {
      setCurrentTab(currentTab + 1);
    }
  };
  const generateTextHasil = () => {
    const soalSekarang = currentTab * itemPerTab + 10 > database.length ? database.length
      : currentTab * itemPerTab + 10;
    const totalSoal = database.length;
    return `${soalSekarang} dari ${totalSoal} soal`;
  };

  // Effects
  useEffect(() => {
    setCurrentData(database.slice(currentTab * itemPerTab, currentTab * itemPerTab + 10));
  }, [currentTab, database]);

  return (
    <div className="TabelSoal">
      <header>
        <h1>Digitalisasi Soal</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          searchSoal();
        }}
        >
          <button type="submit"><i className="fa-solid fa-magnifying-glass" /></button>
          <input
            className="kode-search"
            placeholder="Nama Mata Kuliah"
            value={inputSearch}
            onChange={(e) => { setInputSearch(e.target.value); }}
          />
          <select onChange={(e) => { setInputJenis(e.target.value); }}>
            <option value="">All</option>
            <option value="Kuis 1">Kuis 1</option>
            <option value="Kuis 2">Kuis 2</option>
            <option value="Kuis 3">Kuis 3</option>
            <option value="Kuis 4">Kuis 4</option>
            <option value="UTS">UTS</option>
            <option value="UAS">UAS</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </form>
      </header>
      <h2>Hasil Pencarian</h2>
      <div className="table-navigation-btn">
        <button type="button" onClick={() => { handlePrevClick(); }}>Prev</button>
        <p>{generateTextHasil()}</p>
        <button type="button" onClick={() => { handleNextClick(); }}>Next</button>
      </div>
      <div className="box-kartu">
        { currentData.length > 0
          ? (
            currentData.map((soal) => (
              <div className="KartuSoal" key={soal['Kode MK']}>
                <div className="info-soal">
                  <p className="card-title">
                    {`${soal['Nama MK']} - ${soal.Tahun}`}
                  </p>
                  <p className="card-subtitle">
                    {`${soal.Jenis}${soal.Ket === '' ? '' : `- ${soal.Ket}`}`}
                  </p>
                </div>
                <a className="view-btn" href={soal.Soal} target="_blank" rel="noreferrer">View</a>
              </div>
            ))
          ) : (
            <div className="center-text">Soal Tidak Ada...</div>
          )}
      </div>
    </div>
  );
}

export default TabelSoal;
