import { ApplicationError } from "@/protocols";

export function ticketNotPaidError(): ApplicationError {
  return {
    name: "ticketNotPaidError",
    message: "You must be pay your ticket to continue",
  };
}
