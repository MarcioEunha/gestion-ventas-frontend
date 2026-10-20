import { useState } from "react";
import "./pantalla.css";

function Cargar(){

  const[articulos,setArticulos]=useState([]);
  const[nombre,setNombre]=useState('');
  const[precio,setPrecio]=useState('');
  const[stock,setStock]=useState('');
  const[mensaje,setMensaje]=useState('');

  async function agregar(a){
    a.preventDefault();

     if(nombre===''|| precio===''|| stock===''){
        setMensaje("completa todos los campos")
        return;
      }

      try{
        const res = await fetch("http://localhost:3000/articulos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify({
            nombre:nombre,
            precio:Number(precio),
            stock:Number(stock)
          })
        });

        const data = await res.json();  

        if(!res.ok) {
          setMensaje(data.error);
          return;
        }
       setArticulos([...articulos,data]);
       setNombre('');
       setPrecio('');
       setStock('');
       setMensaje('');
      }catch (error) {
        console.log("error"+error);
      }

    }
  
return (

  <div>
    <p className="vista1">Articulos cargados {articulos.length}</p>

    <form onSubmit={agregar}>

        <div className="columnas1">
            <h2>Crear articulos</h2>

      <input value={nombre}
      onChange={(a)=>setNombre(a.target.value)}
      placeholder="ingrese Nombre"/>

      <input value={precio} type="number"
      onChange={(b)=>setPrecio(b.target.value)}
      placeholder="ingrese precio"/>

      <input value={stock} type="number"
      onChange={(c)=>setStock(c.target.value)}
      placeholder="ingrese stock"/>
        
      <button type="submit">Agregar</button>

        </div>
    </form>

    <p className="columnas1">{mensaje}</p>

    <div className="vista1">
      {articulos.map((a)=>(
        <div key={a.id} className="columnas1"> 
          {a.nombre} - {a.precio}
        </div>
      ))}  
    </div>

  </div>
)
}
export default Cargar;