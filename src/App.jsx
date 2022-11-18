import React, { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import TabelSoal from './components/TabelSoal';
import DataControl from './data/datacontrol';

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [showTabelSoal, setShowTabelSoal] = useState(false);

  useEffect(() => {
    DataControl.initDataSoal()
      .then((e) => { setInitialLoading(e); })
      .then(() => { setShowTabelSoal(true); });
  });

  return (
    <div className="App">
      { initialLoading ? <LoadingScreen /> : ''}
      <header>
        <h1>RADABASE</h1>
      </header>
      <main>
        { showTabelSoal ? <TabelSoal /> : ''}
      </main>
    </div>
  );
}

export default App;
