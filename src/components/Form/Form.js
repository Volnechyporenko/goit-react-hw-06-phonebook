import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import s from './Form.module.css';

const Form = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleOnChange = evt => {
    const { name, value } = evt.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({
      id: uuid(),
      name,
      number,
    });
    setName('');
    setNumber('');
  };

  return (
    <form className={s.container} onSubmit={handleSubmit}>
      <label className={s.label}>
        Name
        <input
          className={s.input}
          required
          type="text"
          name="name"
          value={name}
          onChange={handleOnChange}
        ></input>
      </label>
      <label className={s.label}>
        Number
        <input
          className={s.input}
          required
          type="tel"
          name="number"
          value={number}
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
          placeholder="000-00-00"
          onChange={handleOnChange}
        ></input>
      </label>
      <button className={s.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
