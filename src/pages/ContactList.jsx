import React from "react";
import { Link } from "react-router-dom";

export const ContactList = () => {
    // Mantenemos los mismos contactos de prueba
    const fakeContacts = [
        {
            id: 1,
            name: "Mike Ancel",
            phone: "555-4321",
            email: "mike@gmail.com",
            address: "4757 Bel Meadow Ln, Miami"
        },
        {
            id: 2,
            name: "Alex Smith",
            phone: "555-8765",
            email: "alex@gmail.com",
            address: "123 Main St, New York"
        }
    ];

    return (
        <div className="container my-5">
            {/* Cabecera principal */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold">Contact List</h1>
                <Link to="/add" className="btn btn-success btn-lg">
                    Add new contact
                </Link>
            </div>

            {/* Contenedor vertical para las tarjetas anchas */}
            <div className="d-flex flex-column gap-3">
                {fakeContacts.map((contact) => (
                    
                    /* 1. Tarjeta ancha que ocupa el 100% del ancho disponible */
                    <div key={contact.id} className="card w-100 shadow-sm border-0 p-3 bg-white">
                        {/* 2. Usamos una fila interna para dividir la información de los botones */}
                        <div className="row align-items-center">
                            
                            {/* 3. Columna izquierda: Información del contacto */}
                            <div className="col-12 col-md-9">
                                <h5 className="fw-bold text-dark mb-3">{contact.name}</h5>
                                <div className="d-flex flex-column gap-2">
                                    <p className="mb-0 text-muted">
                                        <i className="fas fa-map-marker-alt me-2 text-secondary" style={{ width: "20px" }}></i>
                                        {contact.address}
                                    </p>
                                    <p className="mb-0 text-muted">
                                        <i className="fas fa-phone me-2 text-secondary" style={{ width: "20px" }}></i>
                                        {contact.phone}
                                    </p>
                                    <p className="mb-0 text-muted">
                                        <i className="fas fa-envelope me-2 text-secondary" style={{ width: "20px" }}></i>
                                        {contact.email}
                                    </p>
                                </div>
                            </div>

                            {/* 4. Columna derecha: Botones de Acción */}
                            <div className="col-12 col-md-3 text-md-end mt-3 mt-md-0">
                                <button className="btn btn-outline-primary me-2">
                                    <i className="fas fa-pencil-alt me-1"></i> Edit
                                </button>
                                <button className="btn btn-outline-danger">
                                    <i className="fas fa-trash-alt me-1"></i> Delete
                                </button>
                            </div>

                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};
