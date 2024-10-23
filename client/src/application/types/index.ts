
import { z } from 'zod';

export type SocialMediaIcon =
  | "LinkedInIcon"
  | "GithubIcon"
  | "InstagramIcon"
  | "TwitterIcon";



  export type IconSidebarDashboard = "Kanban";




  
  export const SignUpSchema = z.object({
    username: z
      .string()
      .min(1, {message:'The Username field is required'})
      .min(4, { message: "Username must be longer than 3 characters" })
   
  });
  
  export type SignUpSchemaType = z.infer<typeof SignUpSchema>;