import * as collapsible from '@zag-js/collapsible'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createEffect, createMemo, createSignal, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { type RenderStrategyProps, splitRenderStrategyProps } from '../../utils/render-strategy'

export interface UseCollapsibleProps
  extends Optional<Omit<collapsible.Context, 'open.controlled'>, 'id'>,
    RenderStrategyProps {}

export interface UseCollapsibleReturn
  extends Accessor<
    collapsible.Api<PropTypes> & {
      /**
       * Whether the content is unmounted
       */
      isUnmounted?: boolean
    }
  > {}

export const useCollapsible = (props: UseCollapsibleProps): UseCollapsibleReturn => {
  const getRootNode = useEnvironmentContext()
  const [renderStrategyProps, collapsibleProps] = splitRenderStrategyProps(props)
  const context = mergeProps({ id: createUniqueId(), getRootNode }, collapsibleProps)
  const [state, send] = useMachine(collapsible.machine(context), { context })
  const [wasVisible, setWasVisible] = createSignal(false)

  createEffect(() => {
    const isPresent = api().isVisible
    if (isPresent) setWasVisible(true)
  })

  const api = createMemo(() => collapsible.connect(state, send, normalizeProps))

  return createMemo(() => ({
    ...api(),
    isUnmounted:
      (!api().isVisible && !wasVisible() && renderStrategyProps.lazyMount) ||
      (renderStrategyProps.unmountOnExit && !api().isVisible && wasVisible()),
  }))
}
