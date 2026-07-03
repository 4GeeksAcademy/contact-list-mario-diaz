export const initialStore = () => {
  return {
    agendaSlug: "agenda_mario_diaz", 
    
    contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      }

    case "SET_CONTACTS":
      return {
        ...store,
        contacts: action.payload
      }

    case "DELETE_CONTACT_LOCAL":
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload)
      };

    default:
      throw Error('Unknown action.')
  }    
}
