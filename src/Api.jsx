import { useState, useEffect } from 'react';

function Latihan() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const getData = async () => {
    try {
      const resp = await fetch('https://api.sampleapis.com/coffee/hot');
      const json = await resp.json();
      setData(json);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

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

      <div className="flex justify-center gap-2 my-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Cari kopi, lalu klik Search..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-red-400"
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