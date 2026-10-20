import { useState } from "react";
import "./pantalla.css";

function Ventas (){

    const [busqueda,setBusqueda]=useState('');
    const [resultado,setResultado]=useState([]);
    const [mensaje, setMensaje]=useState('');
    const [cantidad,setCantidad]=useState('')
    const [carrito,setCarrito]=useState([]);

    async function buscar(a) {
        a.preventDefault()

        if(busqueda===''){
            setMensaje("ingrese datos")
            return;
        }

        try{
            const res = await fetch(`http://localhost:3000/articulos?buscar=${busqueda}`);
            const data = await res.json();
            setResultado(data);

            if(data.length === 0){
                setMensaje("Articulo no encontrado");
            }else{
                setMensaje('');
            }
            setBusqueda('');
        }catch(error){
            console.log("error"+error);
        }        
    }

    function agregarAlcarrito(articulo){
        if( cantidad === '' || Number(cantidad) <= 0){
            setMensaje("ingrese una cantidad valida");
            return;
        }
        const nuevo = {
            ...articulo,
            cantidad:Number(cantidad)
        };
        setCarrito([...carrito,nuevo]);
        setCantidad('');
        setMensaje('');
    }
    async function confirmarventa() {
        if(carrito.length === 0){
            setMensaje("el carrito esta vacio")
            return;
        }
        try{
            const res = await fetch("http://localhost:3000/ventas",{
                method: "POST",
                headers:{"Content-Type": "application/json" },
                body: JSON.stringify({items:carrito})
            });
            const data = await res.json();

            if(!res.ok){
                setMensaje(data.error);
                return;
            }
            setCarrito([]);
            setMensaje("Venta confirmada");
        } catch (error){
            console.log("error"+error);
        }


    }

    function borrardelcarrito(index) {
        setCarrito(carrito.filter((_,i) => i !==index));
    }


return(
    <div className="columnas2">
        <h2>Panel de Ventas</h2>

         <form onSubmit={buscar}>

            <input value={busqueda}
            onChange={(a)=>setBusqueda(a.target.value)}
            placeholder="Ingrese Articulo"
            />
            <button type="submit">Buscar</button>
            </form>   
            

            <div>
            {resultado.map((a)=>
            <div className="valor" key={(a.id)}>

                <div>{a.nombre} - ${a.precio}</div>

                <input className="inputventas"
                type="number"
                value={cantidad}
                onChange={(c)=>setCantidad(c.target.value)}
                placeholder="Cantidad"
                />

                <button className="botonescentrados"
                onClick={()=>agregarAlcarrito(a)}>Agregar al carrito</button>  

            </div>
            )}
            </div>

                <h2>Carrito</h2>

                <div>
                    {carrito.map((item,index)=>(
                        <div className="valor" 
                        key={index}>
                            Art :{item.nombre} - Cant: {item.cantidad} -Pre: {item.precio * item.cantidad}

                            <button 
                            onClick={()=> borrardelcarrito(index)}> Borrar </button>
                        </div>
                    ))}
                </div>
                    
                <p className="vista1">TOTAL: ${carrito.reduce((acc,item)=> acc + item.precio * item.cantidad, 0)}</p>

                <button onClick={confirmarventa}>Confirmar venta</button>
                
                {mensaje &&<p>{mensaje}</p>}

    </div>
)
}
export default Ventas;