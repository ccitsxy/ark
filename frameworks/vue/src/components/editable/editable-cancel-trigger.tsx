import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useEditableContext } from './use-editable-context'

export interface EditableCancelTriggerProps extends HTMLArkProps<'button'> {}

export const EditableCancelTrigger = defineComponent<EditableCancelTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useEditableContext()

    return () => (
      <ark.button {...api.value.cancelTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'EditableCancelTrigger',
  },
)
