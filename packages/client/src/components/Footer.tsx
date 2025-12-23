import { useI18n } from '@/i18n';
import { Button } from './ui/button';

const Footer = () => {
   const { t } = useI18n();
   return (
      <footer className="border-t border-zinc-800 py-12 bg-zinc-950/80 backdrop-blur">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 text-center">
               <div className="space-y-3 max-w-2xl">
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-300/80">
                     {t('home.footer.tag', 'Stay ahead with Lucid Finance')}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                     {t(
                        'home.footer.title',
                        'Join our Telegram for news, blog drops, and new features'
                     )}
                  </h3>
                  <p className="text-sm md:text-base text-zinc-400">
                     {t(
                        'home.footer.subtitle',
                        'Hop into our official channel to catch announcements, release notes, and fresh promos as soon as they land.'
                     )}
                  </p>
               </div>
               <a
                  href="https://t.me/official_lucidfinance"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex"
               >
                  <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-6 h-11 shadow-lg shadow-violet-600/30">
                     {t('home.footer.cta', 'Join the Telegram Channel')}
                  </Button>
               </a>
               <p className="text-xs text-muted-foreground mt-4">
                  {t(
                     'home.footer.copyright',
                     '© 2024 Lucid Finance. All rights reserved.'
                  )}
               </p>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
