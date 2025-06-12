import { useRouter } from 'next/router';
import Styles from './styles.module.css'

const LanguageSwitcher = () => {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;

    const changeLanguage = (lng: string) => {
        router.push({ pathname, query }, asPath, { locale: lng });
    };

    return (
        <div className={Styles.flags}>
            <button className={Styles.button} onClick={() => changeLanguage('pt')} disabled={locale === 'pt'}>
                <img
                    src="/br.svg"
                    alt="Português"
                    width="30"
                    height="30"
                />
            </button>
            <button className={Styles.button} onClick={() => changeLanguage('en')} disabled={locale === 'en'}>
                <img
                    src="/us.svg"
                    alt="English"
                    width="30"
                    height="30"
                />
            </button>
            <button className={Styles.button} onClick={() => changeLanguage('es')} disabled={locale === 'es'}>
                <img
                    src="/es.svg"
                    alt="Español"
                    width="30"
                    height="30"
                />
            </button>
        </div>
    );
};

export default LanguageSwitcher;
