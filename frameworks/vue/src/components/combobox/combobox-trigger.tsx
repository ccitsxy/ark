import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxTriggerProps extends HTMLArkProps<'button'> {}

export const ComboboxTrigger = defineComponent<ComboboxTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useComboboxContext()

    return () => (
      <ark.button {...api.value.triggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'ComboboxTrigger',
  },
)
