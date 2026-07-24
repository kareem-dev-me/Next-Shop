import { hashPassword } from "@/lib/password";
import prisma from "@/lib/prisma";

export type ProfileUser = {
  id: string;
  name: string | null;
  email: string;
};

export type UpdateProfileData = {
  name: string;
  email: string;
  password?: string;
};

export async function getProfileUser(
  userId: string,
): Promise<ProfileUser | null> {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true },
  });
}

export async function updateProfile(userId: string, data: UpdateProfileData) {
  const updateData: {
    name: string;
    email: string;
    password?: string;
  } = {
    name: data.name,
    email: data.email,
  };

  if (data.password) {
    updateData.password = await hashPassword(data.password);
  }

  return prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: { id: true, name: true, email: true },
  });
}
