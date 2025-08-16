import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";

// Types
export interface ReservationData {
  _id: Id<"reservations">;
  _creationTime: number;
  customerName: string;
  phoneNumber: string;
  message: string;
}

export interface NewReservationData {
  customerName: string;
  phoneNumber: string;
  message: string;
}

// Custom hooks for reservation operations
export const useSubmitReservation = () => {
  return useMutation(api.reservations.submitReservation);
};

export const useGetAllReservations = () => {
  return useQuery(api.reservations.getAllReservations);
};

export const useDeleteReservation = () => {
  return useMutation(api.reservations.deleteReservation);
};

// Service functions
export const reservationService = {
  // Submit a new reservation
  submit: async (data: NewReservationData, submitMutation: any) => {
    try {
      const result = await submitMutation(data);
      return { success: true, data: result };
    } catch (error) {
      console.error("Error submitting reservation:", error);
      return { success: false, error: "Failed to submit reservation" };
    }
  },

  // Delete a reservation
  delete: async (reservationId: Id<"reservations">, deleteMutation: any) => {
    try {
      await deleteMutation({ reservationId });
      return { success: true };
    } catch (error) {
      console.error("Error deleting reservation:", error);
      return { success: false, error: "Failed to delete reservation" };
    }
  },

  // Format date for display
  formatDate: (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("bg-BG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  },
};