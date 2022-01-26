import * as Yup from 'yup';

const movieValidate = Yup.object().shape({
  name: Yup.string().min(3).required('Name is required'),
  description: Yup.string().required('description is required'),
  image: Yup.string().required('image is required'),
  country: Yup.string().required('country is required'),
  categories: Yup.array().required('categories is required'),
  releaseDate: Yup.date().required('releaseDate is required'),
  duration: Yup.number().required('duration is required'),
  IMDbScore: Yup.number().required('IMDbScore is required'),
  status: Yup.string().required('status is required'),
  isHot: Yup.boolean(),
  isFresh: Yup.boolean(),
  isComingSoon: Yup.boolean(),
  isActive: Yup.boolean(),
  isSeries: Yup.boolean()
});
const LoginValidate = Yup.object().shape({
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
});
export { movieValidate, LoginValidate };
