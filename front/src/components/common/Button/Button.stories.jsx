import Button from './Button';

export default {
  title: 'Atom/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

/**
 * 기본 템플릿
 */
const Template = (args) => <Button {...args} />;

/**
 * 기본 버튼
 */
export const Default = Template.bind({});
Default.args = {
  children: '버튼',
};

/**
 * Filled / Tonal
 */
export const FilledTonal = Template.bind({});
FilledTonal.args = {
  variant: 'filled-tonal',
  className: 'font-16-semibold',
  children: '거절하기',
};

/**
 * Outline
 */
export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  children: '임시저장',
};

/**
 * Solid
 */
export const Solid = Template.bind({});
Solid.args = {
  variant: 'solid',
  children: '승인하기',
};

/**
 * Transparent
 */
export const Transparent = Template.bind({});
Transparent.args = {
  variant: 'transparent',
  children: '링크 열기',
};

/**
 * Disabled
 */
export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'solid',
  disabled: true,
  children: '등록하기',
};
