import {useParams, useNavigate} from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CreditCard,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  ArrowLeft,
  Download,
  Star,
  MessageSquare,
} from "lucide-react";
import {Button} from "../components/ui/button";
import {Badge} from "../components/ui/badge";
import {Separator} from "../components/ui/separator";
import {ImageWithFallback} from "../components/figma/ImageWithFallback";
import {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {toast} from "sonner";

export default function BookingDetailsPage() {
  const {bookingId} = useParams();
  const navigate = useNavigate();
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Mock booking data - in real app, fetch from API
  const booking = {
    id: bookingId,
    service: "House Cleaning",
    category: "Cleaning Services",
    professional: {
      name: "Sarah Williams",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      phone: "+971 50 123 4567",
      email: "sarah.williams@alkabir.ae",
      rating: 4.9,
      completedJobs: 234,
    },
    date: "Oct 18, 2025",
    time: "10:00 AM - 12:00 PM",
    status: "upcoming",
    price: 150,
    address: {
      street: "Marina Plaza, Tower A, Apt 1502",
      area: "Dubai Marina",
      city: "Dubai",
      full: "Marina Plaza, Tower A, Apt 1502, Dubai Marina, Dubai, UAE",
    },
    image: "https://images.unsplash.com/photo-1578329824171-ef7611e9a5ca?w=400",
    description:
      "Deep cleaning service for 2-bedroom apartment including kitchen, bathrooms, and all living areas.",
    bookingDate: "Oct 10, 2025",
    bookingNumber: "BK-2025-001",
    paymentMethod: "Credit Card •••• 4242",
    notes: "Please bring eco-friendly cleaning products. Pet-friendly home.",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800";
      case "completed":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-700";
    }
  };

  const handleCancelBooking = () => {
    // API call to cancel booking
    toast.success("Booking cancelled", {
      description: "Your booking has been cancelled successfully.",
    });
    setCancelModalOpen(false);
    navigate("/dashboard");
  };

  const handleReschedule = () => {
    // API call to reschedule
    toast.success("Reschedule request sent", {
      description: "We will contact you shortly to confirm the new date.",
    });
    setRescheduleModalOpen(false);
  };

  const handleDownloadInvoice = () => {
    // API call to generate and download invoice
    toast.success("Invoice downloaded", {
      description: "Your invoice has been downloaded successfully.",
    });
    setInvoiceModalOpen(false);
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error("Rating required", {
        description: "Please select a rating before submitting.",
      });
      return;
    }

    // API call to submit review
    toast.success("Review submitted", {
      description: "Thank you for your feedback!",
    });
    setReviewModalOpen(false);
    setRating(0);
    setReviewText("");
  };

  return (
    <div className='min-h-screen bg-background transition-colors duration-300 py-8'>
      <div className='w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8'>
        {/* Back Button */}
        <Button
          variant='ghost'
          onClick={() => navigate("/dashboard")}
          className='mb-6 hover:bg-accent'>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className='bg-card rounded-2xl shadow-sm p-6 md:p-8 mb-6 border border-border transition-colors duration-300'>
          <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6'>
            <div>
              <div className='flex items-center gap-3 mb-2'>
                <h1 className='text-3xl text-foreground'>{booking.service}</h1>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </div>
              <p className='text-muted-foreground'>{booking.category}</p>
              <p className='text-sm text-muted-foreground mt-1'>
                Booking #{booking.bookingNumber}
              </p>
            </div>
            <div className='text-right'>
              <div className='text-3xl text-emerald-600 dark:text-emerald-400'>
                AED {booking.price}
              </div>
              <p className='text-sm text-muted-foreground mt-1'>
                Booked on {booking.bookingDate}
              </p>
            </div>
          </div>

          {/* Service Image */}
          <div className='w-full h-64 rounded-xl overflow-hidden mb-6'>
            <ImageWithFallback
              src={booking.image}
              alt={booking.service}
              className='w-full h-full object-cover'
            />
          </div>

          {/* Description */}
          <div className='mb-6'>
            <h3 className='text-lg text-foreground mb-2 flex items-center'>
              <FileText className='w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400' />
              Service Description
            </h3>
            <p className='text-muted-foreground'>{booking.description}</p>
          </div>

          <Separator className='my-6' />

          {/* Booking Details Grid */}
          <div className='grid md:grid-cols-2 gap-6 mb-6'>
            {/* Date & Time */}
            <div className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <div className='w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0'>
                  <Calendar className='w-5 h-5 text-emerald-600 dark:text-emerald-400' />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Date</p>
                  <p className='text-foreground'>{booking.date}</p>
                </div>
              </div>

              <div className='flex items-start space-x-3'>
                <div className='w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0'>
                  <Clock className='w-5 h-5 text-emerald-600 dark:text-emerald-400' />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Time</p>
                  <p className='text-foreground'>{booking.time}</p>
                </div>
              </div>

              <div className='flex items-start space-x-3'>
                <div className='w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0'>
                  <MapPin className='w-5 h-5 text-emerald-600 dark:text-emerald-400' />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Location</p>
                  <p className='text-foreground'>{booking.address.full}</p>
                </div>
              </div>
            </div>

            {/* Payment & Notes */}
            <div className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <div className='w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0'>
                  <CreditCard className='w-5 h-5 text-emerald-600 dark:text-emerald-400' />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Payment Method
                  </p>
                  <p className='text-foreground'>{booking.paymentMethod}</p>
                </div>
              </div>

              {booking.notes && (
                <div className='flex items-start space-x-3'>
                  <div className='w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0'>
                    <MessageSquare className='w-5 h-5 text-emerald-600 dark:text-emerald-400' />
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Special Notes
                    </p>
                    <p className='text-foreground'>{booking.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator className='my-6' />

          {/* Professional Info */}
          <div>
            <h3 className='text-lg text-foreground mb-4'>
              Assigned Professional
            </h3>
            <div className='bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl p-4 border border-border'>
              <div className='flex items-start gap-4'>
                <div className='w-16 h-16 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 flex-shrink-0'>
                  <ImageWithFallback
                    src={booking.professional.image}
                    alt={booking.professional.name}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='flex-1'>
                  <div className='flex items-start justify-between gap-4 mb-2'>
                    <div>
                      <h4 className='text-lg text-foreground'>
                        {booking.professional.name}
                      </h4>
                      <div className='flex items-center gap-4 mt-1'>
                        <div className='flex items-center gap-1'>
                          <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                          <span className='text-sm text-foreground'>
                            {booking.professional.rating}
                          </span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <CheckCircle className='w-4 h-4 text-emerald-600 dark:text-emerald-400' />
                          <span className='text-sm text-muted-foreground'>
                            {booking.professional.completedJobs} jobs
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-3 mt-3'>
                    <a
                      href={`tel:${booking.professional.phone}`}
                      className='flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:underline'>
                      <Phone className='w-4 h-4' />
                      {booking.professional.phone}
                    </a>
                    <a
                      href={`mailto:${booking.professional.email}`}
                      className='flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:underline'>
                      <Mail className='w-4 h-4' />
                      {booking.professional.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-wrap gap-3 mt-6'>
            {booking.status === "upcoming" && (
              <>
                <Button
                  onClick={() => setRescheduleModalOpen(true)}
                  variant='outline'
                  className='border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400'>
                  <Calendar className='w-4 h-4 mr-2' />
                  Reschedule
                </Button>
                <Button
                  onClick={() => setCancelModalOpen(true)}
                  variant='outline'
                  className='border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400'>
                  Cancel Booking
                </Button>
              </>
            )}
            {booking.status === "completed" && (
              <>
                <Button
                  onClick={() => setReviewModalOpen(true)}
                  variant='outline'
                  className='border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400'>
                  <Star className='w-4 h-4 mr-2' />
                  Leave Review
                </Button>
                <Button
                  onClick={() => setInvoiceModalOpen(true)}
                  variant='outline'
                  className='border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400'>
                  <Download className='w-4 h-4 mr-2' />
                  Download Invoice
                </Button>
              </>
            )}
            <Button className='bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white'>
              Contact Support
            </Button>
          </div>
        </div>

        {/* Cancel Booking Modal */}
        <Dialog open={cancelModalOpen} onOpenChange={setCancelModalOpen}>
          <DialogContent className='w-[calc(100%-2rem)] max-w-md mx-auto'>
            <DialogHeader>
              <DialogTitle className='text-lg sm:text-xl'>
                Cancel Booking
              </DialogTitle>
              <DialogDescription className='text-sm'>
                Are you sure you want to cancel this booking? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <div className='bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3 sm:p-4'>
              <p className='text-sm text-foreground mb-2'>
                <strong>Cancellation Policy:</strong>
              </p>
              <ul className='text-xs sm:text-sm text-muted-foreground space-y-1 list-disc list-inside'>
                <li>Free cancellation up to 24 hours before appointment</li>
                <li>50% refund for cancellation within 24 hours</li>
                <li>No refund for same-day cancellation</li>
              </ul>
            </div>
            <DialogFooter className='flex flex-col-reverse sm:flex-row gap-2 sm:gap-2'>
              <Button
                variant='outline'
                onClick={() => setCancelModalOpen(false)}
                className='w-full sm:w-auto'>
                Keep Booking
              </Button>
              <Button
                variant='destructive'
                onClick={handleCancelBooking}
                className='w-full sm:w-auto'>
                Cancel Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reschedule Modal */}
        <Dialog
          open={rescheduleModalOpen}
          onOpenChange={setRescheduleModalOpen}>
          <DialogContent className='w-[calc(100%-2rem)] max-w-md mx-auto'>
            <DialogHeader>
              <DialogTitle className='text-lg sm:text-xl'>
                Reschedule Booking
              </DialogTitle>
              <DialogDescription className='text-sm'>
                Select a new date and time for your booking.
              </DialogDescription>
            </DialogHeader>
            <div className='space-y-4 py-2 sm:py-4'>
              <div>
                <label
                  htmlFor='new-date'
                  className='block text-sm text-muted-foreground mb-2'>
                  New Date
                </label>
                <input
                  id='new-date'
                  type='date'
                  className='w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-border bg-background text-foreground rounded-lg transition-colors duration-300 text-sm'
                  min={new Date().toISOString().split("T")[0]}
                  aria-label='Select new date for booking'
                />
              </div>
              <div>
                <label
                  htmlFor='new-time'
                  className='block text-sm text-muted-foreground mb-2'>
                  New Time
                </label>
                <select
                  id='new-time'
                  className='w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-border bg-background text-foreground rounded-lg transition-colors duration-300 text-sm'
                  aria-label='Select new time slot for booking'>
                  <option>9:00 AM - 11:00 AM</option>
                  <option>11:00 AM - 1:00 PM</option>
                  <option>1:00 PM - 3:00 PM</option>
                  <option>3:00 PM - 5:00 PM</option>
                  <option>5:00 PM - 7:00 PM</option>
                </select>
              </div>
              <div className='bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 sm:p-4'>
                <p className='text-xs sm:text-sm text-foreground'>
                  <strong>Note:</strong> Reschedule requests are subject to
                  professional availability. We'll confirm within 2 hours.
                </p>
              </div>
            </div>
            <DialogFooter className='flex flex-col-reverse sm:flex-row gap-2 sm:gap-2'>
              <Button
                variant='outline'
                onClick={() => setRescheduleModalOpen(false)}
                className='w-full sm:w-auto'>
                Cancel
              </Button>
              <Button
                onClick={handleReschedule}
                className='bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white w-full sm:w-auto'>
                Confirm Reschedule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Download Invoice Modal */}
        <Dialog open={invoiceModalOpen} onOpenChange={setInvoiceModalOpen}>
          <DialogContent className='w-[calc(100%-2rem)] max-w-lg mx-auto max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle className='text-lg sm:text-xl'>
                Download Invoice
              </DialogTitle>
              <DialogDescription className='text-sm'>
                Review your invoice details before downloading.
              </DialogDescription>
            </DialogHeader>
            <div className='space-y-3 sm:space-y-4 py-2 sm:py-4'>
              {/* Invoice Preview */}
              <div className='bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl p-4 sm:p-6 border border-border'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4'>
                  <div>
                    <h3 className='text-base sm:text-lg text-foreground'>
                      AL-Kabir Services
                    </h3>
                    <p className='text-xs sm:text-sm text-muted-foreground'>
                      Dubai, UAE
                    </p>
                  </div>
                  <div className='sm:text-right'>
                    <p className='text-xs sm:text-sm text-muted-foreground'>
                      Invoice #
                    </p>
                    <p className='text-sm sm:text-base text-foreground'>
                      {booking.bookingNumber}
                    </p>
                  </div>
                </div>

                <div className='border-t border-border pt-3 sm:pt-4 space-y-2 sm:space-y-3'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Service</span>
                    <span className='text-foreground text-right'>
                      {booking.service}
                    </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Date</span>
                    <span className='text-foreground'>{booking.date}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Professional</span>
                    <span className='text-foreground text-right'>
                      {booking.professional.name}
                    </span>
                  </div>
                  <div className='border-t border-border pt-2 sm:pt-3 flex justify-between text-sm'>
                    <span className='text-foreground'>Subtotal</span>
                    <span className='text-foreground'>AED {booking.price}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>VAT (5%)</span>
                    <span className='text-muted-foreground'>
                      AED {(booking.price * 0.05).toFixed(2)}
                    </span>
                  </div>
                  <div className='border-t border-border pt-2 sm:pt-3 flex justify-between'>
                    <span className='text-base sm:text-lg text-foreground'>
                      Total
                    </span>
                    <span className='text-base sm:text-lg text-emerald-600 dark:text-emerald-400'>
                      AED {(booking.price * 1.05).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className='bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4'>
                <p className='text-xs sm:text-sm text-foreground'>
                  <strong>Note:</strong> The invoice will be downloaded as a PDF
                  file.
                </p>
              </div>
            </div>
            <DialogFooter className='flex flex-col-reverse sm:flex-row gap-2 sm:gap-2'>
              <Button
                variant='outline'
                onClick={() => setInvoiceModalOpen(false)}
                className='w-full sm:w-auto'>
                Cancel
              </Button>
              <Button
                onClick={handleDownloadInvoice}
                className='bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white w-full sm:w-auto'>
                <Download className='w-4 h-4 mr-2' />
                Download PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Leave Review Modal */}
        <Dialog open={reviewModalOpen} onOpenChange={setReviewModalOpen}>
          <DialogContent className='w-[calc(100%-2rem)] max-w-lg mx-auto max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle className='text-lg sm:text-xl'>
                Leave a Review
              </DialogTitle>
              <DialogDescription className='text-sm'>
                Share your experience with {booking.professional.name} to help
                others make informed decisions.
              </DialogDescription>
            </DialogHeader>
            <div className='space-y-4 sm:space-y-6 py-2 sm:py-4'>
              {/* Star Rating */}
              <div>
                <label className='block text-sm text-muted-foreground mb-3'>
                  Your Rating
                </label>
                <div className='flex gap-1 sm:gap-2 justify-center sm:justify-start'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type='button'
                      onClick={() => setRating(star)}
                      className='transition-all duration-200 hover:scale-110 focus:outline-none touch-manipulation'
                      aria-label={`Rate ${star} out of 5 stars`}
                      title={`Rate ${star} out of 5 stars`}>
                      <Star
                        className={`w-8 h-8 sm:w-10 sm:h-10 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className='text-sm text-emerald-600 dark:text-emerald-400 mt-2 text-center sm:text-left'>
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                  </p>
                )}
              </div>

              {/* Review Text */}
              <div>
                <label
                  htmlFor='review-text'
                  className='block text-sm text-muted-foreground mb-2'>
                  Your Review (Optional)
                </label>
                <textarea
                  id='review-text'
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder='Tell us about your experience...'
                  className='w-full px-3 sm:px-4 py-2 sm:py-3 border border-border bg-background text-foreground rounded-lg transition-colors duration-300 min-h-[100px] sm:min-h-[120px] resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm'
                  maxLength={500}
                  aria-label='Write your review about the service'
                />
                <p className='text-xs text-muted-foreground mt-1'>
                  {reviewText.length}/500 characters
                </p>
              </div>

              <div className='bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 sm:p-4'>
                <p className='text-xs sm:text-sm text-foreground'>
                  <strong>Your review helps us:</strong> Maintain high service
                  quality and help other customers make informed decisions.
                </p>
              </div>
            </div>
            <DialogFooter className='flex flex-col-reverse sm:flex-row gap-2 sm:gap-2'>
              <Button
                variant='outline'
                onClick={() => setReviewModalOpen(false)}
                className='w-full sm:w-auto'>
                Cancel
              </Button>
              <Button
                onClick={handleSubmitReview}
                className='bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white w-full sm:w-auto'>
                <Star className='w-4 h-4 mr-2' />
                Submit Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
