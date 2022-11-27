import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function listAllHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const result = await hotelService.getHotelsList(userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name == "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name == "ticketNotPaidError") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
    }
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export async function listHotelRooms(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;
  const { userId } = req;
  if (!hotelId) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
  // não faz sentido verificar sem hotelId não existe. Se não existir, vai cair na rota get /hotels
  try {
    const check = await hotelService.getHotelsList(userId);
    const result = await hotelService.getHotelRooms(Number(hotelId));

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name == "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name == "ticketNotPaidError") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
