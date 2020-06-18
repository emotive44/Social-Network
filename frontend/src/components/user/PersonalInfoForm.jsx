import React from 'react';
import './PersonalInfoForm.scss';

import Button from '../common/Button';
import Input from '../common/Input';


const PersonalInfoForm = () => {
  return (
    <form className='personalInfo-form'>
      <article>
        <Input 
          type='text'
          name='university'
          label='University'
        />
        <Input 
          name='job'
          type='text'
          label='Current Job'
        />
        <Input 
          name='city'
          type='text'
          label='City'
        />

        <div>
          <label>BirthDay</label>
          <input type='date' name='bDay'/>
        </div>

        <div>
          <label>Relationship</label>
          <select name='relShip'>
            <option>Single</option>
            <option>Married</option>
            <option>In Relationship</option>
          </select>
        </div>
      </article>

      <div className='bio'>
        <Input
          name='bio'
          type='text'
          label='Your biography'
        />
      </div>
  
      <Button 
        type='submit'
        light animation
      >
        Edit
      </Button>
    </form>
  );
}

export default PersonalInfoForm;
