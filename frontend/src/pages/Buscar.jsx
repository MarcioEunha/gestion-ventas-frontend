import { useState,useEffect } from "react";

import "./pantalla.css"; 

function Buscar(){

    const[buscando,setBuscando]=useState('');
    const[resultado,setResultado]=useState([]);
    const[busco,setBusco]=useState(false);
    const[mensaje1,setMensaje1]=useState(false);

    async function rastrear(a) {
        a.preventDefault();

        if(buscando === ''){
            setMensaje1("ingrese los datos")
            return;
        }
        try{
            const res = await fetch(`http://localhost:3000/articulos?buscar=${buscando}`);
            const data = await res.json();
            setResultado(data);

            if(data.length === 0){
                setMensaje1("Articulo no encontrado")
            }else{
                setMensaje1('');
            }

            setBusco(true);      
            
        }catch(error){
            console.log("error"+error);
        }
        
    }
    
    return(
        <div className="columnas">
            <h2>Buscador </h2>
            <form onSubmit={rastrear}>
        <input 
        value={buscando}
        onChange={(a)=>setBuscando(a.target.value)}
        placeholder="Buscar"/>

        <button type="submit">Buscar</button>

        {mensaje1 && <p>{mensaje1}</p>}
        </form>

           <div>
            {resultado.map((a,index)=>(
                <div className="vista1" key={index}>
                    <div>Nombre: {a.nombre}</div>
                    <div>Precio: {a.precio}</div>
                    <div>Stock: {a.stock}</div>
                </div>
            ))}
            
           </div>
            
        </div>
    )
}
export default Buscar;