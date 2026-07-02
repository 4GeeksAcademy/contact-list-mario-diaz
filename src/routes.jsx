import React from "react"
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"

import { Layout } from "./pages/Layout.jsx"
import { Home } from "./pages/Home.jsx"
import { ContactForm } from "./pages/ContactForm.jsx"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route element={<Home />} path="/" />
      <Route element={<ContactForm />} path="/add" />
      <Route element={<ContactForm />} path="/edit/:id" />
      <Route element={<h1>Not found!</h1>} path="*" />
    </Route >
  )
)
