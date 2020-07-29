import React from 'react';
import { useForm } from 'react-hook-form';
import './PersonalInfoForm.scss';

import moment from 'moment';

import { Input, Button } from '../common';

const PersonalInfoForm = ({ info, addPersonalInfo, userId }) => {
  const { register, handleSubmit, errors } = useForm();
  let date = moment(info && info.bDay && info.bDay)
    .format('YYYY/MM/DD')
    .split('/')
    .join('-');

  if (info && info.bDay) {
    info.bDay = date;
  } else date = '';

  const submit = (data) => {
    if (JSON.stringify(data) === JSON.stringify(info)) {
      return;
    }

    addPersonalInfo(data, localStorage.role === 'admin' && userId);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`personalInfo-form ${
        Object.keys(errors).length > 0 && 'animate-correct'
      }`}
    >
      <div className={`bio ${errors.bio && 'no-correct'}`}>
        <Input
          name="bio"
          type="text"
          label="Your biography"
          defaultValue={(info && info.bio && info.bio) || ''}
          ref={register({
            required: 'ew',
            minLength: { value: 5 },
            maxLength: { value: 45 },
          })}
        />
      </div>
      <article>
        <section className={`${errors.university && 'no-correct'}`}>
          <Input
            type="text"
            name="university"
            label="University"
            defaultValue={(info && info.university && info.university) || ''}
            ref={register({ minLength: { value: 4 } })}
          />
        </section>
        <section className={`${errors.job && 'no-correct'}`}>
          <Input
            name="job"
            type="text"
            label="Current Job"
            defaultValue={(info && info.job && info.job) || ''}
            ref={register({ minLength: { value: 5 } })}
          />
        </section>
        <section className={`${errors.city && 'no-correct'}`}>
          <Input
            name="city"
            type="text"
            label="City"
            defaultValue={(info && info.city && info.city) || ''}
            ref={register({ minLength: { value: 5 } })}
          />
        </section>

        <div>
          <label>BirthDay</label>
          <input
            type="date"
            name="bDay"
            ref={register()}
            defaultValue={date && date}
          />
        </div>

        <div>
          <label>Relationship</label>
          <select
            name="relShip"
            ref={register()}
            defaultValue={(info && info.relShip && info.relShip) || ''}
          >
            <option>Single</option>
            <option>Married</option>
            <option>In Relationship</option>
          </select>
        </div>
      </article>

      <Button type="submit" light animation>
        Edit
      </Button>
    </form>
  );
};

export default PersonalInfoForm;
