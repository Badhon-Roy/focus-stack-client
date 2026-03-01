import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
    // Ensuring the locale is awaited if it's a promise (common in Next.js 15/16 + next-intl)
    const activeLocale = await requestLocale || 'en';

    return {
        locale: activeLocale,
        messages: (await import(`@/messages/${activeLocale}.json`)).default
    };
});
