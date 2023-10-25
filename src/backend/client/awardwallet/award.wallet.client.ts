import { postWithAuth } from "../rest.client";
import { AwardWalletHotelBooking } from "./award.wallet.types";

export default class AwardWalletClient {
    private apiKey = `${process.env.AWARD_WALLET_USERNAME}:${process.env.AWARD_WALLET_KEY}`;
    private AUTH_HEADER_KEY = 'X-Authentication';
    private BASE_URL = "https://service.awardwallet.com/email/json/v2"
    private PARSE_EMAIL = `${this.BASE_URL}/parseEmail`;
    private GET_PARSE_RESULT = `${this.BASE_URL}/getResults/`;

    public importHotelBooking = async (email: string): Promise<AwardWalletHotelBooking[]> => {
        let importedHotelBookings: AwardWalletHotelBooking[] = [];

        try {
            const postBody = {
                email: email,
                returnEmail: "headers"
            }
            const queuedParseResponse = await postWithAuth(this.PARSE_EMAIL, postBody, this.AUTH_HEADER_KEY, this.apiKey);

            const requestId = queuedParseResponse['requestIds'][0];

            const parsedEmail = await postWithAuth(`${this.GET_PARSE_RESULT}/${requestId}`, postBody, this.AUTH_HEADER_KEY, this.apiKey);

            importedHotelBookings = this.mapResponseToAwardWalletHotelBookings(parsedEmail);

        } catch (error) {
            console.log(error)
        }

        return importedHotelBookings;
    }

    private mapResponseToAwardWalletHotelBookings = (response: any): AwardWalletHotelBooking[] => {
        const awardWalletHotelBookings: AwardWalletHotelBooking[] = [];
        const bookings = response['itineraries'];


        bookings.forEach((element: any) => {
            const totalPrice = element['pricingInfo']['total'] as number;
            const basePrice = element['pricingInfo']['cost'] as number;
            const taxesAndFees = totalPrice - basePrice;
            const room = element['rooms'][0];
            const booking = {
                name: element['hotelName'],
                fullAddress: element['address']['text'],
                addressLine: element['address']['addressLine'],
                city: element['address']['city'],
                countryName: element['address']['countryName'],
                countryCode: element['address']['countryCode'],
                basePrice: basePrice,
                taxesAndFees: taxesAndFees,
                totalPrice: totalPrice,
                currencyCode: element['pricingInfo']['currencyCode'],
                adultCount: element['guestCount'],
                childCount: element['kidsCount'],
                checkInDate: element['checkInDate'],
                checkoutDate: element['checkOutDate'],
                bookingStatus: element['status'],
                roomType: element['rooms'][0]['type'],
                roomDescription: element['rooms'][0]['description'],
            } as AwardWalletHotelBooking;

            awardWalletHotelBookings.push(booking);
        });

        return awardWalletHotelBookings;
    }
}