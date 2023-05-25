import { StatusEnum } from './../../types/Routes';

export const Statues: Record<string, string> = {
	[StatusEnum.created]: "Employee successfully added",
	[StatusEnum.edited]: "Employee successfully edited",
	[StatusEnum.deleted]: "Employee successfully deleted",
}