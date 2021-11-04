import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [state, setState] = useState({
    forms: [],
    newForm: {
      shoe: 'ex Air Mag',
      name: 'ex Marty McFly',
      email: 'ex B2thefuture@gmail.com',
      number: '',
    }
  });

  function handleChange(event) {
    setState(prevState => ({
      ...prevState,
      newForm: {...prevState.newForm, [event.target.name]: event.target.value}
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await fetch('http://localhost:3001/api/forms', {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json'
      },
      body: JSON.stringify(state.newForm)
    });

    getForms();

    setState((prevState) => ({
      ...prevState,
      newForm: {
      shoe: 'ex. Air Mag',
      name: 'ex. Marty McFly',
      email: 'ex. B2thefuture@gmail.com',
      number: '',
      }
    }));
  }

  async function getForms() {
    const response = await fetch('http://localhost:3001/api/forms');
    const forms = await response.json();

    setState((prevState) => ({
      forms,
      newForm: prevState.newForm
    }));
  }

  useEffect(() => {
    getForms();
  }, []);

  return (
    <section>
      <h2>Big Boys Bots</h2>
      <hr />
      {state.forms.map((s) => (
        <article key={s.shoe}>
          <div className='shoe'>{s.shoe}</div> <div className='name'>{s.name}</div> <div className='email'>{s.email}</div> <div className='number'>{s.number}</div>
        </article>
      ))}
      <hr />
      <form name='input' onSubmit={handleSubmit}>
        <label>
          <span>SHOE</span>
          <input name='shoe' value={state.newForm.shoe} onChange={handleChange} />
        </label>
        <label>
          <span>NAME</span>
          <input name='name' value={state.newForm.name} onChange={handleChange} />
        </label>
        <label>
          <span>EMAIL</span>
          <input name='email' value={state.newForm.email} onChange={handleChange} />
        </label>
        <label>
          <span>PHONE NUMBER</span>
          <input name='number' value={state.newForm.number} onChange={handleChange} />
        </label>
        <button>Add Bot</button>
      </form>
     
    </section>
  );

}

