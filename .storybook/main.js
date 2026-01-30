import { dirname, resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-onboarding'],
  framework: '@storybook/nextjs',
  staticDirs: ['../public'],

  webpackFinal: async (config) => {
    // Next app alias(@/*) to work in Storybook as well
    const srcPath = resolvePath(__dirname, '../src');
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': srcPath,
      '@/': `${srcPath}/`,
    };

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
