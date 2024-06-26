import { computed, defineComponent } from 'vue'
import { PresenceProvider, type UsePresenceProps, usePresence } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { emits, props } from './popover.props'
import { type UsePopoverProps, usePopover } from './use-popover'
import { PopoverProvider } from './use-popover-context'

export interface PopoverRootProps extends UsePopoverProps, UsePresenceProps {}

export const PopoverRoot = defineComponent<PopoverRootProps>(
  (props, { slots, emit }) => {
    const api = usePopover(props, emit)

    const isOpen = computed(() => api.value.isOpen)

    const presenceProps = computed(() => ({
      present: props.present || isOpen.value,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    const presenceApi = usePresence(presenceProps, emit)

    PopoverProvider(api)
    PresenceProvider(presenceApi)

    return () => slots.default?.()
  },
  {
    name: 'PopoverRoot',
    props: {
      ...props,
      ...presenceProps,
    },
    emits: [...emits, ...presenceEmits],
  },
)
