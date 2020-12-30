import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createLogEntry } from './API';

const LogEntryForm = ({ location: { latitude, longitude }, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data = { ...data, latitude, longitude };
      const newEntry = await (createLogEntry(data));
      console.log(newEntry);
      onClose();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
      {error ? <h3 style={{ color: 'red' }} >{error}</h3> : null}
      <label htmlFor="title">Title</label>
      <input name="title" required ref={register} />
      <label htmlFor="comments">Comments</label>
      <textarea name="comments" rows={3} ref={register}></textarea>
      <label htmlFor="description">Description</label>
      <textarea name="description" rows={3} ref={register}></textarea>
      <label htmlFor="image">Image</label>
      <input name="image" ref={register} />
      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" required ref={register} />
      <button disabled={loading}>{loading ? 'Loading your new map!📍' : 'Create an Entry'}</button>
    </form>
  );
};

export default LogEntryForm;