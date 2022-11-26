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
