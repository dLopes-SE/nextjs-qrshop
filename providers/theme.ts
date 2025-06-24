import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  primaryColor: 'orange',
  components: {
    Select: {
      styles: (theme) => ({
        input: {
          borderColor: theme.colors.orange[4],
          '&:focus': {
            borderColor: theme.colors.orange[5],
          },
        },
      }),
    },
    TextInput: {
      styles: (theme) => ({
        input: {
          borderColor: theme.colors.orange[4],
          '&:focus': {
            borderColor: theme.colors.orange[5],
          },
        },
      }),
    },
  },
};