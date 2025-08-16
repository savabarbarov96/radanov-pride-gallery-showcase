import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, Users, Calendar } from "lucide-react";
import { useGetAllReservations, useDeleteReservation, ReservationData, reservationService } from "@/services/convexReservationService";
import { toast } from "sonner";
import { Id } from "../../../convex/_generated/dataModel";

const ReservationManager = () => {
  const reservations = useGetAllReservations();
  const deleteReservation = useDeleteReservation();
  const [deletingId, setDeletingId] = useState<Id<"reservations"> | null>(null);

  const handleDeleteReservation = async (reservationId: Id<"reservations">) => {
    setDeletingId(reservationId);
    
    const result = await reservationService.delete(reservationId, deleteReservation);
    
    if (result.success) {
      toast.success("Резервацията е изтрита успешно");
    } else {
      toast.error("Възникна грешка при изтриването на резервацията");
    }
    
    setDeletingId(null);
  };

  if (reservations === undefined) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Зареждане на резервациите...</p>
          </div>
        </div>
      </div>
    );
  }

  const formatMessage = (message: string) => {
    if (message.length > 100) {
      return message.substring(0, 100) + "...";
    }
    return message;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Statistics */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Резервации</h2>
          <p className="text-gray-600">Управление на заявките за резервация</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">
              Общо: {reservations?.length || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Reservations Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Заявки за резервация</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reservations && reservations.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[120px]">Име</TableHead>
                    <TableHead className="min-w-[120px]">Телефон</TableHead>
                    <TableHead className="min-w-[200px]">Съобщение</TableHead>
                    <TableHead className="min-w-[120px]">Дата</TableHead>
                    <TableHead className="w-[80px]">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation: ReservationData) => (
                    <TableRow key={reservation._id}>
                      <TableCell className="font-medium">
                        {reservation.customerName}
                      </TableCell>
                      <TableCell>
                        <a 
                          href={`tel:${reservation.phoneNumber}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {reservation.phoneNumber}
                        </a>
                      </TableCell>
                      <TableCell>
                        <div 
                          className="text-sm text-gray-700"
                          title={reservation.message}
                        >
                          {formatMessage(reservation.message)}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {reservationService.formatDate(reservation._creationTime)}
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                              disabled={deletingId === reservation._id}
                            >
                              {deletingId === reservation._id ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600"></div>
                              ) : (
                                <Trash2 className="h-3 w-3" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Изтриване на резервация</AlertDialogTitle>
                              <AlertDialogDescription>
                                Сигурни ли сте, че искате да изтриете резервацията от <strong>{reservation.customerName}</strong>? 
                                Това действие не може да бъде отменено.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отказ</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteReservation(reservation._id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Изтрий
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Няма резервации
              </h3>
              <p className="text-gray-600">
                Все още няма подадени заявки за резервация.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationManager;