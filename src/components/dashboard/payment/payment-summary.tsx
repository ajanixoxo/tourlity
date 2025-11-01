import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import type { PaymentSummary } from "@/types/payment"

interface PaymentSummaryProps {
    summary: PaymentSummary
}

export function PaymentSummaryCards({ summary }: PaymentSummaryProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upcoming Trips */}
            <Card className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center w-full justify-between gap-2  mb-2">
                            <span className="text-sm font-medium">Upcoming Trips</span>


                        </div>
                        <div className="text-3xl font-bold text-gray-900">{summary.upcomingTrips}</div>
                        {summary.nextTripDays > 0 ? (
                          <div className="text-sm text-gray-500 mt-1">Next trip in {summary.nextTripDays} {summary.nextTripDays === 1 ? 'day' : 'days'}</div>
                        ) : summary.upcomingTrips > 0 ? (
                          <div className="text-sm text-gray-500 mt-1">You have upcoming trips</div>
                        ) : (
                          <div className="text-sm text-gray-500 mt-1">No upcoming trips</div>
                        )}
                    </div>
                    <div className="flex flex-col items-end gap-4 w-max">
                        <div className=" w-max flex items-center gap-2 text-blue-700 rounded-full bg-blue-50 p-2">
                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 1.33398V2.66732M4 1.33398V2.66732" stroke="#3B82F6" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7.99571 8.66602H8.00169M7.99571 11.3327H8.00169M10.6594 8.66602H10.6654M5.33203 8.66602H5.33801M5.33203 11.3327H5.33801" stroke="#3B82F6" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2.33203 5.33398H13.6654" stroke="#3B82F6" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1.66797 8.16216C1.66797 5.25729 1.66797 3.80486 2.50271 2.90243C3.33746 2 4.68096 2 7.36797 2H8.63464C11.3216 2 12.6651 2 13.4999 2.90243C14.3346 3.80486 14.3346 5.25729 14.3346 8.16216V8.5045C14.3346 11.4094 14.3346 12.8618 13.4999 13.7642C12.6651 14.6667 11.3216 14.6667 8.63464 14.6667H7.36797C4.68096 14.6667 3.33746 14.6667 2.50271 13.7642C1.66797 12.8618 1.66797 11.4094 1.66797 8.5045V8.16216Z" stroke="#3B82F6" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 5.33398H14" stroke="#3B82F6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <Button variant="secondary" className="text-gray-600 !px-2">
                            Book a Trip
                        </Button>
                    </div>

                </div>
            </Card>

            {/* Total Spent */}
            <Card className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2  mb-5">

                            <span className="text-sm font-medium">Total Spent</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">${summary.totalSpent.toLocaleString()}</div>
                        <div className="text-sm text-gray-500 mt-1">Last 30 days</div>
                    </div>
                    <div className="flex flex-col items-end gap-4 w-max">
                        <div className=" w-max flex items-center mb-5 gap-2  rounded-full bg-green-50 p-2">
                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.66927 7.9987C9.66927 8.91917 8.92308 9.66536 8.0026 9.66536C7.08213 9.66536 6.33594 8.91917 6.33594 7.9987C6.33594 7.07822 7.08213 6.33203 8.0026 6.33203C8.92308 6.33203 9.66927 7.07822 9.66927 7.9987Z" stroke="#22C55E" />
                                <path d="M12.6693 7.42671C12.4525 7.39532 12.23 7.3714 12.0026 7.3555M4.0026 8.64258C3.77525 8.62668 3.55268 8.60276 3.33594 8.57137" stroke="#22C55E" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.0026 12.9987C7.11424 13.4136 5.94732 13.6654 4.66927 13.6654C3.95866 13.6654 3.2824 13.5875 2.66927 13.4471C1.66899 13.218 1.33594 12.6163 1.33594 11.5894V4.40801C1.33594 3.75146 2.02929 3.30052 2.66927 3.4471C3.2824 3.58753 3.95866 3.66536 4.66927 3.66536C5.94732 3.66536 7.11424 3.41361 8.0026 2.9987C8.89096 2.58379 10.0579 2.33203 11.3359 2.33203C12.0466 2.33203 12.7228 2.40986 13.3359 2.5503C14.3904 2.79182 14.6693 3.41227 14.6693 4.40801V11.5894C14.6693 12.2459 13.9759 12.6969 13.3359 12.5503C12.7228 12.4099 12.0466 12.332 11.3359 12.332C10.0579 12.332 8.89096 12.5838 8.0026 12.9987Z" stroke="#22C55E" />
                            </svg>

                        </div>

                        <Button variant="secondary" className=" text-gray-600 !p-2 lg:px-2">
                            Calculate Expenses
                        </Button>
                    </div>

                </div>
            </Card>
        </div>
    )
}
