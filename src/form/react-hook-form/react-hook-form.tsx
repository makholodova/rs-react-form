import styles from '../form.module.css';
import BaseButton from '../../ui/base-button/base-button.tsx';
import { useForm } from 'react-hook-form';
import type { User } from '../../types';
import { formSchema } from '../../validation/form-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import getCountries from '../../untils/getCountries.ts';
import { convertFileToBase64 } from '../../untils/convertFileToBase64.ts';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/modal-slice.ts';
import { addUser } from '../../store/react-hook-form-slice.ts';

type FormValues = z.infer<typeof formSchema>;

export default function ReactHookForm() {
  const dispatch = useDispatch();
  const countries = getCountries();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    const file = data.image?.item(0) ?? null;
    const imageBase64Str = file ? await convertFileToBase64(file) : '';

    const newUser: User = {
      id: String(Date.now()),
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      gender: data.gender,
      country: data.country,
      image: imageBase64Str,
      isTCAccepted: data.isTCAccepted,
    };

    dispatch(addUser({ user: newUser }));
    dispatch(closeModal());
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.title}>React Hook Form</h2>
        <div className={styles.content}>
          <div className={styles.field}>
            <label htmlFor="name">Name* :</label>
            <input {...register('name')} id="name" type="text" />
            <div className={styles.error}>{errors.name?.message}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="age">Age* :</label>
            <input
              id="age"
              {...register('age', { valueAsNumber: true })}
              type="number"
              min={0}
              max={150}
            />
            <div className={styles.error}>{errors.age?.message}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email* :</label>
            <input {...register('email')} id="email" type="email" />
            <div className={styles.error}>{errors.email?.message}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password* :</label>
            <input {...register('password')} id="password" type="password" />
            <div className={styles.error}>{errors.password?.message}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword">Password (confirm)* :</label>
            <input
              {...register('confirmPassword')}
              id="confirmPassword"
              type="password"
            />
            <div className={styles.error}>
              {errors.confirmPassword?.message}
            </div>
          </div>

          <div className={styles.gender}>
            <p>Gender* :</p>
            <label className={styles.genderLabel}>
              <input {...register('gender')} value="male" type="radio" />
              <span>Male</span>
            </label>
            <label className={styles.genderLabel}>
              <input {...register('gender')} value="female" type="radio" />
              <span>Female</span>
            </label>
          </div>
          <div className={styles.error}>{errors.gender?.message}</div>

          <div className={styles.field}>
            <label htmlFor="country">Country* :</label>
            <input
              {...register('country')}
              id="country"
              type="text"
              list="country-list"
              autoComplete="on"
              placeholder="Start typing country..."
            />
            <datalist id="country-list">
              {countries.map((country) => (
                <option key={country} value={country} />
              ))}
            </datalist>
            <div className={styles.error}>{errors.country?.message}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="image">Choose a profile picture* :</label>
            <input
              id="image"
              {...register('image')}
              className={styles.fileInput}
              type="file"
              accept="image/png, image/jpeg"
            />
            <div className={styles.error}>{errors.image?.message}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="acceptTC">
              <input {...register('isTCAccepted')} type="checkbox" /> Accept
              Terms and Conditions agreement*
            </label>
            <div className={styles.error}>{errors.isTCAccepted?.message}</div>
          </div>
        </div>
        <BaseButton
          className={styles.buttonSubmit}
          disabled={isSubmitting || !isValid}
          type="submit"
        >
          Submit
        </BaseButton>
      </form>
    </div>
  );
}
