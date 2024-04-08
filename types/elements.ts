import { FieldErrors } from 'react-hook-form'
import { CustomArrowProps } from 'react-slick'
import { IInputs } from './auth'

export interface IBrandsSliderArrow extends CustomArrowProps {
  modeClass: string
}
export interface INameErrorMessageProps {
  errors: FieldErrors<IInputs & { [index: string]: string }>
  fieldName: string
  className?: string
}