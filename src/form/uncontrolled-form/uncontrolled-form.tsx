import styles from '../form.module.css';

import BaseButton from '../../ui/base-button/base-button.tsx';
import type { RootState } from '../../store/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modal-slice.ts';
import { useRef, useState } from 'react';
import { addUser } from '../../store/uncontrolled-form-slice.ts';
import type { User } from '../../types';
import { convertFileToBase64 } from '../../untils/convertFileToBase64.ts';
import { formSchema, type FormValues } from '../../validation/form-schema.ts';

export default function UncontrolledForm() {
  const dispatch = useDispatch();
  const countries = useSelector<RootState, string[]>(
    (state) => state.countries.countries
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});
  const [submiting, setSubmitting] = useState(false);

  const nameInput = useRef<HTMLInputElement | null>(null);
  const ageInput = useRef<HTMLInputElement | null>(null);
  const emailInput = useRef<HTMLInputElement | null>(null);
  const passwordInput = useRef<HTMLInputElement | null>(null);
  const confirmPasswordInput = useRef<HTMLInputElement | null>(null);
  const genderInput = {
    male: useRef<HTMLInputElement | null>(null),
    female: useRef<HTMLInputElement | null>(null),
  };
  const countryInput = useRef<HTMLInputElement | null>(null);
  const imageInput = useRef<HTMLInputElement | null>(null);
  const acceptInput = useRef<HTMLInputElement | null>(null);

  async function submitForm(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setErrors({});

    const raw: FormValues = {
      name: nameInput.current?.value ?? '',
      age: Number(ageInput.current?.value),
      email: emailInput.current?.value ?? '',
      password: passwordInput.current?.value ?? '',
      confirmPassword: confirmPasswordInput.current?.value ?? '',
      gender: genderInput.male.current?.checked
        ? 'male'
        : genderInput.female.current?.checked
          ? 'female'
          : '',
      country: countryInput.current?.value ?? '',
      image: (imageInput.current?.files ??
        new DataTransfer().files) as FileList,
      isTCAccepted: !!acceptInput.current?.checked,
    };

    const result = formSchema.safeParse(raw);

    if (!result.success) {
      const map: Partial<Record<keyof FormValues, string>> = {};
      for (const issue of result.error.issues) {
        const key = (issue.path[0] ?? 'form') as keyof FormValues;
        if (!map[key]) map[key] = issue.message;
      }
      setErrors(map);
      setSubmitting(false);
      return;
    }

    const file = raw.image?.[0];
    if (!file) {
      setErrors((prev) => ({ ...prev, image: 'Please upload an image' }));
      setSubmitting(false);
      return;
    }
    const imageBase64Str = await convertFileToBase64(file);

    const newUser: User = {
      name: result.data.name,
      age: Number(result.data.age),
      email: result.data.email,
      password: result.data.password,
      confirmPassword: result.data.confirmPassword,
      gender: result.data.gender,
      country: result.data.country,
      image: imageBase64Str,
      isTCAccepted: result.data.isTCAccepted,
    };

    dispatch(addUser({ user: newUser }));
    dispatch(closeModal());
    setSubmitting(false);
  }

  return (
    <div>
      <form onSubmit={submitForm} className={styles.form}>
        <h2 className={styles.title}>Uncontrolled Form</h2>
        <div className={styles.content}>
          <div className={styles.field}>
            <label htmlFor="name">Name* :</label>
            <input ref={nameInput} id="name" name="name" type="text" />
            <div className={styles.error}>{errors.name}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="age">Age* :</label>
            <input
              ref={ageInput}
              id="age"
              name="age"
              type="number"
              min={0}
              max={150}
            />
            <div className={styles.error}>{errors.age}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email* :</label>
            <input ref={emailInput} id="email" name="email" type="email" />
            <div className={styles.error}>{errors.email}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password* :</label>
            <input
              ref={passwordInput}
              id="password"
              name="password"
              type="password"
            />
            <div className={styles.error}>{errors.password}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword">Password (confirm)* :</label>
            <input
              ref={confirmPasswordInput}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
            />
            <div className={styles.error}>{errors.confirmPassword}</div>
          </div>

          <div className={styles.gender}>
            <p>Gender* :</p>
            <label className={styles.genderLabel}>
              <input
                ref={genderInput.male}
                name="gender"
                value="male"
                type="radio"
              />
              <span>Male</span>
            </label>
            <label className={styles.genderLabel}>
              <input
                ref={genderInput.female}
                name="gender"
                value="female"
                type="radio"
              />
              <span>Female</span>
            </label>
          </div>
          <div className={styles.error}>{errors.gender}</div>

          <div className={styles.field}>
            <label htmlFor="country">Country* :</label>
            <input
              ref={countryInput}
              id="country"
              name="country"
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
            <div className={styles.error}>{errors.country}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="image">Choose a profile picture* :</label>
            <input
              id="image"
              ref={imageInput}
              className={styles.fileInput}
              type="file"
              accept="image/png, image/jpeg"
            />
            <div className={styles.error}>{errors.image}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="acceptTC">
              <input ref={acceptInput} type="checkbox" name="acceptTC" /> Accept
              Terms and Conditions agreement*
            </label>
            <div className={styles.error}>{errors.isTCAccepted}</div>
          </div>
        </div>
        <BaseButton
          className={styles.buttonSubmit}
          disabled={submiting}
          type="submit"
        >
          Submit
        </BaseButton>
      </form>
    </div>
  );
}
