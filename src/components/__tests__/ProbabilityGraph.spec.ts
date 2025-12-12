import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ProbabilityGraph from '@/components/ProbabilityGraph.vue'

describe('ProbabilityGraph', () => {
  it('renders properly (with focus)', () => {
    const wrapper = mount(ProbabilityGraph, {
      props: { attribute: 10, department: 5, focus: true },
    })
    expect(wrapper.text()).toContain('Target Number: 15')
    expect(wrapper.text()).toContain('Critical Success Range: 5')
  })

  it('renders properly (without focus)', () => {
    const wrapper = mount(ProbabilityGraph, {
      props: { attribute: 10, department: 5, focus: false },
    })
    expect(wrapper.text()).toContain('Target Number: 15')
    expect(wrapper.text()).toContain('Critical Success Range: 1')
  })
})
