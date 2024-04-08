import { IFeedbackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const PhoneInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Телефон *</span>
    <input
      className={styles.feedback_form__form__input}
      placeholder="+372 999 999 99"
      type="tel"
      {...register('phone', {
        required: 'Sisestage telefon!',
        pattern: {
          value: /^\+?\d{1,12}$/,
          message: 'Lubamatu väärtus',
        },
        minLength: 12,
        maxLength: 12,
      })}
    />
    {errors.phone && (
      <span className={styles.error_alert}>{errors.phone?.message}</span>
    )}
    {errors.phone && errors.phone.type === 'minLength' && (
      <span className={styles.error_alert}>Vähemalt 12 numbrit!</span>
    )}
    {errors.phone && errors.phone.type === 'maxLength' && (
      <span className={styles.error_alert}>Mitte rohkem kui 12 numbrit!</span>
    )}
  </label>
)

export default PhoneInput
