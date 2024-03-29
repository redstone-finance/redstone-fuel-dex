// @ts-ignore
import MailLogo from "../assets/mail.svg";
// @ts-ignore
import TwitterLogo from "../assets/twitter.svg";
// @ts-ignore
import GithubLogo from "../assets/github.svg";
// @ts-ignore
import DiscordLogo from "../assets/discord.svg";

export const Footer = () => {
  return (
    <footer className="flex mt-auto mb-5 w-full justify-center gap-6">
      <div>
        <span className="flex text-sm text-gray-500">© RedStone 2023</span>
      </div>
      <div className="flex gap-3">
        <a href="https://discord.com/invite/PVxBZKFr46" target="_blank">
          <img src={DiscordLogo} alt="Discord logo" />
        </a>
        <a href="https://twitter.com/redstone_defi" target="_blank">
          <img src={TwitterLogo} alt="Twitter logo" />
        </a>
        <a href="mailto:hello@redstone.finance">
          <img src={MailLogo} alt="Mail logo" />
        </a>
        <a href="https://github.com/redstone-finance" target="_blank">
          <img src={GithubLogo} alt="Github logo" />
        </a>
      </div>
    </footer>
  );
};
