export function getBasePath() {
    const isProd = process.env.NODE_ENV === 'production';
    return isProd ? '/BiroMD' : '';
}
