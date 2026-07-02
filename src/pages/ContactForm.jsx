import React, { useState } from "react" // 1. Añadimos useState a la importación
import { Link } from "react-router-dom"

export const ContactForm = () => {
    // 2. Creamos un estado local (un objeto) para guardar los datos del contacto
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    })

    // 3. Esta función se activa CADA VEZ que el usuario presiona una tecla en cualquier input
    const handleChange = (e) => {
        setContact({
            ...contact, // Copia los datos que ya teníamos para no borrarlos
            [e.target.name]: e.target.value // Actualiza solo el campo que cambió
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // 2. Detiene el comportamiento nativo de recarga de HTML
        
        // 3. Por ahora, pintamos en la consola el objeto que guardamos en memoria
        console.log("¡Formulario enviado con éxito! Datos capturados:", contact)
        
        // Aquí es donde en el futuro llamaremos a la API para hacer el POST
    }

    return (
        <div className="container my-5">
            <h2 className="text-center fw-bold mb-4">Add a new contact</h2>
            
            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
                
                {/* Campo 1: Nombre Completo */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" // ◄ OBLIGATORIO: Debe coincidir con la propiedad del estado
                        value={contact.name} // ◄ El input muestra lo que dice el estado
                        onChange={handleChange} // ◄ Llama a la función al escribir
                        placeholder="Full Name" 
                        required 
                    />
                </div>

                {/* Campo 2: Correo Electrónico */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name="email" // ◄ Coincide con la propiedad
                        value={contact.email} 
                        onChange={handleChange} 
                        placeholder="Enter email" 
                        required 
                    />
                </div>

                {/* Campo 3: Teléfono */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Phone</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="phone" // ◄ Coincide con la propiedad
                        value={contact.phone} 
                        onChange={handleChange} 
                        placeholder="Enter phone" 
                        required 
                    />
                </div>

                {/* Campo 4: Dirección */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Address</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="address" // ◄ Coincide con la propiedad
                        value={contact.address} 
                        onChange={handleChange} 
                        placeholder="Enter address" 
                        required 
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3 btn-lg">
                    Save
                </button>
                
                <Link to="/" className="d-block text-center text-secondary">
                    or get back to contacts
                </Link>

            </form>
        </div>
    )
}