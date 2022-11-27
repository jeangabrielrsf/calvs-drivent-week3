import { notFoundError } from "@/errors";
import { ticketNotPaidError } from "@/errors/not-paid-error";
import hotelRepository from "@/repositories/hotel-repository";
import { TicketStatus } from "@prisma/client";
import ticketService from "../tickets-service";

async function getHotelsList(userId: number) {
  const checkTicket = await ticketService.getTicketByUserId(userId);
  if (!checkTicket) {
    throw notFoundError();
  }
  if (checkTicket.status == TicketStatus.RESERVED) {
    throw ticketNotPaidError();
  }

  if (checkTicket.TicketType.includesHotel === false || checkTicket.TicketType.isRemote == true) {
    throw notFoundError();
  }
  const list = hotelRepository.findHotels();
  return list;
}

async function getHotelRooms(hotelId: number) {
  const hotel = await hotelRepository.findHotelById(hotelId);
  if (!hotel) {
    throw notFoundError();
  }
  return hotel;
}

const hotelService = {
  getHotelsList,
  getHotelRooms,
};

export default hotelService;
