import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ProbabilityGraph from '@/components/ProbabilityGraph.vue'

describe('ProbabilityGraph', () => {
  it('renders properly', () => {
    const wrapper = mount(ProbabilityGraph, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
