import { z } from 'zod';
import getCountries from '../untils/getCountries.ts';
import getPasswordErrors from './getPasswordErrors.ts';

const countries = getCountries();
const maxImageSize = 512_000;
const allowedMimeTypes = ['image/png', 'image/jpeg'];

const fileListSchema = z
  .custom<FileList | undefined>(
    (v) => typeof FileList !== 'undefined' && v instanceof FileList,
    { message: 'Please upload an image' }
  )
  .superRefine((fl, ctx) => {
    // нет FileList или он пустой
    if (!fl || fl.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please upload an image',
      });
      return;
    }

    const file = fl.item(0);
    if (!file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please upload an image',
      });
      return;
    }

    if (!allowedMimeTypes.includes(file.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Image type should be image/png or image/jpeg',
      });
    }

    if (file.size >= maxImageSize) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Image size should be < ${Math.floor(maxImageSize / 1024)}KB`,
      });
    }
  });

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Z].*$/, 'First letter should be in upper case (A-Z)')
      .regex(/([a-zA-Z]+)$/, 'Only english letters are allowed'),
    age: z.coerce
      .number()
      .int('Age should be an integer number')
      .positive('Age should be a positive number')
      .max(150, 'Age should be <= 150'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .superRefine((pass, ctx) => {
        const errors = getPasswordErrors(pass);
        if (errors.length) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Password should include: ${errors.join(', ')}`,
            path: ['password'], // <— именно password
          });
        }
      }),
    confirmPassword: z.string().min(1, 'Password is required'),
    gender: z.string().min(1, 'Choose a gender'),
    country: z
      .string()
      .min(1, 'Choose a country')
      .refine(
        (country) => countries.includes(country),
        'Please choose a country from the list'
      ),
    image: fileListSchema,
    isTCAccepted: z
      .boolean()
      .refine(
        (value) => !!value,
        'Please accept the Terms and Conditions agreement'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type FormValues = z.infer<typeof formSchema>;
