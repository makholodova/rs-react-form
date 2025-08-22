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
import InputField from '../../ui/input-field/input-field.tsx';

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
          <InputField
            id="name"
            type="text"
            {...register('name')}
            labelText="Name* :"
            errorMessage={errors.name?.message}
          />

          <InputField
            id="age"
            type="number"
            {...register('age')}
            labelText="Age* :"
            errorMessage={errors.age?.message}
          />

          <InputField
            id="email"
            type="email"
            labelText="Email* :"
            errorMessage={errors.email?.message}
            {...register('email')}
          />

          <InputField
            id="password"
            type="password"
            labelText="Password* :"
            errorMessage={errors.password?.message}
            {...register('password')}
          />

          <InputField
            id="confirmPassword"
            type="password"
            labelText="Password (confirm)* :"
            errorMessage={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

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

          <InputField
            id="country"
            labelText="Country* :"
            list="country-list"
            autoComplete="on"
            placeholder="Start typing country..."
            errorMessage={errors.country?.message}
            {...register('country')}
          />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>

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
