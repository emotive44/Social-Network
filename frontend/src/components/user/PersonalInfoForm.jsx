import React from 'react';
import { useForm } from 'react-hook-form';
import './PersonalInfoForm.scss';

import  moment  from 'moment'

import { addPersonalInfo } from '../../store/actions/user-action';
import { connect } from 'react-redux';
 
import Button from '../common/Button';
import Input from '../common/Input';


const PersonalInfoForm = ({ info, addPersonalInfo }) => {
  const { register, handleSubmit, errors } = useForm();
  let date = moment(info && info.bDay && info.bDay).format('YYYY/MM/DD').split('/').join('-');

  if(info && info.bDay) {
    info.bDay = date;
  } else date = '';
  
  const submit = (data) => {
    if(JSON.stringify(data) === JSON.stringify(info)) {
      return;
    }

    addPersonalInfo(data);
  }

  return (
    <form 
      onSubmit={handleSubmit(submit)}
      className={`personalInfo-form ${Object.keys(errors).length > 0 && 'animate-correct'}`}
    >
      <div className={`bio ${errors.bio && 'no-correct'}`}>
        <Input
          name='bio'
          type='text'
          label='Your biography'
          defaultValue={(info && info.bio && info.bio) || ''}
          ref={register({
            minLength: { value: 5 },
            maxLength: { value: 45 }
          })}
        />
      </div>
      <article>
        <section className={`${errors.university && 'no-correct'}`}>
          <Input 
            type='text'
            name='university'
            label='University'
            defaultValue={(info && info.university && info.university) || ''}
            ref={register({minLength: { value: 4 }})}
          />
        </section>
        <section className={`${errors.job && 'no-correct'}`}>
          <Input 
            name='job'
            type='text'
            label='Current Job'
            defaultValue={(info && info.job && info.job) || ''}
            ref={register({minLength: { value: 5 }})}
          />
        </section>
        <section className={`${errors.city && 'no-correct'}`}>
          <Input 
            name='city'
            type='text'
            label='City'
            defaultValue={(info && info.city && info.city) || ''}
            ref={register({minLength: { value: 5 }})}
          />
        </section>

        <div>
          <label>BirthDay</label>
          <input 
            type='date' 
            name='bDay'
            ref={register()}
            defaultValue={date && date}
          />
        </div>

        <div>
          <label>Relationship</label>
          <select 
            name='relShip' 
            ref={register()}
            defaultValue={(info && info.relShip && info.relShip) || ''}
          >
            <option>Single</option>
            <option>Married</option>
            <option>In Relationship</option>
          </select>
        </div>
      </article>
  
      <Button type='submit' light animation>Edit</Button>
    </form>
  );
}

export default connect(null, { addPersonalInfo })(PersonalInfoForm);
