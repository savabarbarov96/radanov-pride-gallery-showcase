import { useForm as useFormspree, ValidationError } from "@formspree/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import ModernNavigation from "@/components/ModernNavigation";
import Footer from "@/components/Footer";

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
  },
};

const Reservations = () => {
  const { t, language } = useLanguage();
  const content = reservationContent[language];
  const [state, handleSubmit] = useFormspree("mppabokd");

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Background Images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Top left cat image */}
        <div
          className="absolute top-20 -left-12 lg:left-8 w-32 h-32 lg:w-40 lg:h-40 opacity-[0.03] rounded-full bg-cover bg-center transform rotate-12 blur-[1px]"
          style={{ backgroundImage: "url('/cats/3e53631a-57b1-4efe-93cc-bb18c1e31b88.jpg')" }}
        />

        {/* Top right cat image */}
        <div
          className="absolute top-32 -right-16 lg:right-12 w-36 h-36 lg:w-44 lg:h-44 opacity-[0.04] rounded-full bg-cover bg-center transform -rotate-6 blur-[1px]"
          style={{ backgroundImage: "url('/cats/707ac156-a428-4c3c-9585-44cbf9f2af07.jpg')" }}
        />

        {/* Middle left cat image */}
        <div
          className="absolute top-1/2 -left-8 lg:left-16 w-28 h-28 lg:w-36 lg:h-36 opacity-[0.02] rounded-full bg-cover bg-center transform rotate-45 blur-[1px]"
          style={{ backgroundImage: "url('/cats/beed2196-c47f-47f5-ba92-8940e07791be.jpg')" }}
        />

        {/* Middle right cat image */}
        <div
          className="absolute top-[60%] -right-12 lg:right-8 w-32 h-32 lg:w-40 lg:h-40 opacity-[0.02] rounded-full bg-cover bg-center transform -rotate-12 blur-[1px]"
          style={{ backgroundImage: "url('/cats/e11886d6-4f6d-40c8-82fa-6ab0a167625d.jpg')" }}
        />
      </div>
      
      <ModernNavigation />
      
      <div className="container mx-auto px-6 lg:px-8 py-12 pb-24 relative z-10">
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
              {state.succeeded ? (
                <div className="rounded-2xl bg-muted p-6 text-center leading-7">{t('reservations.form.success')}</div>
              ) : <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="text-sm font-medium">
                    {t('reservations.form.name')} *
                  </Label>
                  <Input
                    id="customerName"
                    type="text"
                    placeholder={content.placeholders.name}
                    name="customerName"
                    required
                    minLength={2}
                  />
                  <ValidationError prefix="Име" field="customerName" errors={state.errors} />
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
                    name="phoneNumber"
                    required
                    minLength={6}
                  />
                  <ValidationError prefix="Телефон" field="phoneNumber" errors={state.errors} />
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
                    name="message"
                    required
                    minLength={10}
                  />
                  <ValidationError prefix="Съобщение" field="message" errors={state.errors} />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-foreground text-background hover:bg-foreground/90 font-medium py-3"
                >
                  {state.submitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background"></div>
                      <span>{content.submittingLabel}</span>
                    </div>
                  ) : (
                    t('reservations.form.submit')
                  )}
                </Button>
              </form>}
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
