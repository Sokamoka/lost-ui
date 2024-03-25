import { nextTick, ref, shallowRef } from 'vue'
import type { MaybeElementRef } from '@vueuse/core'
import { unrefElement } from '@vueuse/core'
import { get, set } from 'lodash-es'

export interface ErrorObject {
  validity: ValidityState
  message: string
}

interface ErrorsObject {
  [key: string]: ErrorObject
}

export function useValidation(formElement: MaybeElementRef) {
  const errors = shallowRef<ErrorsObject>({})
  const isTouched = ref(false)

  async function validate(): Promise<boolean> {
    isTouched.value = true
    const formValidity = await checkFormValidity()
    return formValidity
  }

  async function checkFormValidity() {
    await nextTick()
    clearErrors()
    const form = unrefElement(formElement) as HTMLFormElement
    const fields = Array.from(form) as HTMLFormElement[]

    const formValidity = form.checkValidity()

    for (const field of fields) {
      const name = field.getAttribute('name')
      if (name && !field.validity.valid) {
        set(errors.value, name, {
          validity: convertValidityStates(field.validity),
          message: field.validationMessage,
        })
      }
    }
    return formValidity
  }

  function clearErrors() {
    errors.value = {}
  }

  function reset() {
    isTouched.value = false
    errors.value = {}
  }

  function hasError(errorPath: string) {
    const errorObject = get(errors.value, errorPath)
    return Boolean(errorObject)
  }

  function getErrorMessage(errorPath: string) {
    const errorObject = get(errors.value, errorPath)
    return errorObject?.message
  }

  function onUpdate() {
    if (!isTouched.value)
      return
    checkFormValidity()
  }

  return { errors, validate, hasError, onUpdate, clearErrors, getErrorMessage, reset }
}

function convertValidityStates(validity: ValidityState) {
  const _validity: Record<string, boolean | string> = {}
  for (const key in validity)
    _validity[key] = validity[key as keyof ValidityState]

  return _validity
}
