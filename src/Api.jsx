import { useState, useEffect } from 'react';

function Latihan() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

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

  // filter: ambil hanya kopi yang judulnya mengandung teks pencarian
  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-red-500">
        Daftar Kopi
      </h1>

      {/* area search — di bawah judul */}
      <div className="flex justify-center gap-2 my-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari kopi..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          type="button"
          onClick={() => setSearch('')}
          className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>

      {/* pembungkus grid */}
      <div className="grid grid-cols-4 gap-4 p-4">
        {filteredData.map(item => (
          <div key={item.title} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <p className="font-semibold text-stone-800">{item.title}</p>
          </div>
        ))}
      </div>

      {/* pesan kalau tidak ada hasil */}
      {filteredData.length === 0 && (
        <p className="text-center text-stone-500 my-8">
          Kopi tidak ditemukan.
        </p>
      )}
    </div>
  )
}

export default Latihan;