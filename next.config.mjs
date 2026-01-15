// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // SVG 파일 처리 설정
    // 1. 기존 SVG 규칙 찾아서 제외
    config.module.rules.forEach((rule) => {
      if (rule.test) {
        const testStr = rule.test.toString();
        if (testStr.includes('svg')) {
          rule.exclude = /\.svg$/i;
        }
      }
      // oneOf 처리
      if (rule.oneOf) {
        rule.oneOf.forEach((oneOfRule) => {
          if (oneOfRule.test) {
            const testStr = oneOfRule.test.toString();
            if (testStr.includes('svg')) {
              oneOfRule.exclude = /\.svg$/i;
            }
          }
        });
      }
    });

    // 2. SVGR 로더 추가 - issuer 조건 없이
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  turbopack: {},
};

export default nextConfig;
