import { toast } from 'sonner';
import { z } from 'zod';

import { IndustryList, web3Exp, workExp, workType } from '@/constants';
import { CommunityList } from '@/constants/communityList';
import { CountryList } from '@/constants/countryList';
import {
  discordUsernameSchema,
  githubUsernameSchema,
  linkedinUsernameSchema,
  telegramUsernameSchema,
  twitterUsernameSchema,
  websiteUrlSchema,
} from '@/features/social';
import { skillsArraySchema } from '@/interface/skills';
import { validateSolAddressUI } from '@/utils/validateSolAddress';

export const profileSchema = z
  .object({
    username: z.string().min(1, 'Username is required'),
    photo: z.string().optional(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    bio: z.string().max(180, 'Bio cannot exceed 180 characters').optional(),
    discord: discordUsernameSchema,
    twitter: twitterUsernameSchema.optional().or(z.literal('')),
    github: githubUsernameSchema.optional().or(z.literal('')),
    linkedin: linkedinUsernameSchema.optional().or(z.literal('')),
    telegram: telegramUsernameSchema.optional().or(z.literal('')),
    website: websiteUrlSchema.optional().or(z.literal('')),
    community: z
      .string()
      .array()
      .optional()
      .refine(
        (community) => {
          if (!community) return true;
          return community.every((item) => CommunityList.includes(item));
        },
        {
          message: 'Invalid Community values',
        },
      ),
    interests: z.enum(IndustryList).array().optional(),
    experience: z.enum(workExp).optional(),
    cryptoExperience: z.enum(web3Exp).optional(),
    workPrefernce: z.enum(workType).optional(),
    currentEmployer: z.string().optional(),
    skills: skillsArraySchema,
    private: z.boolean().default(false),
    location: z.enum(CountryList).optional(),
    publicKey: z
      .string()
      .min(1, 'Wallet address is required')
      .refine(
        (val) => validateSolAddressUI(val),
        'Invalid Solana wallet address',
      ),
  })
  .superRefine((data, ctx) => {
    socialSuperRefine(data, ctx);
  });

export type ProfileFormData = z.infer<typeof profileSchema>;

export const socialSuperRefine = async (
  data: Partial<ProfileFormData>,
  ctx: z.RefinementCtx,
) => {
  const socialFields = ['twitter', 'github', 'linkedin', 'website', 'telegram'];
  const filledSocials = socialFields.filter(
    (field) => data[field as keyof typeof data],
  );

  if (filledSocials.length === 0) {
    toast.error(
      'At least one additional social link (apart from Discord) is required',
    );
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        'At least one additional social link (apart from Discord) is required',
      path: ['website'], // website is at the end in UI
    });
  }
};

export const aboutYouSchema = profileSchema._def.schema.pick({
  username: true,
  firstName: true,
  lastName: true,
  location: true,
  photo: true,
  publicKey: true,
  skills: true,
});

export type AboutYouFormData = z.infer<typeof aboutYouSchema>;

export const yourLinksSchema = profileSchema._def.schema
  .pick({
    discord: true,
    twitter: true,
    github: true,
    linkedin: true,
    telegram: true,
    website: true,
  })
  .superRefine((data, ctx) => {
    socialSuperRefine(data, ctx);
  });

export type YourLinksFormData = z.infer<typeof yourLinksSchema>;
