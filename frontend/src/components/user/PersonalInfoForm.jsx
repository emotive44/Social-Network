import React from 'react';
import { useForm } from 'react-hook-form';
import './PersonalInfoForm.scss';

import Button from '../common/Button';
import Input from '../common/Input';


const PersonalInfoForm = ({ info }) => {
  const { register, handleSubmit, errors } = useForm();

  const submit = (data) => {
    console.log(data);
  }

  return (
    <form 
      onSubmit={handleSubmit(submit)}
      className={`personalInfo-form ${Object.keys(errors).length > 0 && 'animate-correct'}`}
    >
      <article>
        <section className={`${errors.university && 'no-correct'}`}>
          <Input 
            type='text'
            name='university'
            label='University'
            defaultValue={info.university || ''}
            ref={register({minLength: { value: 4 }})}
          />
        </section>
        <section className={`${errors.job && 'no-correct'}`}>
          <Input 
            name='job'
            type='text'
            label='Current Job'
            defaultValue={info.job || ''}
            ref={register({minLength: { value: 5 }})}
          />
        </section>
        <section className={`${errors.city && 'no-correct'}`}>
          <Input 
            name='city'
            type='text'
            label='City'
            defaultValue={info.city || ''}
            ref={register({minLength: { value: 6 }})}
          />
        </section>

        <div>
          <label>BirthDay</label>
          <input 
            type='date' 
            name='bDay'
            ref={register()}
            defaultValue={info.bDay.split('T')[0]}
          />
        </div>

        <div>
          <label>Relationship</label>
          <select name='relShip' ref={register()}>
            <option>Single</option>
            <option>Married</option>
            <option>In Relationship</option>
          </select>
        </div>
      </article>

      <div className={`bio ${errors.bio && 'no-correct'}`}>
        <Input
          name='bio'
          type='text'
          label='Your biography'
          ref={register({
            minLength: { value: 5 },
            maxLength: { value: 45 }
          })}
        />
      </div>
  
      <Button type='submit' light animation>Edit</Button>
    </form>
  );
}

export default PersonalInfoForm;
