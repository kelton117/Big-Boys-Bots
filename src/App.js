import { useState, useEffect } from 'react';

import './styles.scss';

export default function App() {
  const [state, setState] = useState({
    forms: [],
    newForm: {
      shoe: '',
      name: '',
      email: '',
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
      shoe: '',
      name: '',
      email: '',
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
      <h2 className='title'>Big Boys Bots</h2>
      <hr />
      {state.forms.map((s) => (
        <article key={s.shoe}>
          <div className='shoe'>{s.shoe}</div> <div className='name'>{s.name}</div> <div className='email'>{s.email}</div> <div className='number'>{s.number}</div>
        </article>
      ))}
      <hr />
      <form name='inputForm' onSubmit={handleSubmit}>
        <label>
          <span>SHOE</span>
          <input name='shoe' placeholder='Air Mags..' value={state.newForm.shoe} onChange={handleChange} />
        </label><br/>
        <label>
          <span>NAME</span>
          <input name='name' placeholder='Marty McFly..' value={state.newForm.name} onChange={handleChange} />
        </label><br/>
        <label>
          <span>EMAIL</span>
          <input name='email' placeholder='B2theefuture@gmail.com..' value={state.newForm.email} onChange={handleChange} />
        </label><br/>
        <label>
          <span>PHONE NUMBER</span>
          <input name='number' placeholder='512-222-8989..' value={state.newForm.number} onChange={handleChange} />
        </label><br/>
        <button>Add Bot</button>
      </form>
     
    </section>
  );

}

