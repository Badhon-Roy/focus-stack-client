import LearningContent from "@/components/learning/LearningContent";
import { setRequestLocale } from 'next-intl/server';

type Props = {
    params: Promise<{ locale: string }>;
};

const Page = async ({ params }: Props) => {
    const { locale } = await params;
    setRequestLocale(locale);

    return <LearningContent />;
};

export default Page;
