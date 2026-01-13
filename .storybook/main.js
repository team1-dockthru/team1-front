/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-onboarding'],
  framework: '@storybook/nextjs',
  staticDirs: ['../public'],

  webpackFinal: async (config) => {
    // 1) 기존 rule 중 svg를 처리하는 게 있으면 svg만 제외해서 충돌 방지
    config.module.rules = config.module.rules.map((rule) => {
      const test = rule?.test;
      const isSvgRule = test && test.test && test.test('.svg');
      if (isSvgRule) return { ...rule, exclude: /\.svg$/i };
      return rule;
    });

    // 2) SVGR 로더 추가 - JSX/TSX에서 import시 React 컴포넌트로 변환
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    // 3) MDX 등 기타 파일에서 import시 URL로 처리
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.mdx$/,
      type: 'asset/resource',
    });

    return config;
  },
};

export default config;
