import { prisma } from "@/config";
import faker from "@faker-js/faker";
import { Hotel } from "@prisma/client";

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: `Hotel ${faker.lorem.word()}`,
      image: faker.image.imageUrl(),
    },
  });
}
