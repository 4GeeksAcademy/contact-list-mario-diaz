import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"

const baseUrl = "https://playground.4geeks.com/contact/agendas/"

export const ContactEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { store } = useGlobalReducer()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    })

    useEffect(() => {
        const contact = store.contacts.find(c => c.id === Number(id))

        if (contact) {
            setFormData({
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                address: contact.address
            })
        }
    }, [id, store.contacts])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch(`${baseUrl}${store.agendaSlug}/contacts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            .then((response) => {
                if (!response.ok) throw new Error("Error al actualizar contacto")
                return response.json()
            })
            .then(() => {
                navigate("/") 
            })
            .catch((error) => console.error("Error:", error))
    }

    return (
        <div className="container my-5">
            <h2 className="text-center fw-bold mb-4">Edit Contact</h2>

            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3 btn-lg">
                    Save Changes
                </button>

                <button
                    type="button"
                    className="btn btn-secondary w-100"
                    onClick={() => navigate("/")}
                >
                    Cancel
                </button>

            </form>
        </div>
    )
}