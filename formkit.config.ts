import type { DefaultConfigOptions } from '@formkit/vue'

const config: DefaultConfigOptions = {
  theme: 'none',
  config: {
    classes: {
      outer: 'mb-4',
      label: 'block text-sm font-medium text-gray-700',
      input:
        'mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none',
      message: 'text-red-500 text-sm mt-1',
    },
  },
}

export default config
