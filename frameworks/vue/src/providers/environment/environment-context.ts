import type { CommonProperties } from '@zag-js/types'
import { createContext } from '../../utils'

export type EnvironmentContext = CommonProperties['getRootNode']

export const [EnvironmentProvider, useEnvironmentContext] =
  createContext<EnvironmentContext>('EnvironmentContext')
