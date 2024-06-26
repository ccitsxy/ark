import * as collapsible from '@zag-js/collapsible'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref, watch } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useId } from '../../utils'
import type { UseRenderStrategyProps } from '../../utils/use-render-strategy'

export interface UseCollapsibleProps
  extends UseRenderStrategyProps,
    Optional<Omit<collapsible.Context, 'open.controlled'>, 'id'> {}

interface Collapsible extends collapsible.Api<PropTypes> {
  /**
   * Whether the content is unmounted
   */
  isUnmounted?: boolean
}

export interface UseCollapsibleReturn extends ComputedRef<Collapsible> {}

export const useCollapsible = (
  props: UseCollapsibleProps,
  emits: CallableFunction,
): UseCollapsibleReturn => {
  const context = ref(props)
  const wasVisible = ref(false)
  const environment = useEnvironmentContext()

  const [state, send] = useMachine(
    collapsible.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode: environment,
      onExitComplete: () => {
        emits('exitComplete')
      },
    }),
    { context },
  )
  const api = computed(() => collapsible.connect(state.value, send, normalizeProps))

  watch(
    () => api.value.isVisible,
    () => {
      if (api.value.isVisible) {
        wasVisible.value = true
      }
    },
  )

  return computed(() => ({
    ...api.value,
    isUnmounted:
      (!api.value.isVisible && !wasVisible.value && context.value.lazyMount) ||
      (context.value?.unmountOnExit && !api.value.isVisible && wasVisible.value),
  }))
}
