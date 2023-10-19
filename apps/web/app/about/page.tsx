import { Instagram, Mail } from 'lucide-react';

import { DiscordIcon } from '../../components/icons/DiscordIcon';
import { GitHubIcon } from '../../components/icons/GitHubIcon';
import { LinkedInIcon } from '../../components/icons/LinkedInIcon';
import { WhatsAppIcon } from '../../components/icons/WhatsAppIcon';

import { ContactButton } from './components/ContactButton';
import { SocialNetworkButton } from './components/SocialNetworkButton';

export default function AboutPage() {
  return (
    <div className="mx-6 flex h-full max-w-3xl items-center justify-start sm:mx-12">
      <main>
        <h1 className="mb-4 text-4xl font-bold">About</h1>

        <p className="mb-8 font-mono text-sm text-muted-foreground">Hi there! 👋 I am Felipe Oliveira</p>

        <p className="mb-6 text-foreground">
          Let&apos;s go build something awesome? <small className="text-sm opacity-80">Contact me:</small>
        </p>

        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Check my social networks</p>

            <div className="flex items-center gap-0.5">
              <SocialNetworkButton href="https://github.com/felipstein" icon={GitHubIcon} />
              <SocialNetworkButton href="https://www.linkedin.com/in/feelipeoliveira/" icon={LinkedInIcon} />
              <SocialNetworkButton href="https://www.instagram.com/luisfeelip/" icon={Instagram} />
            </div>
          </div>

          <div className="space-y-2" title="Click to copy">
            <p className="text-xs text-muted-foreground">Contact me directly</p>

            <div className="flex items-center gap-0.5">
              <ContactButton text="+55 (44) 99876-6289">
                <WhatsAppIcon />
              </ContactButton>

              <ContactButton text="luisfeelip">
                <DiscordIcon />
              </ContactButton>

              <ContactButton text="felipstein.oliveira@gmail.com">
                <Mail />
              </ContactButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
