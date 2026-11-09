import { useState, useEffect } from 'react';

function Latihan() {
  const [hotData, setHotData] = useState([]);     // menu panas
  const [icedData, setIcedData] = useState([]);   // menu dingin
  const [category, setCategory] = useState('hot'); // tab aktif: 'hot' atau 'iced'
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        // fetch menu panas
        const hotResp = await fetch('https://api.sampleapis.com/coffee/hot');
        setHotData(await hotResp.json());

        // fetch menu dingin
        const icedResp = await fetch('https://api.sampleapis.com/coffee/iced');
        setIcedData(await icedResp.json());
      } catch (err) {
        console.error(err.message);
      }
    };
    getData();
  }, []);

  // pilih sumber data sesuai tab yang aktif
  const data = category === 'hot' ? hotData : icedData;

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = () => {
    setQuery(search);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-red-500">
        Daftar Kopi
      </h1>

      {/* tab pemisah: Hot / Iced */}
      <div className="flex justify-center gap-2 my-4">
        <button
          type="button"
          onClick={() => setCategory('hot')}
          className={`px-5 py-2 rounded-lg font-semibold cursor-pointer transition-all duration-150 ${
            category === 'hot'
              ? 'bg-red-500 text-white shadow-md hover:bg-red-600'
              : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
          }`}
        >
          Hot
        </button>
        <button
          type="button"
          onClick={() => setCategory('iced')}
          className={`px-5 py-2 rounded-lg font-semibold cursor-pointer transition-all duration-150 ${
            category === 'iced'
              ? 'bg-sky-500 text-white shadow-md hover:bg-sky-600'
              : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
          }`}
        >
          Iced
        </button>
      </div>

      {/* area search */}
      <div className="flex justify-center gap-2 my-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Cari kopi, lalu klik Search..."
          className="
            border-2 border-gray-300 rounded-lg px-4 py-2 w-64 cursor-text
            placeholder:text-stone-400
            focus:outline-none
            focus:border-red-500 focus:bg-red-50 focus:ring-4 focus:ring-red-200
            focus:text-red-900 focus:caret-red-500
            not-placeholder-shown:border-red-500 not-placeholder-shown:bg-red-50
            not-placeholder-shown:text-red-900
            transition-all duration-150
          "
        />
        <button
          type="button"
          onClick={handleSearch}
          className="
            bg-red-500 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer
            hover:bg-red-600 hover:shadow-lg hover:-translate-y-0.5
            active:bg-red-700 active:translate-y-0 active:scale-95
            transition-all duration-150
          "
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 p-4">
        {filteredData.map(item => (
          <div key={item.title} className="bg-white rounded-xl shadow-md overflow-hidden">
            {item.image ? (
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 bg-stone-200 flex items-center justify-center text-stone-500">
                Tanpa gambar
              </div>
            )}
            <p className="font-semibold text-stone-800">{item.title}</p>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <p className="text-center text-stone-500 my-8">
          Kopi "{query}" tidak ditemukan.
        </p>
      )}
    </div>
  )
}

export default Latihan;