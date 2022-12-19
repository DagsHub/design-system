// Copied and modified from https://www.newline.co/courses/storybook-for-react-apps/theming-storybook#dark-mode!
// to turn everything into light mode
import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'

const theme = create({
    base: 'light',
})

addons.setConfig({
    theme,
})