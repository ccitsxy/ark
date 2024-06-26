import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverDescriptionProps extends HTMLArkProps<'div'> {}

export const PopoverDescription = defineComponent<PopoverDescriptionProps>(
  (_, { slots, attrs }) => {
    const api = usePopoverContext()

    return () => (
      <ark.div {...api.value.descriptionProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'PopoverDescription',
  },
)
