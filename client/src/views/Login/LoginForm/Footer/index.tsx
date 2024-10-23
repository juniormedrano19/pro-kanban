import { GithubIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from "../../../../assets/icons";
import { ME } from "../../../../utils/constants/me";



const icons = {
    LinkedInIcon: <LinkedInIcon />,
    GithubIcon: <GithubIcon />,
    InstagramIcon: <InstagramIcon />,
    TwitterIcon: <TwitterIcon />,
  };
export const Footer = () => {
  
  return (
    <div className="flex justify-center flex-col m-auto mb-16 text-center text-lg dark:text-slate-200 ">
    <p className="font-bold mb-1">
      Built by{" "}
      <a href="#" className="underline dark:text-white">
        Junior Medrano
      </a>
    </p>
    <p>Contact me on the different platforms and social networks</p>
    <div className="flex items-center justify-center space-x-2 mt-4 flex-wrap">
      {ME.map((item) => (
        <a
          key={item.socialMedia}
          href={item.url}
            target="_blank"
          className="flex flex-none items-center justify-center rounded-full w-12 h-12 hover:bg-slate-200 transition-all dark:hover:bg-slate-700"
        >
          {icons[item.icon]}
        </a>
      ))}
    </div>
  </div>
  )
}
