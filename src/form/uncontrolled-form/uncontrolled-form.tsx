import styles from '../form.module.css';

import BaseButton from '../../ui/base-button/base-button.tsx';
import type { RootState } from '../../store/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modal-slice.ts';
import { useRef } from 'react';
import { addUser } from '../../store/uncontrolled-form-slice.ts';
import type { User } from '../../types';
import { convertFileToBase64 } from '../../untils/convertFileToBase64.ts';

export default function UncontrolledForm() {
  const dispatch = useDispatch();

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

  const countries = useSelector<RootState, string[]>(
    (state) => state.countries.countries
  );

  async function submitForm(event: React.FormEvent) {
    event.preventDefault();
    const name = nameInput.current?.value ?? '';
    const age = Number(ageInput.current?.value);
    const email = emailInput.current?.value ?? '';
    const password = passwordInput.current?.value ?? '';
    const confirmPassword = confirmPasswordInput.current?.value ?? '';
    const isMale = genderInput.male.current?.checked;
    const isFemale = genderInput.female.current?.checked;
    const gender = isMale ? 'male' : isFemale ? 'female' : '';
    const country = countryInput.current?.value ?? '';

    const image = imageInput.current?.files?.[0];
    const imageBase64Str = await convertFileToBase64(image);
    const isTCAccepted = acceptInput.current?.checked ?? false;

    const newUser: User = {
      name,
      age,
      email,
      password,
      confirmPassword,
      gender,
      country,
      image: imageBase64Str,
      isTCAccepted,
    };

    console.log('imageInput', imageInput);
    console.log('newUser', newUser);

    dispatch(addUser({ user: newUser }));
    dispatch(closeModal());
  }

  return (
    <div>
      <form onSubmit={submitForm} className={styles.form}>
        <h2 className={styles.title}>Uncontrolled Form</h2>
        <div className={styles.content}>
          <div className={styles.field}>
            <label htmlFor="name">Name* :</label>
            <input ref={nameInput} id="name" name="name" type="text" />
            {/* {errors.name && <div className="error">{errors.name}</div>}*/}
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
            {/*{errors.age && <div className="error">{errors.age}</div>}*/}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email* :</label>
            <input ref={emailInput} id="email" name="email" type="email" />
            {/*{errors.email && <div className="error">{errors.email}</div>}*/}
          </div>

          <div className={styles.field}>
            <label htmlFor="">Password* :</label>
            <input
              ref={passwordInput}
              id="password"
              name="password"
              type="password"
            />
            {/* {errors.password && <div className="error">{errors.password}</div>}*/}
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword">Password (confirm)* :</label>
            <input
              ref={confirmPasswordInput}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
            />
            {/*{errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}*/}
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
          {/*{errors.gender && <div className="error">{errors.gender}</div>}*/}

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
            {/*{errors.country && <div className="error">{errors.country}</div>}*/}
          </div>

          <div className={styles.field}>
            <label htmlFor="image">Choose a profile picture* :</label>
            <input
              ref={imageInput}
              className={styles.fileInput}
              type="file"
              accept="image/png, image/jpeg"
            />

            {/*{errors.image && <div className="error">{errors.image}</div>}*/}
          </div>

          <div className={styles.field}>
            <label htmlFor="acceptTC">
              <input ref={acceptInput} type="checkbox" name="acceptTC" /> Accept
              Terms and Conditions agreement*
            </label>
            {/*{errors.acceptTC && <div className="error">{errors.acceptTC}</div>}*/}
          </div>
        </div>
        <BaseButton className={styles.buttonSubmit} type="submit">
          Submit
        </BaseButton>
      </form>
    </div>
  );
}
