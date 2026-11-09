import { useState, useEffect } from 'react';

function Latihan() {
  const [hotData, setHotData] = useState([]);
  const [icedData, setIcedData] = useState([]);
  const [category, setCategory] = useState('hot');
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const hotResp = await fetch('https://api.sampleapis.com/coffee/hot');
        setHotData(await hotResp.json());

        const icedResp = await fetch('https://api.sampleapis.com/coffee/iced');
        setIcedData(await icedResp.json());
      } catch (err) {
        console.error(err.message);
      }
    };
    getData();
  }, []);

  const data = category === 'hot' ? hotData : icedData;

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = () => {
    setQuery(search);
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-center text-red-500">
        Daftar Kopi
      </h1>

      {/* tab Hot / Iced */}
      <div className="flex justify-center gap-2 my-4 px-4">
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

      {/* area search — bertumpuk di HP, berdampingan di layar lebar */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 my-6 px-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Cari kopi, lalu klik Search..."
          className="
            border-2 border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 cursor-text
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
            w-full sm:w-auto shrink-0
            bg-red-500 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer
            hover:bg-red-600 hover:shadow-lg hover:-translate-y-0.5
            active:bg-red-700 active:translate-y-0 active:scale-95
            transition-all duration-150
          "
        >
          Search
        </button>
      </div>

      {/* daftar kopi — jumlah kolom mengikuti lebar layar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {filteredData.map(item => (
          <div
            key={item.title}
            onClick={() => setSelected(item)}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150"
          >
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
        <p className="text-center text-stone-500 my-8 px-4">
          Kopi "{query}" tidak ditemukan.
        </p>
      )}

      {/* modal — lebar menyesuaikan layar */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
          >
            {selected.image && (
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-40 sm:h-48 object-cover"
              />
            )}
            <div className="p-5">
              <h2 className="text-xl font-bold text-stone-800 mb-1">
                {selected.title}
              </h2>
              <p className="text-sm text-stone-500 mb-3">Bahan-bahan pembuatan:</p>

              {selected.ingredients && selected.ingredients.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selected.ingredients.map((bahan, i) => (
                    <span
                      key={i}
                      className="bg-red-50 text-red-700 border border-red-200 rounded-full px-3 py-1 text-sm font-medium"
                    >
                      {bahan}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-stone-500 text-sm">Bahan tidak tersedia.</p>
              )}

              <button
                onClick={() => setSelected(null)}
                className="mt-4 w-full bg-stone-800 text-white font-semibold py-2 rounded-lg cursor-pointer hover:bg-stone-700 active:scale-95 transition-all duration-150"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Latihan;