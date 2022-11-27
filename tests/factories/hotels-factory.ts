import { prisma } from "@/config";
import faker from "@faker-js/faker";
import { Hotel } from "@prisma/client";

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: `Hotel ${faker.lorem.word(4)}`,
      image: faker.image.imageUrl(),
    },
  });
}

function newRoomsArray(length: number, hotelId: number) {
  const newRooms = [];
  const roomCapacity = 4;
  for (let i = 0; i < length; i++) {
    const roomObj = {
      name: `${i + 1}`,
      capacity: roomCapacity,
      hotelId,
    };
    newRooms.push(roomObj);
  }
  return newRooms;
}

export async function createRooms(hotelId: number, roomsLength: number) {
  const newRooms = newRoomsArray(roomsLength, hotelId);

  return prisma.room.createMany({
    data: newRooms,
  });
}
