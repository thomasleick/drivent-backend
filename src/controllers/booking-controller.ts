import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import bookingService from "@/services/booking-service";
import { Room } from "@prisma/client";

export async function listBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const booking = await bookingService.getBooking(userId);
    return res.status(httpStatus.OK).send({
      id: booking.id,
      Room: booking.Room,
    });
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function listBookingByRoomId(req: AuthenticatedRequest, res: Response) {

  interface Booking {
  id: number;
  Room: Room;
}

  try {
    const { roomId } = req.params;
    const result = await bookingService.getBookingsByRoomId(+roomId);
    const bookings: Booking[] = result.map((booking) => ({ id: booking.id, Room: booking.Room }));
    return res.status(httpStatus.OK).send(bookings);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
export async function listBookingByHotelId(req: AuthenticatedRequest, res: Response) {

  interface Booking {
  id: number;
  Room: Room;
}

  try {
    const { hotelId } = req.params;
    const result = await bookingService.getBookingsByHotelId(+hotelId);
    const bookings: Booking[] = result.map((booking) => ({ id: booking.id, Room: booking.Room }));
    return res.status(httpStatus.OK).send(bookings);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}


export async function bookingRoom(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const { roomId } = req.body;

    if (!roomId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const booking = await bookingService.bookingRoomById(userId, Number(roomId));

    return res.status(httpStatus.OK).send({
      bookingId: booking.id,
    });
  } catch (error) {
    if (error.name === "CannotBookingError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function changeBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const bookingId = Number(req.params.bookingId);

    if (!bookingId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const { roomId } = req.body;

    if (!roomId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const booking = await bookingService.changeBookingRoomById(userId, Number(roomId));

    return res.status(httpStatus.OK).send({
      bookingId: booking.id,
    });
  } catch (error) {
    if (error.name === "CannotBookingError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

