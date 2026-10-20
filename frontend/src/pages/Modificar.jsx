import { useState } from "react";
import "./pantalla.css";

function modificar (){

    const [artid,setArtid]=useState([]);
    const [nunombre,setNunombre]=useState('');
    const [nprecio,setNprecio]=useState('');
    const [nstock,setNstock]=useState('');
    const [nmensaje,setNmensaje]=useState('');

    async function buscarid(){
        
            if(nunombre === ""){
            setNmensaje("ingrese los datos del arituclo")
            return    
            }

            try{
            const req = await fetch(`http://localhost:3000/articulos?buscar=${nunombre}`);
            const dato = await req.json()
            setArtid(dato);
            if(dato.length===0){
                setNmensaje("articulo no encontrado")
            }else{
                setNmensaje('');
            }
            
        }catch(error){
            console.log("error"+error);
        }
    }
    async function editar() {
        
        if (artid.length === 0) {
        setNmensaje("Primero buscá un artículo");
        return;
        }
        try{

            const id = artid[0].id;

             const req = await fetch(`http://localhost:3000/articulos/${id}`,{
                method:"PUT",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({
                    nombre:nunombre === "" ? artid[0].nombre : nunombre,
                    precio:nprecio === "" ? artid[0].precio : Number(nprecio),
                    stock:nstock === "" ? artid[0].stock : Number(nstock)
                })
             })
             const data = await req.json()
             setNmensaje(data.mensaje);

        }catch(error){
            console.log("error"+error)
        }
    }

return(
    <div className="columnas">
        <h2> Buscar articulo </h2>

        <input value={nunombre}
        onChange={(a)=>setNunombre(a.target.value)}
        placeholder="Ingrese nombre"/>

        <button onClick={buscarid}>Buscar</button>
        
    <div>
        {artid.map((a)=>(
            <div className="vista1" key={a.id}>
                {a.nombre} - ${a.precio} - stock: {a.stock}
            </div>
        ))}
    </div>

        <input value={nprecio} type="number"
        onChange={(a)=>setNprecio(a.target.value)}
        placeholder="ingrese precio"/>

        <input value={nstock} type="number"
        onChange={(b)=>setNstock(b.target.value)}
        placeholder="ingrese stock"/>

        <button onClick={editar}>modificar</button>
        <div className="vista1">
        {nmensaje && <p>{nmensaje}</p>}
        </div>

    </div>
)

}
export default modificar;