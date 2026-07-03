import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import { useNavigate } from "react-router-dom"

const baseUrl = `https://playground.4geeks.com/contact/agendas/`

export const ContactList = () => {
    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()

    const loadContacts = () => {
        fetch(`${baseUrl}${store.agendaSlug}/contacts`)
            .then((response) => {
                if (response.status === 404) {
                    return fetch(baseUrl + store.agendaSlug, { method: "POST" })
                        .then((createResponse) => {
                            return [];
                        });
                }
                return response.json()
            })
            .then((data) => {
                const contactsArray = data.contacts || (Array.isArray(data) ? data : [])
                dispatch({ type: "SET_CONTACTS", payload: contactsArray })
            })
            .catch((error) => {
                console.error("Error:", error);
                dispatch({ type: "SET_CONTACTS", payload: [] })
            })
    }

    useEffect(() => {
        loadContacts()
    }, [])

    const handleDelete = (id) => {
        fetch(`${baseUrl}${store.agendaSlug}/contacts/${id}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (!response.ok) throw new Error("ERROR")
                loadContacts()
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold">Contact List</h1>
                <Link to="/add" className="btn btn-success btn-lg">
                    Add new contact
                </Link>
            </div>

            <div className="d-flex flex-column gap-3">
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((contact) => (
                        <div key={contact.id} className="card w-100 shadow-sm border-0 p-3 bg-white">
                            <div className="row align-items-center">
                                <div className="col-12 col-md-9">
                                    <h5 className="fw-bold text-dark mb-3">{contact.name}</h5>
                                    <div className="d-flex flex-column gap-2">
                                        <p className="mb-0 text-muted">{contact.address}</p>
                                        <p className="mb-0 text-muted">{contact.phone}</p>
                                        <p className="mb-0 text-muted">{contact.email}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-md-3 text-md-end mt-3 mt-md-0">
                                    <button className="btn btn-outline-primary me-2"
                                        onClick={() => navigate(`/edit/${contact.id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button className="btn btn-outline-danger"
                                        onClick={() => handleDelete(contact.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-secondary text-center p-5 text-muted border-0 shadow-sm">
                        No contacts available. Click "Add new contact" to create your first one!
                    </div>
                )}
            </div>
        </div>
    )
}