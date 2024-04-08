import { FieldErrorsImpl, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import autosize from 'autosize'
import {
  emailValidationRules,
  nameValidationRules,
  phoneValidationRules,
} from '@/utils/common'
import NameErrorMessage from '@/components/elements/NameErrorMessage/NameErrorMessage'
import styles from '@/styles/orderDetailsForm/index.module.scss'
import { IInputs } from '@/types/auth'
import { useStore } from 'effector-react'
import { $orderDetails, setOrderDetails } from '@/context/order'

const OrderDetailsForm = () => {
  const [messageLength, setMessageLength] = useState(0)
  const orderDetails = useStore($orderDetails)
  const {
    register,
    formState: { errors },
    trigger,
  } = useForm()

  const nameRegister = register(
    'name_label',
    nameValidationRules("nedopustimõe znachenija")
  )
  const surnameRegister = register(
    'surname_label',
    nameValidationRules("nedopustimõe znachenija")
  )
  const phoneRegister = register(
    'phone_label',
    phoneValidationRules("nepravelnõj telefon")
  )
  const emailRegister = register(
    'email_label',
    emailValidationRules("nepravilnõj imael")
  )
  const messageRegister = register('message_label', { maxLength: 255 })

  const handleDetailsInputFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    e.target.classList.add(styles.with_value)
  }

  const handleDetailsInputBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if (e.target.value) {
      return
    }

    e.target.classList.remove(styles.with_value)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderDetails({
      ...orderDetails,
      name: e.target.value
    })
    nameRegister.onChange({
      target: {
        name: nameRegister.name,
        value: e.target.value.trim(),
      },
    })
    trigger(nameRegister.name)
  }

  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderDetails({
      ...orderDetails,
      surname: e.target.value
    })
    surnameRegister.onChange({
      target: {
        name: surnameRegister.name,
        value: e.target.value.trim(),
      },
    })
    trigger(surnameRegister.name)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderDetails({
      ...orderDetails,
      phone: e.target.value
    })
    phoneRegister.onChange({
      target: {
        name: phoneRegister.name,
        value: e.target.value.trim(),
      },
    })
    trigger(phoneRegister.name)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderDetails({
      ...orderDetails,
      email: e.target.value
    })
    emailRegister.onChange({
      target: {
        name: emailRegister.name,
        value: e.target.value.trim(),
      },
    })
    trigger(emailRegister.name)
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOrderDetails({
      ...orderDetails,
      message: e.target.value
    })
    messageRegister.onChange({
      target: {
        name: messageRegister.name,
        value: e.target.value.trim(),
      },
    })
    setMessageLength(e.target.value.length)
    trigger(messageRegister.name)
  }

  useEffect(() => {
    const textarea = document.querySelector(
      `.${styles.details__form__textarea}`
    )

    if (textarea) {
      autosize(textarea)
    }
  }, [])

  return (
    <div className={styles.details}>    <form className={styles.details__form}>
      <div className={styles.details__form__inner}>
        <label className={styles.details__form__label}>
          <input
            type='text'
            className={styles.details__form__input}
            name={nameRegister.name}
            ref={nameRegister.ref}
            onFocus={handleDetailsInputFocus}
            onBlur={handleDetailsInputBlur}
            onChange={handleNameChange}
          />
          <span
            className={styles.details__form__floating_label}
          >
            name
          </span>
          <NameErrorMessage
            errors={errors as Partial<FieldErrorsImpl<IInputs>>}
            className={styles.details__form__error}
            fieldName='name_label'
          />
        </label>
        <label className={styles.details__form__label}>
          <input
            type='text'
            className={styles.details__form__input}
            name={surnameRegister.name}
            ref={surnameRegister.ref}
            onFocus={handleDetailsInputFocus}
            onBlur={handleDetailsInputBlur}
            onChange={handleSurnameChange}
          />
          <span
            className={styles.details__form__floating_label}
          >
            lastname
          </span>
          <NameErrorMessage
            errors={errors as Partial<FieldErrorsImpl<IInputs>>}
            className={styles.details__form__error}
            fieldName='surname_label'
          />
        </label>
        <label className={styles.details__form__label}>
          <input
            type='text'
            className={styles.details__form__input}
            name={phoneRegister.name}
            ref={phoneRegister.ref}
            onFocus={handleDetailsInputFocus}
            onBlur={handleDetailsInputBlur}
            onChange={handlePhoneChange}
          />
          <span
            className={styles.details__form__floating_label}
          >
            telefon
          </span>
          {errors.phone_label && (
            <span className={styles.details__form__error}>
              {errors.phone_label?.message as React.ReactNode}
            </span>
          )}
        </label>
        <label className={styles.details__form__label}>
          <input
            type='email'
            className={styles.details__form__input}
            name={emailRegister.name}
            ref={emailRegister.ref}
            onFocus={handleDetailsInputFocus}
            onBlur={handleDetailsInputBlur}
            onChange={handleEmailChange}
          />
          <span
            className={styles.details__form__floating_label}
          >
            Email
          </span>
          {errors.email_label && (
            <span className={styles.details__form__error}>
              {errors.email_label?.message as React.ReactNode}
            </span>
          )}
        </label>
      </div>
      <label className={styles.details__form__label}>
        <textarea
          className={styles.details__form__textarea}
          name={messageRegister.name}
          ref={messageRegister.ref}
          onFocus={handleDetailsInputFocus}
          onBlur={handleDetailsInputBlur}
          onChange={handleMessageChange}
        />
        <span
          className={styles.details__form__floating_label}
        >
          Комментарий к заказу
        </span>
        {errors.message_label && errors.message_label?.type === 'maxLength' && (
          <span className={styles.details__form__error}>
            Не более 255 символов!
          </span>
        )}
        <span
          className={styles.details__form__label__count}
          style={{
            color:
              messageLength > 255 ? '#FF4747' : 'rgba(255, 255, 255, 0.40)',
          }}
        >
          {messageLength}/255
        </span>
      </label>
    </form></div>

  )
}

export default OrderDetailsForm
