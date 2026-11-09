import { useState, useEffect } from 'react';

function Latihan() {
  const [data, setData] = useState([]);

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

 return (
  <div>
    <h1 className="text-3xl font-bold text-center text-red-500">
      Daftar Kopi
    </h1>

    {/* pembungkus grid — inilah perintahnya */}
    <div className="grid grid-cols-4 gap-4 p-4">
      {data.map(item => (
        <div key={item.title} className="bg-white rounded-xl shadow-md overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-90 object-cover"
          />
          <p className="font-semibold text-brown-800">{item.title}</p>
        </div>
      ))}
    </div>
  </div>
)
}

export default Latihan;