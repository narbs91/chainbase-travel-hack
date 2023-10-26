import { Property } from "@/app/types/property";
import AwardWalletClient from "@/app/api/impl/client/awardwallet/award.wallet.client";
import { AwardWalletHotelBooking } from "@/app/api/impl/client/awardwallet/types/award.wallet.types";


export class ImportBookingService {
    private bookingProviderClient = new AwardWalletClient();

    public getPropertiesFromUserEmail = async (email: string): Promise<Property[]> => {
        let properties: Property[] = [];

        try {
            const awardWalletListings = await this.bookingProviderClient.parseAndImportHotelBooking(email) as AwardWalletHotelBooking[];

            awardWalletListings.forEach(booking => {
                const property = this.mapAwardWalletHotelBookingToProperty(booking);

                properties.push(property);
            });

        } catch (error) {
            console.log(error)
        }

        return properties;
    }

    private mapAwardWalletHotelBookingToProperty = (awardWalletBooking: AwardWalletHotelBooking): Property => {

        return {
            address: awardWalletBooking.addressLine,
            checkInDate: awardWalletBooking.checkInDate,
            checkoutDate: awardWalletBooking.checkoutDate,
            name: awardWalletBooking.name,
            description: awardWalletBooking.roomDescription,
            listed: false,
            price: awardWalletBooking.totalPrice
        } as Property

    }
}