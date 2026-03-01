import Banner from "@/components/home/banner/Banner";
import { setRequestLocale } from 'next-intl/server';

type Props = {
    params: Promise<{ locale: string }>;
};

const HomePage = async ({ params }: Props) => {
    const { locale } = await params;

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <main className="min-h-screen">
            <Banner />
        </main>
    );
};

export default HomePage;