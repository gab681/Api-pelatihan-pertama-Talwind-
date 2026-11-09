import {useEffect, useState} from 'react';

function Latihan () {
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
        {data.map(item => (
            <img key= {item.title} src={item.image} alt={item.title} width="200"/>
        ))}        
    </div>
  )
}
export default Latihan;