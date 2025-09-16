import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { useSubmitReservation, NewReservationData, reservationService } from "@/services/convexReservationService";
import { toast } from "sonner";
import ModernNavigation from "@/components/ModernNavigation";
import Footer from "@/components/Footer";

type ReservationFormData = {
  customerName: string;
  phoneNumber: string;
  message: string;
};

type ReservationContent = {
  formTitle: string;
  formDescription: string;
  placeholders: {
    name: string;
    phone: string;
    message: string;
  };
  submittingLabel: string;
  errorMessage: string;
  infoTitle: string;
  infoBody: string;
  validation: {
    name: string;
    phone: string;
    message: string;
  };
};

const reservationContent: Record<"bg" | "en", ReservationContent> = {
  bg: {
    formTitle: "Форма за резервация",
    formDescription:
      "Моля попълнете формата по-долу и ние ще се свържем с вас в най-скоро време за да обсъдим възможностите за резервация.",
    placeholders: {
      name: "Вашето име",
      phone: "Вашият телефонен номер",
      message: "Разкажете ни повече за желанията ви за бъдещето домашно любимче...",
    },
    submittingLabel: "Изпращане...",
    errorMessage: "Възникна грешка при изпращането на резервацията. Моля опитайте отново.",
    infoTitle: "Важна информация",
    infoBody:
      "След получаване на вашата резервация, нашият екип ще се свърже с вас в рамките на 24 часа. Ще обсъдим всички детайли относно наличността, характеристиките на котките и процеса на осиновяване. Всички наши котки са здрави, ваксинирани и с документи.",
    validation: {
      name: "Името трябва да съдържа поне 2 символа",
      phone: "Телефонният номер трябва да съдържа поне 6 цифри",
      message: "Съобщението трябва да съдържа поне 10 символа",
    },
  },
  en: {
    formTitle: "Reservation form",
    formDescription:
      "Please fill in the form below and we will contact you shortly to discuss reservation options.",
    placeholders: {
      name: "Your name",
      phone: "Your phone number",
      message: "Tell us more about the kitten you are looking for...",
    },
    submittingLabel: "Sending...",
    errorMessage: "Something went wrong while sending the reservation. Please try again.",
    infoTitle: "Important information",
    infoBody:
      "After receiving your reservation our team will reach out within 24 hours to discuss availability, cat characteristics and the adoption process. All of our cats are healthy, vaccinated and come with documentation.",
    validation: {
      name: "Name must contain at least 2 characters",
      phone: "Phone number must contain at least 6 digits",
      message: "Message must contain at least 10 characters",
    },
  },
};

const createReservationSchema = (validation: ReservationContent["validation"]) =>
  z.object({
    customerName: z.string().min(2, validation.name),
    phoneNumber: z.string().min(6, validation.phone),
    message: z.string().min(10, validation.message),
  });

const Reservations = () => {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitReservation = useSubmitReservation();
  const content = reservationContent[language];
  const reservationSchema = useMemo(() => createReservationSchema(content.validation), [content]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    
    const reservationData: NewReservationData = {
      customerName: data.customerName,
      phoneNumber: data.phoneNumber,
      message: data.message,
    };

    const result = await reservationService.submit(reservationData, submitReservation);
    
    if (result.success) {
      toast.success(t('reservations.form.success'));
      reset();
    } else {
      toast.error(content.errorMessage);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle Background Images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top left cat image */}
        <div 
          className="absolute top-16 left-8 w-28 h-28 opacity-6 rounded-full bg-cover bg-center transform rotate-12"
          style={{ backgroundImage: "url('/cats/3e53631a-57b1-4efe-93cc-bb18c1e31b88.jpg')" }}
        />
        
        {/* Top right cat image */}
        <div 
          className="absolute top-24 right-12 w-32 h-32 opacity-5 rounded-full bg-cover bg-center transform -rotate-6"
          style={{ backgroundImage: "url('/cats/707ac156-a428-4c3c-9585-44cbf9f2af07.jpg')" }}
        />
        
        {/* Bottom left cat image */}
        <div 
          className="absolute bottom-32 left-16 w-24 h-24 opacity-7 rounded-full bg-cover bg-center transform rotate-45"
          style={{ backgroundImage: "url('/cats/beed2196-c47f-47f5-ba92-8940e07791be.jpg')" }}
        />
        
        {/* Bottom right cat image */}
        <div 
          className="absolute bottom-24 right-8 w-26 h-26 opacity-4 rounded-full bg-cover bg-center transform -rotate-12"
          style={{ backgroundImage: "url('/cats/e11886d6-4f6d-40c8-82fa-6ab0a167625d.jpg')" }}
        />
      </div>
      
      <ModernNavigation />
      
      <div className="container mx-auto px-6 lg:px-8 py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t('reservations.title')}
            </h1>
            <p className="text-lg text-muted-foreground font-crimson">
              {t('reservations.subtitle')}
            </p>
          </div>

          {/* Reservation Form */}
          <Card className="shadow-modern">
            <CardHeader>
              <CardTitle className="font-playfair text-2xl">
                {content.formTitle}
              </CardTitle>
              <CardDescription>
                {content.formDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="text-sm font-medium">
                    {t('reservations.form.name')} *
                  </Label>
                  <Input
                    id="customerName"
                    type="text"
                    placeholder={content.placeholders.name}
                    {...register("customerName")}
                    className={errors.customerName ? "border-red-500" : ""}
                  />
                  {errors.customerName && (
                    <p className="text-sm text-red-500">{errors.customerName.message}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm font-medium">
                    {t('reservations.form.phone')} *
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder={content.placeholders.phone}
                    {...register("phoneNumber")}
                    className={errors.phoneNumber ? "border-red-500" : ""}
                  />
                  {errors.phoneNumber && (
                    <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    {t('reservations.form.message')} *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={content.placeholders.message}
                    rows={5}
                    {...register("message")}
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-foreground text-background hover:bg-foreground/90 font-medium py-3"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background"></div>
                      <span>{content.submittingLabel}</span>
                    </div>
                  ) : (
                    t('reservations.form.submit')
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <div className="mt-12 text-center">
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-playfair text-xl font-semibold mb-3">
                {content.infoTitle}
              </h3>
              <p className="text-muted-foreground font-crimson leading-relaxed">
                {content.infoBody}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reservations;
