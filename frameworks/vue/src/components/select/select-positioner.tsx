import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useSelectContext } from './use-select-context'

export interface SelectPositionerProps extends HTMLArkProps<'div'> {}

export const SelectPositioner = defineComponent<SelectPositionerProps>(
  (_, { slots, attrs }) => {
    const api = useSelectContext()
    const presenceApi = usePresenceContext()

    return () =>
      presenceApi.value.isUnmounted ? null : (
        <ark.div {...api.value.positionerProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
  },
  {
    name: 'SelectPositioner',
  },
)
