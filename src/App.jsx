import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    title: '',
    url:'',
  });

  const saveItem = () => {
    if (form.title == '' || form.url == '') {
      alert("Tüm alanları Doldurunuz");
      return;}
    
    data.push({
      ...form
    });
    localStorage.setItem('data',JSON.stringify(data)); 
    setForm({
      title:'',
      url:''
  })

    /*setData([
      ...data,
      {
        title: form.title,
        url: form.url
      },
    ]);
    setForm({
      title:'',
      url: ''
    })*/
  };

  useEffect(() => {
    const localData = localStorage.getItem('data') ?? [];
    setData(Array.isArray(localData) ? [] : JSON.parse(localData));
  },[]);


  const removeItem = (item,index) => {
      //const xData = data.findIndex((xItem) => xItem.url == item.url);
      data.splice(index,1);
      localStorage.setItem('data', JSON.stringify(data));
      setData([...data]);
  };

  return (
    <div className="App">
      <h1>Tüm Linklerin Tek Sayfada!!!</h1>
      <div className="inputs">
        <input
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          value={form.title}
          className="input"
          placeholder="Bağlantı Başlığı"
        />
        <input
          onChange={(event) => setForm({ ...form, url: event.target.value })}
          value={form.url}
          className="input"
          placeholder="Bağlantı Adresi"
        />
        <button onClick={saveItem} className="button">
          Ekle
        </button>
      </div>
      <div>
        {data.map((item,index) => (
          <div className="content-item">
            <a target="_blank" href={item.url}>
              {item.title}
            </a>
            <button className="remove-item" onClick={() => removeItem(item,index)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
